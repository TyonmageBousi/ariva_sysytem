'use client';

import { useEffect, useState } from 'react';
import ProductDetail, { ProductDetailData } from '@/app/components/user/product/ProductDetail'
import ProductDetails, { ProductDetailsData } from '@/app/components/user/product/ProductDetails'

type Props = {
    id: string
}

async function fetchUrl<T>(url: string, errorMsg: string, options: RequestInit = {}): Promise<T> {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(errorMsg);
    return res.json()
}

export default function Product({ id }: Props) {
    const [loading, setLoading] = useState<boolean>(true);
    const [productDetailData, setProductDetailData] = useState<ProductDetailData>();
    const [productDetailsData, setProductDetailsData] = useState<ProductDetailsData[]>([]);

    useEffect(() => {
        const controller = new AbortController();
        const fetchProduct = async () => {
            try {
                setLoading(true)
                const [productDetail, productDetails] = await Promise.all([
                    fetchUrl<ProductDetailData>
                        (`http://localhost:3000/api/user/productDetail/id=${id}`,
                            'メイン商品のデータの取得に失敗しました',
                            { signal: controller.signal }),
                    fetchUrl<ProductDetailsData[]>
                        (`http://localhost:3000/api/user/productDetails?id=${id}`,
                            'メイン商品以外のデータ取得に失敗しました',
                            { signal: controller.signal })
                ]);
                setProductDetailData(productDetail);
                setProductDetailsData(productDetails);
            }
            catch (err) {
                console.error('データ取得エラー:', err);
            } finally {
                setLoading(false);

            }
        }
        fetchProduct();
        return () => {
            controller.abort();
        };
    }, [id]);

    if (loading) {
        return <div>読み込み中・・・・</div>
    }

    if (!productDetailData) {
        return <div>該当の商品が見つかりません。</div>
    }

    return (
        <div className='relative'>
            <ProductDetail productDetailData={productDetailData} />
            <ProductDetails productDetailsData={productDetailsData} />
            <div className='relative min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-950 to-black z-50'>
                <div className='text-center text-amber-100'>
                    <h2 className='text-7xl font-bold mb-6'>白十字</h2>
                    <p className='text-2xl opacity-80'>伝統と革新が織りなす、至福のひととき</p>
                </div>
            </div>
        </div>

    );
}


