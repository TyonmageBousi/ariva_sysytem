'use client'

import { searchProductSchema, SearchProductValues } from '@/app/schemas/searchProduct'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from 'react'
import { SearchProduct } from '@/app/types/searchProduct'
import { FiledCheckBoxLabels } from '@/components/CheckBoxForm'
import ProductList from '@/app/user/product-inventory/productList'
import SearchFrom from '@/app/user/product-inventory/searchFrom'

type Props = {
    productList: SearchProduct[];
    categories: FiledCheckBoxLabels[];
    colorCategories: FiledCheckBoxLabels[];
    currentPage: number;
    totalPages: number;
}

export default function ProductInventoryContainer({ productList, categories, colorCategories, currentPage, totalPages }: Props) {


    useEffect(() => {
        setProducts(productList)
    }, [productList])



    const [products, setProducts] = useState<SearchProduct[]>([])
    const [paginationPage, setPaginationPage] = useState<number>(1)

    const methods
        = useForm<SearchProductValues>({
            resolver: zodResolver(searchProductSchema),
            defaultValues: {
                name: undefined,
                skuCode: undefined,
                startPrice: undefined,
                endPrice: undefined,
                colorIds: [],
                categoryIds: [],
            },
        });

    const { register, handleSubmit, formState: { errors } } = methods;

    const onSubmit = async (data: SearchProductValues) => {
        try {
            const buildQuery = ((v: SearchProductValues) => {
                const sp = new URLSearchParams();
                if (v.name) sp.set("name", v.name);
                if (v.skuCode) sp.set("skuCode", v.skuCode);
                if (v.startPrice != null) sp.set("startPrice", String(v.startPrice));
                if (v.endPrice != null) sp.set("endPrice", String(v.endPrice));
                (v.categoryIds ?? []).forEach((id) => sp.append("categoryIds", id));
                (v.colorIds ?? []).forEach((id) => sp.append("colorIds", id));
                sp.set("page", String(paginationPage ?? 1));
                return sp.toString();
            })(data)

            const res = await fetch(`/api/user/productInventory?${buildQuery}`);
            const result = await res.json();
            if (!res.ok || !result.success) {
                throw new Error
            }
            setProducts(result.data)
        } catch (error) {

        }
    }
    return (

        <div className="container mx-auto py-6 px-4">

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* 左：検索フォーム */}
                    <aside className="lg:col-span-1">
                        <SearchFrom categories={categories} colorCategories={colorCategories} register={register} errors={errors} />
                    </aside>

                    {/* 右：商品一覧 */}
                    <main className="lg:col-span-3">
                        <ProductList productList={products} />
                    </main>
                </div>
            </form>


            <div className="flex items-center justify-center gap-2 mt-8 mb-6">
                {/* 前へボタン */}
                {currentPage > 1 && (
                    <button
                        type="button"
                        onClick={() => {
                            setPaginationPage(currentPage - 1)
                            handleSubmit(onSubmit)();
                        }}
                        className="px-4 py-2 bg-zinc-900 text-zinc-100 hover:bg-zinc-800 transition-colors rounded-md border border-zinc-700 text-sm"
                    >
                        ←前
                    </button>
                )}

                {/* ページ番号 */}
                <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <a
                            key={page}
                            href={`/products?page=${page}`}
                            className={`
        min-w-[40px] h-[40px] flex items-center justify-center
        rounded-md border transition-all text-sm
        ${page === currentPage
                                    ? "bg-white text-black border-white font-semibold"
                                    : "bg-zinc-900 text-zinc-400 border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100"
                                }
        `}
                        >
                            {page}
                        </a>
                    ))}
                </div>

                {/* 次へボタン */}
                {currentPage < totalPages && (
                    <button
                        type="button"
                        onClick={() => {
                            setPaginationPage(currentPage + 1)
                            handleSubmit(onSubmit)();
                        }}
                        className="px-4 py-2 bg-zinc-900 text-zinc-100 hover:bg-zinc-800 transition-colors rounded-md border border-zinc-700 text-sm"
                    >
                        次へ →
                    </button>
                )}
            </div>
        </div>
    )
}

