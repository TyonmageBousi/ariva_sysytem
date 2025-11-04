"use client";

import { useState } from "react"
import {
    Plus,
    Search,
    Filter,
    Edit3,
    Eye,
    Copy,
    Trash2,
    Tag,
    Link,
    Package
} from "lucide-react";
type Product = {
    id: string;
    name: string;
    sku: string;
    price: number;
    stock: number;
    status: 0 | 1 | 2;
    labels: number[];
    updatedAt: string;
    thumbnail?: string;
};

export default function AdminProductsPage() {
   
   const products: Product[] = [
    { id: "p001", name: "生チョコ・ビター 8粒", sku: "SKU-BTR-8", price: 1500, stock: 34, status: 1, labels: [1, 2, 3], updatedAt: "2025-08-15" },
    { id: "p002", name: "生チョコ・ミルク 8粒", sku: "SKU-MLK-8", price: 1480, stock: 0, status: 2, labels: [1, 2, 3], updatedAt: "2025-08-14" },
    { id: "p003", name: "トリュフ詰め合わせ 12粒", sku: "SKU-TRF-12", price: 2400, stock: 12, status: 1, labels: [2], updatedAt: "2025-08-13" },
    { id: "p004", name: "カカオ70% バー", sku: "SKU-C70", price: 420, stock: 120, status: 1, labels: [], updatedAt: "2025-08-12" },
    { id: "p005", name: "カカオ85% バー", sku: "SKU-C85", price: 480, stock: 64, status: 0, labels: [2, 3], updatedAt: "2025-08-10" },
    { id: "p006", name: "アソート 24粒", sku: "SKU-AST-24", price: 3980, stock: 5, status: 1, labels: [1], updatedAt: "2025-08-09" },
];
   
    function statusLabel(s: Product["status"]) {
        return s === 1 ? "公開" : s === 2 ? "販売停止" : "下書き";
    }

    const [query, setQuery] = useState<string>("");
    const [status, setStatus] = useState<"" | 1 | 2 | 3>("");
    const [label, setLabel] = useState<"" | 1 | 2 | 3 | 4>("");

    const q = query.trim().toLowerCase();
    const searchProduct = products.filter(p =>
        (!q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)) &&
        (status === "" || p.status === status) &&
        (label === "" || p.labels.includes(label))
    );



const labels = [
    { id: 1, label: "NEW" },
    { id: 2, label: "ギフト" },
    { id: 3, label: "季節限定" },
];

const title: string[] = [
    "画像", "商品名", "商品コード", "価格", "在庫", "状態", "ラベル", "更新日", "操作"
];

const setStatusCss = ((s: number) => {
    switch (s) {
        case 1: // 公開
            return "bg-emerald-600/15 text-emerald-400 ring-1 ring-emerald-500/20";
        case 2: // 販売停止
            return "bg-rose-600/15 text-rose-400 ring-1 ring-rose-500/20";
        default: // 下書き
            return "bg-neutral-600/20 text-neutral-300 ring-1 ring-white/10";
    }
});

const getStatusText = ((s: number) => {
    return s === 1 ? "公開" : s === 2 ? "販売停止" : "下書き";
})

const handleDuplicate = ((x: number) => {

});

