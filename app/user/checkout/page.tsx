import Cart from '@/app/components/user/cart/cart'
import HandleFrontError from '@/app/components/error/error';
import { ProductCart } from '@/app/types/productCart'
import { AppError } from '@/lib/errors';
import { db, loginJudgment, getSessionId } from '@/lib/db'
import { temporaryOrders } from '@/lib/schema'
import { eq, and } from 'drizzle-orm';

export default async function CheckOut() {

    try {

        const user = await loginJudgment();
        const sessionId = await getSessionId();

        const data = await db.query.temporaryOrders.findMany({
            where: and(
                eq(temporaryOrders.userId, Number(user.id)),
                eq(temporaryOrders.sessionId, sessionId)
            ),
            with: {
                temporaryOrderItems: true,      
            }
        });



        return ( )
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
