import { loginJudgment, getSessionId } from '@/lib/db'
import { order } from '@/lib/repositories/orderRepositories'


export async function finalStep() {
    try {
        const user = await loginJudgment();
        const sessionId = await getSessionId();

        await order(Number(user.id), sessionId)

        return { success: true, message: '注文が完了しました' };

    } catch (error) {
        console.log('DBエラー', error);
        return { success: false, error: '注文処理に失敗しました' };
    }
}