const handleDelete = ((x: number) => {

})


    return (
        <div className="max-w-6xl w-full mx-auto py-8">
            <header className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Package className="size-5" />
                    <h1 className="text-lg font-semibold">商品一覧</h1>
                </div>
                <div className="flex items-center gap-2">
                    <a
                        href="#"
                        className="inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium ring-1 ring-black/10 dark:ring-white/15 bg-white hover:bg-neutral-50 dark:bg-neutral-800"
                    >
                        <Plus className="size-4" />
                        新規商品
                    </a>
                </div>
            </header>
            <section className="rounded-2xl border border-black/10 bg-neutral-800 p-4">
                <div className="grid grid-cols-3 gap-3">
                    <div className="relative">
                        <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-70" />
                        <input
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                            }}
                            placeholder="商品名　商品コードで検索"
                            className="w-full pl-9 rounded-xl border border-black/10
                                    bg-neutral-700 px-3 py-2.5 text-[15px]
                                    outline-none 
                                    focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500"
                        />
                    </div>
                    <div className="relative">
                        <Filter className="size-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-70" />
                        <select
                            value={status}
                            onChange={(e) => {
                                setStatus(Number(e.target.value) as 1 | 2 | 3);
                            }}
                            className="w-full pl-9 rounded-xl border border-black/10
                            bg-neutral-700 px-3 py-2.5 text-[15px]
                            outline-none
                            focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500"
                        >
                            <option value="1">すべての状態</option>
                            <option value="2">公開</option>
                            <option value="3">販売停止</option>
                        </select>
                    </div>
                    <div className="relative">
                        <Tag className="size-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-70" />
                        <select
                            value={label}
                            onChange={(e) => {
                                setLabel(Number(e.target.value) as 1 | 2 | 3);
                            }}
                            className="w-full pl-9 rounded-xl border border-black/10
                            bg-neutral-700 px-3 py-2.5 text-[15px]
                            outline-none
                            focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500"
                        >
                            <option value="">すべてのラベル</option>
                            {labels.map((label) => (
                                <option key={label.id} value={label.id}>
                                    {label.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </section >
            <section className="mt-6 rounded-2xl border border-black/10 bg-neutral-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-neutral-900/60 text-neutral-300">
                            <tr>
                                {title.map((t, index) => {
                                    return <th key={index} className="px-4 py-3 text-left">{t}</th>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {searchProduct.length === 0 && (
                                <tr>
                                    <td colSpan={9} className="px-4 py-8 text-center text-neutral-400">
                                        該当する商品がありません。
                                    </td>
                                </tr>
                            )}
                            {searchProduct.map((p) => (
                                <tr key={p.id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="px-4 py-3">
                                        <div className="size-10 rounded-md right-1 ring-black/10 bg-neutral-200 grid place-items-center text-[10px] text-neutral-500    ">
                                            img
                                        </div>

                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="font-medium">
                                            {p.name}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-neutral-300">{p.sku}</td>
                                    <td className="px-4 py-3 text-right">{p.price.toLocaleString()} 円</td>
                                    <td className="px-4 py-3 text-right">{p.stock}</td>
                                    <td className="px-4 py-3 text-right">
                                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs ${setStatusCss(p.status)}`}>
                                            {getStatusText(p.status)}
                                        </span></td>
                                    <td className="px-4 py-3">
                                        <div className="flex flex-col gap-1">
                                            {p.labels.length === 0 && (
                                                <span className="text-neutral-400">—</span>
                                            )}
                                            {p.labels.map((l) => {
                                                const labelText = labels.find((x) => x.id === l)?.label ?? "";
                                                return (
                                                    <span
                                                        key={l}
                                                        className="block w-fit px-2 py-0.5 rounded-md text-xs ring-1 ring-black/10 bg-neutral-700"
                                                    >
                                                        {labelText}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-neutral-300">{p.updatedAt}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <div className="flex flex-col gap-2">
                                                {/* ページ遷移系は Link */}
                                                <a
                                                    href={`/products/${p.id}/edit`}
                                                    className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium 
                                                        ring-1 ring-black/10 dark:ring-white/15 
                                                        bg-white hover:bg-neutral-50 dark:bg-neutral-800"
                                                >
                                                    <Edit3 className="size-3.5" />
                                                    編集
                                                </a>
                                                <a
                                                    href={`/products/${p.id}`}
                                                    className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium 
                                                        ring-1 ring-black/10 dark:ring-white/15 
                                                        bg-white hover:bg-neutral-50 dark:bg-neutral-800"
                                                >
                                                    <Eye className="size-3.5" />
                                                    プレビュー
                                                </a>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                {/* DB 副作用は button */}
                                                <button
                                                    type="button"
                                                    onClick={() => handleDuplicate(p.id)}
                                                    className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium ring-1 ring-black/10 dark:ring-white/15 bg-white hover:bg-neutral-50 dark:bg-neutral-800"
                                                >
                                                    <Copy className="size-3.5" />
                                                    複製
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(p.id)}
                                                    className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium ring-1 ring-black/10 dark:ring-white/15 bg-white hover:bg-neutral-50 dark:bg-neutral-800"
                                                >
                                                    <Trash2 className="size-3.5" />
                                                    削除
                                                </button>
                                            </div>
                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>

                </div>

            </section >
        </div >
    )
}
