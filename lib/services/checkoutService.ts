import { findTemporaryOrder, findUserPhone, findProductImages } from '@/lib/repositories/checkoutRepositories';
import { AppError } from '@/lib/errors';

export async function getCheckoutData(userId: number, sessionId: string) {

        const [temOrders, userPhone] = await Promise.all([
            findTemporaryOrder(userId, sessionId),
            findUserPhone(userId)
        ]);

        if (!temOrders) {
            throw new AppError({
                message: "注文が見つかりません",
                statusCode: 404,
                errorType: "NOT_FOUND"
            });
        }

        if (!userPhone) {
            throw new AppError({
                message: "ユーザー情報が見つかりません",
                statusCode: 404,
                errorType: "NOT_FOUND"
            });
        }

        const productIds = temOrders.temporaryOrderItems.map(item => item.productId);
        const productImages = await findProductImages(productIds);

        return {
            ...temOrders,
            phoneNum: Number(userPhone.phone),
            temporaryOrderItems: temOrders.temporaryOrderItems.map(item => ({
                ...item,
                imageFilePath: productImages
                    .filter(img => img.productId === item.productId)
                    .map(img => img.filePath)[0] || "/images/no-image.jpg"
            }))
        };
} 