
import { NextResponse } from 'next/server';
import { products, cartItems, temporaryOrders, temporaryOrderItems } from '@/lib/schema';
import { eq, sql, and } from 'drizzle-orm';
import { ProductPurchaseSchema, ProductPurchaseValues } from '@/app/schemas/productPurchase'
import { insertTemporaryOrder, getSessionId, loginJudgment, db, client } from '@/lib/db'
import { ValidationError, handleError, AppError } from '@/lib/errors'
import { ZodError } from 'zod';
import { Result } from 'pg';


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

export type ProductPurchase = ProductPurchaseValues & {
    updateFlg: number

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
        let updateCart: ProductPurchase = {
            ...cart,
            updateFlg: 0
        }
        const [currentProductState] = await db.select({
            id: products.id,
            price: sql<number>`COALESCE(${products.discountPrice}, ${products.price}, 0)`,
            name: products.name,
            status: products.status,
            stock: products.stock
        }).from(products)
            .where(eq(products.id, cart.productId))
            .limit(1);

        //カート内と商品テーブルの情報が一致するか確認
        if (currentProductState) {
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
                    price: currentProductState.price,
                    updateFlg: 1
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
                    name: currentProductState.name,
                    updateFlg: 1
                }
            }
        } else {
            const err: NotFindError = {
                message: `${cart.name}の商品が見つかりませんでした。`,
                type: 'PRODUCT_NOT_FOUND',
                productId: cart.productId,
            }
            productErrors.push(err);
            updateCart = {
                ...updateCart,
                updateFlg: 2
            }
        }
        return { productErrors, updateCart };
    });

    //商品テーブル更新
    const updateCartTable = async (updateCarts: ProductPurchase[], userId: number) => {
        await db.transaction(async (tx) => {
            await Promise.all(
                updateCarts.map(async (updateCart) => {
                    if (updateCart.updateFlg === 1) {
                        await tx.update(cartItems)
                            .set({
                                productName: updateCart.name,
                                price: updateCart.price
                            }
                            )
                            .where(
                                and(
                                    eq(cartItems.userId, userId),
                                    eq(cartItems.productId, updateCart.productId)
                                )
                            );
                    }
                    if (updateCart.updateFlg === 2) {
                        await tx.delete(cartItems)
                            .where(
                                and(
                                    eq(cartItems.userId, userId),
                                    eq(cartItems.productId, updateCart.productId)
                                )
                            );
                    }
                })
            );
        });
    };
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
            const result = ProductPurchaseSchema.safeParse(product)
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
        const updateCarts = checkCarts.map(checkCart => checkCart.updateCart).filter(cart => cart.updateFlg > 0);

        if (hasErrors.length > 0) {

            await updateCartTable(updateCarts, Number(user.id))

            const productErrors: Errors[] = hasErrors.map(result => ({
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

        for (let i = 0; 4 > i; i++) {
            try {
                const totalPrice = updateCarts.reduce((sum, cart) => sum + cart.price * cart.purchaseQuantity, 0);
                await db.transaction(async (tx) => {
                    await Promise.all(
                        updateCarts.map(async (cart) => {
                            const [lock] = await tx.select({
                                stock: products.stock,
                                name: products.name,
                                version: products.version
                            }).from(products)
                                .where(eq(products.id, cart.productId))

                            const productErrors: ProductErrors[] = [];
                            if (cart.purchaseQuantity > lock.stock) {
                                let message = lock.stock === 0 ?
                                    (`${lock.name}が在庫切れとなってしまいました。ご了承ください`)
                                    :
                                    (`${lock.name}の在庫が注文数より少ないです。現状、${lock.stock}までの購入となりますのでご了承ください`)

                                const err: StockError = {
                                    message: message,
                                    type: 'STOCK_ERROR',
                                    productId: cart.productId,
                                    requested: cart.purchaseQuantity,
                                    stock: lock.stock,
                                }
                                productErrors.push(err)
                                cart = {
                                    ...cart,
                                    purchaseQuantity: lock.stock
                                }
                            }

                            if (productErrors.length > 0) {
                                throw new AppError({
                                    message: 'カート内の在庫状況が更新されています。',
                                    statusCode: 404,
                                    errorType: 'PRODUCT_ERROR',
                                    details: productErrors
                                })
                            }
                            const updateStock = lock.stock - cart.purchaseQuantity
                            const result = await tx.update(products).set({ stock: updateStock, version: lock.version + 1 })
                                .where(and(
                                    eq(products.id, cart.productId),
                                    eq(products.version, lock.version)
                                ))
                                .returning()
                            if (result.length === 0) {
                                throw new Error('LOCK_ERROR')
                            }
                        })
                    )
                    const [{ orderId }] = await tx.insert(temporaryOrders).values({
                        userId: Number(user.id),
                        totalPrice: totalPrice,
                        sessionId: sessionId,
                        status: 'address'
                    }).returning({ orderId: temporaryOrders.id })

                    await tx.insert(temporaryOrderItems).values(
                        updateCarts.map(cart => ({
                            orderId: orderId,
                            productId: cart.productId,
                            quantity: cart.purchaseQuantity,
                            name: cart.name,
                            price: cart.price,
                        })
                        ));
                })
                return NextResponse.json({
                    success: true,
                }, { status: 200 })
            } catch (error) {
                if (error instanceof Error) {
                    if (i === 3 && error.message === 'LOCK_ERROR') {
                        throw new AppError({
                            message: '在庫の更新に失敗しました。しばらく経ってから再度お試しください。',
                            statusCode: 409,
                            errorType: 'LOCK_ERROR',
                        });
                    } else {
                        throw error;
                    }
                }
            }
        }
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

