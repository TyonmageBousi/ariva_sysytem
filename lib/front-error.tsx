import { AppError } from "./errors";
import LoginError from '@/app/components/public/error/loginError';

export function handleFrontError(error: Error) {
    let errorMessage = '';

    if (error instanceof AppError) {
        switch (error.errorType) {
            case 'UNAUTHORIZED':
                errorMessage = '認証が必要です。ログインページに移動しますか？';
                return <LoginError />
            case 'INTERNAL_SERVER_ERROR':
                errorMessage = error.message;
            default:
                errorMessage = error.message || '予期しないエラーが発生しました。';
        }
    } else if (error.name === 'AbortError') {
        errorMessage = 'タイムアウトしました。';
    } else {
        errorMessage = '予期しないエラーが発生しました'
    }
    return (
        <div>
            <p>{errorMessage}</p>
            <button onClick={() => window.location.reload()}>
                再読み込み
            </button>
        </div>
    );
}
