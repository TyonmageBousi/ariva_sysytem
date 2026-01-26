import Checkout from '@/app/user/checkout/checkout'
import HandleFrontError from '@/app/components/error/error';
import { AppError } from '@/lib/errors';
import { getCheckoutData } from '@/lib/services/checkoutService'
import { loginJudgment, getSessionId } from '@/lib/db';

export default async function CheckOut() {

    try {

        const user = await loginJudgment();
        const sessionId = await getSessionId();

        const userId = Number(user.id);

        if (isNaN(userId)) {
            throw new AppError({
                message: "無効なユーザーIDです",
                statusCode: 400,
                errorType: "INVALID_USER_ID"
            });
        }

        if (!sessionId) {
            throw new AppError({
                message: "セッションが無効です",
                statusCode: 401,
                errorType: "INVALID_SESSION"
            });
        }

        const temOrdersData = await getCheckoutData(userId, sessionId)

        return (<Checkout temOrdersData={temOrdersData} />)
        
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
