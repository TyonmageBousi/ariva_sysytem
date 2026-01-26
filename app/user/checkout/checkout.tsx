import React from 'react';
import { ShoppingBag, MapPin, CreditCard, Package } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { TemOrdersData } from '@/app/types/temOrdersData'

type Props = {
    temOrdersData: TemOrdersData
}


export default function OrderConfirmation({ temOrdersData }: Props) {

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

    const shipping = 500;
    const total = temOrdersData.totalPrice + shipping;

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
                        {temOrdersData.temporaryOrderItems.map((item) => (
                            <div key={item.productId} className="flex gap-4 pb-4 border-b last:border-b-0">
                                <img
                                    src={item.imageFilePath}
                                    alt={item.productName}
                                    className="w-20 h-20 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                    <h3 className="font-medium text-gray-900">{item.productName}</h3>
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
                            <span>¥{temOrdersData.totalPrice.toLocaleString()}</span>
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
                        <p className="text-sm">〒{temOrdersData.postalCode}</p>
                        <p className="text-sm">
                            {temOrdersData.prefecture}
                            {temOrdersData.city}
                            {temOrdersData.address1}
                        </p>
                        {temOrdersData.address2 && (
                            <p className="text-sm">{temOrdersData.address2}</p>
                        )}
                        <p className="text-sm mt-2">電話番号: {temOrdersData.phoneNum}</p>
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
                            {/* <p className="font-medium text-gray-900">{orderData.paymentMethod}</p>
                            <p className="text-sm text-gray-600">**** **** **** {orderData.cardLast4}</p> */}
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