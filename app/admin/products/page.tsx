    'use client';

import { Save } from "lucide-react";
import { useForm } from "react-hook-form"
import ProductInfoSection from "@/app/components/admin/product/ProductInfoSection";
import ProductImageSection from "@/app/components/admin/product/ProductImageSection";
import ProductCategorySection from "@/app/components/admin/product/ProductCategorySection";
import ProductStockSection from "@/app/components/admin/product/ProductStockSection";
import type { FormValues } from '@/app/types/product';
import ProductForm from "@/app/components/admin/product/ProductForm";
import { useState, useEffect } from 'react'
import { type FiledCheckBoxLabels } from "../../components/form/CheckBoxForm"


export default function Product() {
    const { register, handleSubmit, setValue } = useForm<FormValues>();

    // フォーム送信処理
    const onSubmit = async (data: FormValues) => {
        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("skuCode", data.skuCode)
        formData.append("price", data.price.toString())
        if (Number.isFinite(data.discountPrice)) formData.append("discountPrice", String(data.discountPrice))
        formData.append("saleStartAt", data.saleStartAt.toISOString());
        formData.append("saleEndAt", data.saleEndAt.toISOString());
        formData.append("status", String(data.status));
        if (data.description) formData.append("description", data.description);
        formData.append("stock", String(data.stock));
        data.categoryIds?.forEach((id) => formData.append("categoryIds[]", id));
        data.colorCategoryIds?.forEach((id) => formData.append("colorCategoryIds[]", id));
        data.images?.forEach((file) => formData.append("images", file));
        
        const response = await fetch("http://localhost:3000/api/products", {
            method: 'POST',
            body: formData,
        });
        const result = await response.json()
        console.log(result);
    };

    const handleSave = () => {
        handleSubmit(onSubmit)();
    };



    const [categories, setCategories] = useState<FiledCheckBoxLabels[]>([]);
    const [colorCategories, setColorCategories] = useState<FiledCheckBoxLabels[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("http://localhost:3000/api/categories")
                if (!res.ok) {
                    throw new Error(`API Error :${res.status} ${res.statusText}`);
                }
                const data = await res.json();
                setCategories(data.categories);
                setColorCategories(data.colorCategories);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown Error');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

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
                    <ProductForm categories={categories} colorCategories={colorCategories} register={register} />
                    <ProductInfoSection register={register} />
                    <ProductImageSection register={register} setValue={setValue} />
                </div>
                {/* サイドバーエリア */}
                <div className="col-span-4 grid gap-6 self-start sticky top-6">
                    {/* カテゴリー＆タグセクション */}
                    <ProductCategorySection register={register} />
                    {/* 在庫管理セクション */}
                    <ProductStockSection register={register} />
                </div>
            </form>
        </div>
    );
}