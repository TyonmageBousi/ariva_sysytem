
import { ProductPurchaseSchema, ProductPurchaseValues } from '@/app/schemas/productPurchase'
import { checkDbConnection, loginJudgment } from '@/lib/db'
import { ValidationError, handleError, AppError } from '@/lib/errors'
import { ZodError } from 'zod';
import { validateSettlement, validateStockSettlement } from '@/app/api/user/settlement/helpers'
import { updateCartTable, createOrder } from '@/app/api/user/settlement/database'
import { NextResponse } from 'next/server';


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


    try {


        const isConnected = await checkDbConnection();
        if (!isConnected) {
            return NextResponse.json(
                { error: 'データベース接続エラー' },
                { status: 503 }
            );
        }


        const user = await loginJudgment();

        const data = await request.json();

        if (data.length === 0 || !data) {
            throw new AppError({
                message: 'カート内が空です。',
                statusCode: 407,
                errorType: 'EMPTY_CART'
            });
        }
        console.log("カート内空エラー", data)

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
        console.log("カート内バリデーションエラー", validationErrors)

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


        console.log("カート内商品エラー", hasErrors)

        const updateCartValues: ProductPurchase[] = checkCarts.map((cart) => cart.updateCart)

        const result = await validateStockSettlement(updateCartValues, Number(user.id))

        if (!result) {
            throw new AppError({
                message: 'カート内の商品情報が更新されています。',
                statusCode: 404,
                errorType: 'PRODUCT_ERROR',
            });
        }

        console.log("カート内在庫エラー", result)

        await createOrder(updateCartValues, Number(user.id))

        return NextResponse.json(
            { success: true, message: '注文が完了しました' },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof ZodError) {
            return handleError(new ValidationError(error.issues));
        }
        return handleError(error);
    }
}

