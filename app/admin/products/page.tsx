'use client';

import { Save, Eye, Upload, Trash2, Send, Package } from "lucide-react";
import { useForm, SubmitHandler, useWatch } from "react-hook-form"
import ProductForm from "@/app/components/admin/product/ProductForm";
import ProductInfoSection from "@/app/components/admin/product/ProductInfoSection";
import ProductImageSection from "@/app/components/admin/product/ProductImageSection";
import ProductCategorySection from "@/app/components/admin/product/ProductCategorySection";
import ProductStockSection from "@/app/components/admin/product/ProductStockSection";


export type FormValues = {
    name: string,
    productCode: string,
    price: number,
    salePrice: number,
    productPeriod: string,
    productState: string,
    description: string,
    searchLabels: number,
    colorCategory: number,
    productTypes: string[],
} & {
    // 動的な在庫フィールド: stock1, stock2, ...
    [K in `stock${number}`]?: number;
};

export default function Product() {
    const { register, handleSubmit, control } = useForm<FormValues>();
    // フォーム送信処理
    const onSubmit = (data: FormValues) => {
        console.log(data);
    };

    const handleSave = () => {
        handleSubmit(onSubmit)();
    };

    return (
        <div className="max-w-6xl w-full mx-auto py-8 border">
            <header className="mb-6">
                <div className='flex justify-between'>
                    <p>商品編集</p>
                    <div className='grid grid-cols-4 gap-x-3 gap-y-3 mt-6'>
                        <button
                            onClick={handleSave}
                            className="inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium ring-1 ring-black/10 dark:ring-white/15 bg-white hover:bg-neutral-50 dark:bg-neutral-800"
                        >
                            <Save className="size-4" /> 保存
                        </button>
                    </div>
                </div>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-12 gap-6 w-full border'>
                {/* メインコンテンツエリア */}
                <div className="col-span-8 grid gap-6">
                    <ProductForm register={register} />
                    <ProductInfoSection register={register} />
                    <ProductImageSection register={register} />
                </div>
                {/* サイドバーエリア */}
                <div className="col-span-4 grid gap-6 self-start sticky top-6">
                    {/* カテゴリー＆タグセクション */}
                    <ProductCategorySection register={register} />
                    {/* 在庫管理セクション */}
                    <ProductStockSection register={register} control={control} />
                </div>
            </form>
        </div>
    );
}