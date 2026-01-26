import { products, cartItems, temporaryOrders, temporaryOrderItems } from '@/lib/schema';
import { eq, sql, and } from 'drizzle-orm';
import { ProductPurchaseSchema, ProductPurchaseValues } from '@/app/schemas/productPurchase'
import {  db,  } from '@/lib/db'
import { ValidationError, handleError, AppError } from '@/lib/errors'



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


export const validateSettlement = (async (cart: ProductPurchaseValues) => {

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


export const validateStockSettlement = async (updateCartValues: ProductPurchase[], userId: number) => {
    const productErrors: ProductErrors[] = [];

    await db.transaction(async (tx) => {
        await Promise.all(
            updateCartValues.map(async (cart) => {
                const [product] = await tx.select({
                    stock: products.stock,
                    name: products.name,
                    version: products.version
                }).from(products)
                    .where(eq(products.id, cart.productId))

                
                if (cart.purchaseQuantity > product.stock) {
                    let message = product.stock === 0 ?
                        (`${product.name}が在庫切れとなってしまいました。`)
                        :
                        (`${product.name}の在庫が注文数より少ないです。現状、${product.stock}個までの購入となります。`)

                    productErrors.push({
                        message: message,
                        type: 'STOCK_ERROR',
                        productId: cart.productId,
                        requested: cart.purchaseQuantity,
                        stock: product.stock,
                    })

                    cart.purchaseQuantity = product.stock

                    if (product.stock > 0) {
                        await tx.update(cartItems)
                            .set({ quantity: cart.purchaseQuantity })
                            .where(and(
                                eq(cartItems.productId, cart.productId),
                                eq(cartItems.userId, userId)
                            ))
                    } else {
                        await tx.delete(cartItems)
                            .where(and(
                                eq(cartItems.productId, cart.productId),
                                eq(cartItems.userId, userId)
                            ))
                    }
                }
            })
        )
    })

    // エラーがあったら投げる
    if (productErrors.length > 0) {
        throw new AppError({
            message: 'カート内の在庫状況が更新されています。',
            statusCode: 400,
            errorType: 'PRODUCT_ERROR',
            details: productErrors
        })
    }

    return { success: true }
}