'use client'
import { AppError } from "@/lib/errors";
import { redirect } from 'next/navigation'

type ErrorData = {
    message: string;
    errorType: string;
    statusCode: number;
    details?: any;
}
export default function HandleFrontError({ errorData }: { errorData: ErrorData }) {
    console.log("フロントの errorData:", errorData);

    let errorMessage = '';
    switch (errorData.errorType) {
        case 'UNAUTHORIZED':
            errorMessage = '認証が必要です。ログインページに移動しますか？';
            break;
        case 'INTERNAL_SERVER_ERROR':
            errorMessage = errorData.message;
        default:
            errorMessage = errorData.message || '予期しないエラーが発生しました。';
    }
    return (
        <div className="my-[40px] inset-0 z-50 flex items-center justify-center relative z-100">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-md mx-4 text-center">
                <p className="text-gray-700 mb-6 text-lg">{errorMessage}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                    再読み込み
                </button>
            </div>
        </div>
    );
}
