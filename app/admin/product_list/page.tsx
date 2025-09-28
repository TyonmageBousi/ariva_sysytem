"use client";

import React from 'react'
import { useState, useEffect } from 'react'
import TextForm, { type FieldTextProps } from "@/app/components/form/TextForm";
import CheckBoxForm, { type FiledCheckBoxLabels, type FiledCheckBoxProps } from "@/app/components/form/CheckBoxForm"
import NumberForm, { type FieldNumberProps } from "@/app/components/form/NumberForm";
import OptionsForm, { type FieldOptionsProps } from "@/app/components/form/OptionsForm";
import DateForm, { type FieldDateProps } from "@/app/components/form/DateForm";
import { useForm } from "react-hook-form"
import { FormSearchValues, FormValues, EnrichedProducts, PerfectProducts } from '@/app/types/product';

type Categories = {
    id: number,
    label: string
}

export default function () {

    const { register, handleSubmit, } = useForm<FormSearchValues>(
        {
            defaultValues: {
                categoryIds: [],
                colorCategoryIds: []
            }
        }
    );

    const onSubmit = async (data: FormSearchValues) => {
        const formData = new FormData();
        data.name && formData.append("name", data.name)
        data.skuCode && formData.append("skuCode", data.skuCode)
        Number.isFinite(data.minimumPrice) && formData.append("minimumPrice", String(data.minimumPrice))
        Number.isFinite(data.maxPrice) && formData.append("maxPrice", String(data.maxPrice))
        Number.isFinite(data.minimumSalePrice) && formData.append("minimumSalePrice", String(data.minimumSalePrice))
        Number.isFinite(data.maxSalePrice) && formData.append("maxSalePrice", String(data.maxSalePrice))
        if (data.saleStartAt) {
            const start = new Date(data.saleStartAt)
            formData.append("saleStartAt", start.toISOString())
        }
        if (data.saleEndAt) {
            const start = new Date(data.saleEndAt)
            formData.append("saleEndAt", start.toISOString())
        }
        data.colorCategoryIds?.forEach((id) => formData.append("colorCategoryIds", id))
        data.categoryIds?.forEach((id) => formData.append("categoryIds", id))
        data.status && formData.append("status", data.status)
        Number.isFinite(data.stock) && formData.append("stock", String(data.stock))

        const response = await fetch("http://localhost:3000/api/searchProduct", {
            method: 'POST',
            body: formData,
        });

        const products: EnrichedProducts[] = await response.json();

        const enrichedProducts = products.map((product: EnrichedProducts) => {

            const categoriesId: Categories[] = [];
            product.categoryIds.map((id: string) => {
                const result = categories.filter((category) => category.id === Number(id));
                categoriesId.push(...result)
            })

            const colorCategoriesId: Categories[] = [];
            product.colorCategoryIds.map((id: string) => {
                const result = colorCategories.filter((colorCategory) => colorCategory.id === Number(id));
                colorCategoriesId.push(...result)
            })
            return {
                ...product,
                categoryIds: categoriesId,
                colorCategoryIds: colorCategoriesId
            };
        })
        setResult(enrichedProducts);
    };
    const [result, setResult] = useState<PerfectProducts[]>([]);

    useEffect(() => {
        handleSubmit(onSubmit);
    }, []);

    const handleSave = () => {
        handleSubmit(onSubmit)();
    }

    const [categories, setCategories] = useState<Categories[]>([])
    const [colorCategories, setColorCategories] = useState<Categories[]>([])
    const [error, setError] = useState<string | null>(null)
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("http://localhost:3000/api/categories")
                if (!res.ok) {
                    throw new Error(`API Error:${res.status} ${res.statusText}`)
                }
                const data = await res.json();
                setCategories(data.categories);
                setColorCategories(data.colorCategories);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown Error')
            } finally {
            }
        })();
    }, []);

    const productNameFieldProps: FieldTextProps<FormSearchValues> = {
        label: "商品名",
        labelStyle: "block text-sm font-medium mb-1",
        name: "name",
        register,
        inputStyle: "w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]",
        placeholder: "生チョコ・ビター 8粒"
    };

    const productCodeFieldProps: FieldTextProps<FormSearchValues> = {
        label: "商品コード",
        labelStyle: "block text-sm font-medium mb-1",
        name: "skuCode",
        register,
        inputStyle: "w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]",
        placeholder: "SKU-XXXX"
    };

    const minimumPriceFieldProps: FieldNumberProps<FormSearchValues> = {
        label: "最小価格",
        labelStyle: "block text-sm font-medium mb-1",
        name: "minimumPrice",
        register,
        inputStyle: "w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]",
        placeholder: ""
    };
    const maxPriceFieldProps: FieldNumberProps<FormSearchValues> = {
        label: "最大価格",
        labelStyle: "block text-sm font-medium mb-1",
        name: "maxPrice",
        register,
        inputStyle: "w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]",
        placeholder: ""
    };

    const minimumSalePriceFieldProps: FieldNumberProps<FormSearchValues> = {
        label: "最小価格（割引）",
        labelStyle: "block text-sm font-medium mb-1",
        name: "minimumSalePrice",
        register,
        inputStyle: "w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]",
        placeholder: ""
    };
    const maxSalePriceFieldProps: FieldNumberProps<FormSearchValues> = {
        label: "最大価格（割引）",
        labelStyle: "block text-sm font-medium mb-1",
        name: "maxSalePrice",
        register,
        inputStyle: "w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]",
        placeholder: ""
    };
    const salesStartDateProps: FieldDateProps<FormSearchValues> = {
        label: "販売開始",
        name: "saleStartAt",
        labelStyle: "block text-sm font-medium mb-1",
        register,
        inputStyle: "w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]",
    };

    const salesEndDateProps: FieldDateProps<FormSearchValues> = {
        label: "販売終了",
        name: "saleEndAt",
        labelStyle: "block text-sm font-medium mb-1",
        register,
        inputStyle: "w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]",
    };
    const colorCategoryCheckboxProps: FiledCheckBoxProps<FormSearchValues> = {
        label: "色分け",
        name: "colorCategoryIds",
        labelStyle: "block text-sm font-medium mb-4",
        register,
        inputStyle: "w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]",
        labels: colorCategories,
    };

    const productStatusSelectProps: FieldOptionsProps<FormSearchValues> = {
        label: "状態",
        name: "status",
        labelStyle: "block text-sm font-medium mb-1",
        register,
        inputStyle: "w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]",
        options: categories,
    };
    const SEARCH_LABEL_OPTIONS: FiledCheckBoxLabels[] = [
        { id: 1, label: "NEW" },
        { id: 2, label: "ギフト" },
        { id: 3, label: "季節限定" },
    ];

    const searchLabelsCheckboxProps: FiledCheckBoxProps<FormSearchValues> = {
        label: "検索・絞り込みに使用",
        name: "categoryIds",
        labelStyle: "block text-sm font-medium mb-1",
        register,
        inputStyle: "block px-3 py-1",
        labels: SEARCH_LABEL_OPTIONS
    };

    const stockFieldProps: FieldNumberProps<FormSearchValues> = {
        label: "在庫数",
        labelStyle: "block text-sm font-medium mb-1",
        name: "stock",
        register,
        inputStyle: "w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]",
        placeholder: ""
    };
    return (
        <div className='w-[90%] mx-auto'>
            <div>
                <button
                    type="button"
                    onClick={handleSave}>
                    検索</button>
            </div>
            <div className='grid grid-cols-3 gap-4'>
                <div><TextForm {...productNameFieldProps} /> </div>
                <div><TextForm {...productNameFieldProps} /></div>
                <div><CheckBoxForm {...colorCategoryCheckboxProps} /></div>
            </div>
            <div className='grid grid-cols-3 gap-4'>
                <div><NumberForm {...minimumPriceFieldProps} /></div>
                <div><NumberForm {...maxPriceFieldProps} /></div>
                <div><NumberForm {...minimumSalePriceFieldProps} /></div>
            </div>
            <div className='grid grid-cols-3 gap-4'>
                <div><NumberForm {...maxSalePriceFieldProps} /></div>
                <div><DateForm {...salesStartDateProps} /></div>
                <div><DateForm {...salesEndDateProps} /></div>
            </div>
            <div className='grid grid-cols-3 gap-4'>
                <div><OptionsForm {...productStatusSelectProps} /></div>
                <div><CheckBoxForm {...searchLabelsCheckboxProps} /></div>
                <div><NumberForm {...stockFieldProps} /></div>
            </div>

            {/* ヘッダー */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 p-4">
                <div className="grid grid-cols-9 gap-4 font-semibold text-gray-700 text-sm">
                    <div>商品名</div>
                    <div>SKU</div>
                    <div>通常価格</div>
                    <div>割引価格</div>
                    <div>セール開始</div>
                    <div>セール終了</div>
                    <div>ステータス</div>
                    <div>在庫</div>
                    <div>カテゴリ・カラー</div>
                </div>
            </div>
            <div>
                {result.map((product, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 p-4"
                    >
                        <div className="grid grid-cols11 gap-4 items-center text-sm">
                            {/* 商品名 */}
                            <div className="font-medium text-gray-900">
                                {product.name}
                            </div>

                            {/* SKU */}
                            <div className="text-gray-600">
                                {product.skuCode}
                            </div>

                            {/* 通常価格 */}
                            <div className="font-medium text-gray-900">
                                ¥{product.price.toLocaleString()}
                            </div>

                            {/* 割引価格 */}
                            <div className="font-medium">
                                {product.discountPrice ? (
                                    <span className="text-red-600">
                                        ¥{product.discountPrice.toLocaleString()}
                                    </span>
                                ) : (
                                    <span className="text-gray-400">-</span>
                                )}
                            </div>

                            {/* セール開始 */}
                            <div className="text-gray-600">
                                {new Date(product.saleStartAt).toLocaleDateString('ja-JP')}
                            </div>

                            {/* セール終了 */}
                            <div className="text-gray-600">
                                {new Date(product.saleEndAt).toLocaleDateString('ja-JP')}
                            </div>

                            {/* ステータス */}
                            <div>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.status === 1
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                    }`}>
                                    {product.status == 1 ? "販売中" : product.status === 2 ? "販売中止" : "下書き"}
                                </span>
                            </div>

                            {/* 在庫 */}
                            <div className={`font-medium ${product.stock > 10
                                ? 'text-green-600'
                                : product.stock > 0
                                    ? 'text-yellow-600'
                                    : 'text-red-600'
                                }`}>
                                {product.stock}個
                            </div>

                            {/* カテゴリ・カラー */}
                            <div className="space-y-1">
                                <div className="flex flex-wrap gap-1">
                                    {product.categoryIds.map((categoryId, idx) => (
                                        <span
                                            key={idx}
                                            className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded"
                                        >
                                            {categoryId.label}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {product.colorCategoryIds.map((colorCategoryId, idx) => (
                                        <span
                                            key={idx}
                                            className="px-2 py-0.5 bg-purple-100 text-purple-800 text-xs rounded"
                                        >
                                            {colorCategoryId.label}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <button>編集</button>
                            </div>
                            <div>
                                <button>削除</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
