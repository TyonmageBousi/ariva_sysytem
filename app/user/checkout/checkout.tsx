import React from 'react';
import { ShoppingBag, MapPin, CreditCard, Package } from 'lucide-react';
import { useRouter } from 'next/navigation';


export default function OrderConfirmation() {
    // サンプルデータ（実際はpropsやAPIから取得）
    const orderData = {
        items: [
            {
                id: 1,
                name: 'ワイヤレスイヤホン',
                price: 8900,
                quantity: 2,
                image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&h=200&fit=crop'
            },
            {
                id: 2,
                name: 'スマートウォッチ',
                price: 24800,
                quantity: 1,
                image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop'
            }
        ],
        shippingAddress: {
            postalCode: '123-4567',
            prefecture: '東京都',
            city: '渋谷区',
            address: '道玄坂1-2-3',
            building: 'サンプルビル 402号室',
            name: '山田 太郎',
            phone: '090-1234-5678'
        },
        paymentMethod: 'クレジットカード',
        cardLast4: '1234'
    };





    const handleConfirmOrder = async () => {
        try {
            const router = useRouter();

            const response = await fetch('/api/orders/create')

            const result = await response.json();

            if (result.success) {
                router.push(`/orders/complete?orderId=${result.orderId}`);
            } else {
                alert('注文処理に失敗しました');
            }
        } catch (error) {
            console.error(error);
            alert('エラーが発生しました');
        }
    };

    const subtotal = orderData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 500;
    const total = subtotal + shipping;

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* ヘッダー */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">ご注文内容の確認</h1>
                    <p className="text-gray-600">以下の内容でよろしければ、注文を確定してください。</p>
                </div>

                {/* 注文商品 */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <ShoppingBag className="w-5 h-5 text-blue-600" />
                        <h2 className="text-lg font-semibold text-gray-900">注文商品</h2>
                    </div>

                    <div className="space-y-4">
                        {orderData.items.map((item) => (
                            <div key={item.id} className="flex gap-4 pb-4 border-b last:border-b-0">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                                    <p className="text-sm text-gray-600 mt-1">数量: {item.quantity}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-gray-900">
                                        ¥{(item.price * item.quantity).toLocaleString()}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        ¥{item.price.toLocaleString()} × {item.quantity}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 金額サマリー */}
                    <div className="mt-6 pt-4 border-t space-y-2">
                        <div className="flex justify-between text-gray-600">
                            <span>小計</span>
                            <span>¥{subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>送料</span>
                            <span>¥{shipping.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
                            <span>合計</span>
                            <span className="text-blue-600">¥{total.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* お届け先住所 */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        <h2 className="text-lg font-semibold text-gray-900">お届け先</h2>
                    </div>

                    <div className="space-y-2 text-gray-700">
                        <p className="font-medium">{orderData.shippingAddress.name}</p>
                        <p className="text-sm">〒{orderData.shippingAddress.postalCode}</p>
                        <p className="text-sm">
                            {orderData.shippingAddress.prefecture}
                            {orderData.shippingAddress.city}
                            {orderData.shippingAddress.address}
                        </p>
                        {orderData.shippingAddress.building && (
                            <p className="text-sm">{orderData.shippingAddress.building}</p>
                        )}
                        <p className="text-sm mt-2">電話番号: {orderData.shippingAddress.phone}</p>
                    </div>
                </div>

                {/* お支払い方法 */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <CreditCard className="w-5 h-5 text-blue-600" />
                        <h2 className="text-lg font-semibold text-gray-900">お支払い方法</h2>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center">
                            <CreditCard className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">{orderData.paymentMethod}</p>
                            <p className="text-sm text-gray-600">**** **** **** {orderData.cardLast4}</p>
                        </div>
                    </div>
                </div>

                {/* 確認ボタン */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-start gap-3 mb-4">
                        <input
                            type="checkbox"
                            id="agree"
                            className="mt-1 w-4 h-4 text-blue-600 rounded"
                        />
                        <label htmlFor="agree" className="text-sm text-gray-700">
                            利用規約とプライバシーポリシーに同意します
                        </label>
                    </div>

                    <div className="flex gap-3">
                        <button className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition">
                            戻る
                        </button>
                        <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2"
                            onClick={handleConfirmOrder}
                        >
                            <Package className="w-5 h-5" />
                            注文を確定する
                        </button>
                    </div>
                </div>

                {/* 注意事項 */}
                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>※ 注文確定後、登録されたメールアドレスに確認メールが送信されます</p>
                </div>
            </div>
        </div>
    );
}