// app/api/user/requestSettlement/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { cartNumber, cardHolderName, expiryMonth, expiryYear, securityCode, amount } = body;

        // バリデーション
        if (!cartNumber || !cardHolderName || !expiryMonth || !expiryYear || !securityCode) {
            return NextResponse.json(
                { error: '必須項目が入力されていません' },
                { status: 400 }
            );
        }

        // カード番号の検証（14-16桁の数字）
        const cardNumberRegex = /^\d{14,16}$/;
        if (!cardNumberRegex.test(cartNumber.replace(/\s/g, ''))) {
            return NextResponse.json(
                { error: 'カード番号が無効です' },
                { status: 400 }
            );
        }

        // 有効期限の検証
        const currentYear = new Date().getFullYear() % 100; // 下2桁
        const currentMonth = new Date().getMonth() + 1;
        
        if (parseInt(expiryMonth) < 1 || parseInt(expiryMonth) > 12) {
            return NextResponse.json(
                { error: '有効期限（月）が無効です' },
                { status: 400 }
            );
        }

        if (parseInt(expiryYear) < currentYear || 
            (parseInt(expiryYear) === currentYear && parseInt(expiryMonth) < currentMonth)) {
            return NextResponse.json(
                { error: 'カードの有効期限が切れています' },
                { status: 400 }
            );
        }

        // セキュリティコードの検証（3-4桁）
        const securityCodeRegex = /^\d{3,4}$/;
        if (!securityCodeRegex.test(securityCode.replace(/\s/g, ''))) {
            return NextResponse.json(
                { error: 'セキュリティコードが無効です' },
                { status: 400 }
            );
        }

        // ダミー決済処理（ランダムで成功/失敗を決定）
        const isSuccess = Math.random() > 0.1; // 90%の確率で成功

        if (!isSuccess) {
            return NextResponse.json(
                { 
                    success: false,
                    error: '決済が拒否されました。カード会社にお問い合わせください。',
                    errorCode: 'PAYMENT_DECLINED'
                },
                { status: 400 }
            );
        }

        // 決済成功時のレスポンス
        const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        
        // ダミー処理を遅延（リアルな感じを出すため）
        await new Promise(resolve => setTimeout(resolve, 1000));

        return NextResponse.json({
            success: true,
            message: '決済が完了しました',
            transactionId,
            amount: amount || 1000,
            processedAt: new Date().toISOString(),
            cardLast4: cartNumber.slice(-4),
            paymentMethod: getCardBrand(cartNumber)
        });

    } catch (error) {
        console.error('決済処理エラー:', error);
        return NextResponse.json(
            { 
                success: false,
                error: 'サーバーエラーが発生しました',
                errorCode: 'INTERNAL_SERVER_ERROR'
            },
            { status: 500 }
        );
    }
}

// カードブランドを判定する関数
function getCardBrand(cardNumber: string): string {
    const cleanNumber = cardNumber.replace(/\s/g, '');
    
    if (cleanNumber.startsWith('4')) {
        return 'Visa';
    } else if (cleanNumber.startsWith('5')) {
        return 'Mastercard';
    } else if (cleanNumber.startsWith('3')) {
        return 'American Express';
    } else if (cleanNumber.startsWith('6')) {
        return 'Discover';
    }
    
    return 'Unknown';
}