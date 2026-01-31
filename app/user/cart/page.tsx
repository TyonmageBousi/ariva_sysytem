import Cart from '@/app/components/user/cart/cart'
import HandleFrontError from '@/app/components/error/error';
import { ProductCart } from '@/app/types/productCart'
import { AppError } from '@/lib/errors';


export default async function UserCart() {

    const controller = new AbortController();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/cart`,
            { signal: controller.signal })

        const result = await res.json();

        if (!res.ok || !result.success) {
            throw new AppError({
                message: result.message,
                statusCode: res.status,
                errorType: result.errorType,
                details: result.details
            });
        }
        const data: ProductCart[] = result.data
        return (
            <Cart data={data} />
        )
    } catch (error) {
        if (error instanceof AppError) {
            const errorData = {
                message: error.message,
                statusCode: error.statusCode,
                errorType: error.errorType,
                details: error.details
            };
            return <HandleFrontError errorData={errorData} />;
        }
    }
}
