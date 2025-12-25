'use client'

import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function LoginError() {
    useEffect(() => {
        toast((t) => (
            <div className="text-center p-2">
                <p className="mb-3">ログインが必要です</p>
                <button 
                    onClick={() => {
                        toast.dismiss(t.id);
                        window.location.href = '/login';
                    }}
                    className="bg-blue-500 text-white px-6 py-2 rounded"
                >
                    ログインページへ
                </button>
            </div>
        ), {
            duration: Infinity
        });
    }, []);
    
    return (
        <div className="flex items-center justify-center min-h-screen">
            <p>ログインが必要です</p>
        </div>
    );
}