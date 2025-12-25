'use client'

import { Save } from "lucide-react";
import { useForm } from "react-hook-form"
import { NewProductSchema, NewProductValues } from "@/app/schemas/product"
import { zodResolver } from "@hookform/resolvers/zod";
import ProductForm from "@/app/components/admin/productPage/ProductForm";
import ProductInfoSection from "@/app/components/admin/productPage/ProductInfoSection";
import ProductImageSection from "@/app/components/admin/productPage/ProductImageSection";
import ProductStatusSection from "@/app/components/admin/productPage/ProductStatusSection";
import ProductStockSection from "@/app/components/admin/productPage/ProductStockSection";
import { FiledCheckBoxLabels } from "@/app/components/public/form/CheckBoxForm";
import { useRouter } from 'next/navigation';
import { useErrorHandler } from '@/app/components/public/error/error';
import toast from 'react-hot-toast';


type Props = {
    categories: FiledCheckBoxLabels[];
    colorCategories: FiledCheckBoxLabels[];
};

export default function productForm({
    categories,
    colorCategories,
}: Props) {

    const { register, handleSubmit, setValue, formState: { errors } }
        = useForm<NewProductValues>({
            resolver: zodResolver(NewProductSchema)
        });
    const handleError = useErrorHandler();
    const router = useRouter();

    // フォーム送信処理

    const onSubmit = async (data: NewProductValues) => {
        try {
            const formData = new FormData();
            formData.append("name", data.name)
            formData.append("skuCode", data.skuCode)
            formData.append("price", data.price.toString())
            if (Number.isFinite(data.discountPrice)) formData.append("discountPrice", String(data.discountPrice))
            formData.append("saleStartAt", data.saleStartAt.toISOString());
            formData.append("saleEndAt", data.saleEndAt.toISOString());
            formData.append("status", data.status);
            if (data.description) formData.append("description", data.description);
            formData.append("stock", String(data.stock));
            data.categoryIds?.forEach((id) => formData.append("categoryIds", String(id)));
            data.colorIds?.forEach((id) => formData.append("colorCategoryIds", String(id)));
            data.images?.forEach((file) => formData.append("images", file));

            const response = await fetch("http://localhost:3000/api/admin/newProductRegister", {
                method: 'POST',
                body: formData,
            });
            const result = await response.json()
            if (!response.ok) {
                handleError(result);
                return
            }
            if (!result.success) {
                handleError(result);
                return;
            }
            toast.success('商品登録に成功しました。')
        } catch (error) {
            throw error instanceof Error ? error : new Error('予期しないエラーが発生しました')
        }
    }

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
                    <ProductForm categories={categories} colorCategories={colorCategories} register={register} errors={errors} />
                    <ProductInfoSection register={register} errors={errors} />
                    <ProductImageSection register={register} setValue={setValue} />
                </div>
                {/* サイドバーエリア */}
                <div className="col-span-4 grid gap-6 self-start sticky top-6">
                    {/* カテゴリー＆タグセクション */}
                    <ProductStatusSection register={register} errors={errors} />
                    {/* 在庫管理セクション */}
                    <ProductStockSection register={register} errors={errors} />
                </div>
            </form>
        </div>
    );



}