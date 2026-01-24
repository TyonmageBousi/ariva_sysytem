import Cart from '@/app/components/user/cart/cart'
import HandleFrontError from '@/app/components/error/error';
import { ProductCart } from '@/app/types/productCart'
import { AppError } from '@/lib/errors';
import { auth } from "@/auth";
import { db, client, loginJudgment } from '@/lib/db'

export default async function UserCart() {

    try {

        const user = await loginJudgment();
        console.log(user.id)
        const res = await fetch(`http://localhost:3000/api/user/cart?id=${user.id}`)
        const result = await res.json();

        if (!res.ok || !result.success) throw new Error(result);

        const data: ProductCart[] = result.data
        console.log(data);
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