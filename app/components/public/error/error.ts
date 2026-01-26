'use client'

import { AppErrorType } from '@/lib/errors'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export function useErrorHandler() {

    const router = useRouter();

    const handleError = (result: AppErrorType) => {
        switch (result.errorType) {
            case 'VALIDATION_ERROR':
                toast.error(result.message)
                break;
            case 'UNAUTHORIZED':
                toast.error(result.message)
                router.push('/login');
                break;
            case 'INTERNAL_SERVER_ERROR':
                throw new Error(result.message || 'エラーが発生しました')
            default:
                throw new Error('予期しないエラーが発生しました。')
        }
    };
    return handleError;
}