
import { NextResponse } from 'next/server';
import { products, cartItems } from '@/lib/schema';
import { eq, sql } from 'drizzle-orm';
import { productPurchaseSchema, ProductPurchaseValues } from '@/app/schemas/productPurchase'
import { insertTemporaryOrder, getSessionId, loginJudgment, db, client } from '@/lib/db'
import { ValidationError, handleError, AppError } from '@/lib/errors'
import { ZodError } from 'zod';


export type StockError = {
    message: string;
    type: 'STOCK_ERROR';
    productId: number;
    requested: number;
    stock: number;
}

export type PriceError = {
    message: string;
    type: 'PRICE_ERROR';
    productId: number;
    price: number;
    productPrice: number;
}

export type NameError = {
    message: string;
    type: 'NAME_ERROR';
    productId: number;
    oldName: string;
    nowName: string;
}


export type NotFindError = {
    message: string;
    type: string;
    productId: number;
}

export type ProductErrors = (StockError | PriceError | NameError | NotFindError);

export type Errors = {
    productId: number;
    errors: ProductErrors[]
}


export async function POST(request: Request) {

    /* 関数定義 ここから*/

    const validateSettlement = (async (cart: ProductPurchaseValues) => {

        //カート内の商品と一致する商品を商品テーブルから取得
        const productErrors: ProductErrors[] = [];
        let updateCart = { ...cart }
        const [currentProductState] = await db.select({
            id: products.id,
            price: sql<number>`COALESCE(${products.discountPrice}, ${products.price}, 0)`,
            name: products.name,
            status: products.status,
            stock: products.stock
        }).from(products)
            .where(eq(products.id, cart.productId))
            .limit(1);

        //なんかしらエラーハンドリング必要


        //カート内と商品テーブルの情報が一致するか確認
        if (currentProductState) {

            //在庫チェック
            if (cart.purchaseQuantity > currentProductState.stock) {
                let message = currentProductState.stock === 0 ?
                    (`${currentProductState.name}が在庫切れとなってしまいました。ご了承ください`)
                    :
                    (`${currentProductState.name}の在庫が注文数より少ないです。現状、${currentProductState.stock}までの購入となりますのでご了承ください`)
                //在庫エラー作成
                const err: StockError = {
                    message: message,
                    type: 'STOCK_ERROR',
                    productId: cart.productId,
                    requested: cart.purchaseQuantity,
                    stock: currentProductState.stock,
                }
                productErrors.push(err)
                updateCart = {
                    ...updateCart,
                    purchaseQuantity: currentProductState.stock
                }
            }

            //価格の検証
            if (cart.price !== Number(currentProductState.price)) {
                //価格エラー作成
                const err: PriceError = {
                    message: `${currentProductState.name}の価格が変更されています。現状、${currentProductState.price}でのご案内となります。`,
                    type: 'PRICE_ERROR',
                    productId: cart.productId,
                    price: cart.price,
                    productPrice: Number(currentProductState.price),
                }
                productErrors.push(err);
                updateCart = {
                    ...updateCart,
                    price: currentProductState.price
                }
            }


            if (cart.name !== currentProductState.name) {
                //価格エラー作成
                const err: NameError = {
                    message: `${currentProductState.name}の名前が変更されています。${currentProductState.name}でお間違いないでしょうか。`,
                    type: 'NAME_ERROR',
                    productId: cart.productId,
                    oldName: cart.name,
                    nowName: currentProductState.name,
                }
                productErrors.push(err);
                updateCart = {
                    ...updateCart,
                    price: currentProductState.price
                }
            }
        } else {
            const err: NotFindError = {
                message: '商品が見つかりませんでした。',
                type: 'PRODUCT_NOT_FOUND',
                productId: cart.productId,
            }
            productErrors.push(err);
        }
        return { productErrors, updateCart };
    });

    //商品テーブル更新
    const updateCartTable = async (updateCarts: ProductPurchaseValues[], userId: number) => {
        await db.delete(cartItems)
            .where(
                eq(cartItems.userId, userId)
            );
        await db.insert(cartItems).values(
            updateCarts.map((updateCart) => ({
                userId: userId,
                productName: updateCart.name,
                productId: updateCart.productId,
                price: updateCart.price,
                quantity: updateCart.purchaseQuantity
            }))
        );
    }


    /* 関数定義 ここまで */


    const user = await loginJudgment();

    try {
        const data = await request.json();

        if (data.length === 0 || !data) {
            throw new AppError({
                message: 'カート内が空です。',
                statusCode: 407,
                errorType: 'EMPTY_CART'
            });
        }

        const validationErrors: { productId: number, error: ZodError }[] = [];
        data.forEach((product: ProductPurchaseValues) => {
            const result = productPurchaseSchema.safeParse(product)
            if (!result.success) {
                validationErrors.push(
                    {
                        productId: product.productId,
                        error: result.error
                    })
            }
        });

        if (validationErrors.length !== 0) {
            throw new AppError({
                message: 'カート内に不正な商品があります。',
                statusCode: 407,
                errorType: '',
                details: validationErrors
            });
        }

        const validateData: ProductPurchaseValues[] = data;


        const checkCarts = await Promise.all(
            validateData.map((cart) => validateSettlement(cart))
        );

        const hasErrors = checkCarts.filter(result => result.productErrors.length > 0);
        const updateCarts = checkCarts.map(checkCart => checkCart.updateCart).filter((updateCart) => updateCart.purchaseQuantity > 0)
        if (hasErrors.length > 0) {
            await updateCartTable(updateCarts, Number(user.id))
            const productErrors:Errors[] = hasErrors.map(result => ({
                productId: result.updateCart.productId,
                errors: result.productErrors
            }))
            throw new AppError({
                message: 'カート内の商品情報が更新されています。',
                statusCode: 404,
                errorType: 'PRODUCT_ERROR',
                details: productErrors
            });
        }

        const sessionId = await getSessionId()
        await insertTemporaryOrder(updateCarts, Number(user.id), sessionId)

        return NextResponse.json({
            success: true,
        }, { status: 200 })
    }
    catch (error) {
        if (error instanceof ZodError) {
            return handleError(new ValidationError(error.issues));
        }
        handleError(error);
    } finally {
        await client.end();
    }
}

