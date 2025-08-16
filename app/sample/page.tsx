'use client';

import { useState } from 'react';
import { Save, Eye, Upload, Trash2, Send, Package } from "lucide-react";

export default function Product() {
  const [productName, setProductName] = useState<string>("");
  const [productCode, setProductCode] = useState<string>("");
  const [productState, setProductState] = useState<number>(0);
  const [productLabel, setProductLabel] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [salePrice, setSalePrice] = useState<number>(0);
  const [desc, setDesc] = useState<string>("");
  const [stock, setStock] = useState<number>(0);
  const [stockState, setStockState] = useState<number>(0);
  const [categories, setCategories] = useState<string[]>([]); // ← 空配列に

  const labels = [
    { id: "new", label: "NEW" },
    { id: "gift", label: "ギフト" },
    { id: "season", label: "季節限定" },
  ];

  const toggleCategory = (id: string) => {
    setCategories(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const saveDraft = (() => {});

  return (
    <div className="max-w-6xl w-full mx-auto py-8 border">
      <header className="mb-6">
        <div className='flex justify-between items-center'>
          <p className="text-lg font-semibold">商品編集</p>
          <div className='grid grid-cols-4 gap-x-3 gap-y-3'>
            <button onClick={saveDraft} className="inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium ring-1 ring-black/10 dark:ring-white/15 bg-white hover:bg-neutral-50 dark:bg-neutral-800">
              <Save className="size-4" /> 保存
            </button>
            <button onClick={saveDraft} className="inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium ring-1 ring-black/10 dark:ring-white/15 bg-white hover:bg-neutral-50 dark:bg-neutral-800">
              <Trash2 className="size-4" /> 削除
            </button>
            <button onClick={saveDraft} className="inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium ring-1 ring-black/10 dark:ring-white/15 bg-white hover:bg-neutral-50 dark:bg-neutral-800">
              <Eye className="size-4" /> プレビュー
            </button>
            <button onClick={saveDraft} className="inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium ring-1 ring-black/10 dark:ring-white/15 bg-white hover:bg-neutral-50 dark:bg-neutral-800">
              <Send className="size-4" /> 公開
            </button>
          </div>
        </div>
      </header>

      <div className='grid grid-cols-12 gap-6 w-full'>
        {/* 左：メイン */}
        <div className="col-span-12 lg:col-span-8 grid gap-6">
          <section className="rounded-2xl border border-black/10 bg-neutral-800 p-6">
            <h1 className="flex items-center gap-2 text-lg font-semibold">
              <Package className="size-4" />
              <span>商品情報</span>
            </h1>
            <p className="mt-1 text-sm text-neutral-400">商品名、商品コード、価格など</p>

            {/* 2カラム（SP1列 / MD以上2列） */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <label htmlFor="productName" className="block text-sm font-medium mb-1">
                  商品名
                </label>
                <input
                  id="productName"
                  name="productName"
                  type="text"
                  autoComplete="off"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px] outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500"
                  placeholder="生チョコ・ビター 8粒"
                />
              </div>

              <div>
                <label htmlFor="productCode" className="block text-sm font-medium mb-1">
                  商品コード
                </label>
                <input
                  id="productCode"
                  name="productCode"
                  type="text"
                  autoComplete="off"
                  value={productCode}
                  onChange={(e) => setProductCode(e.target.value)}
                  className="w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px] outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500"
                  placeholder="SKU-XXXX"
                />
              </div>

              <div>
                <label htmlFor="productLabel" className="block text-sm font-medium mb-1">
                  販売期間
                </label>
                <select
                  id="productLabel"
                  name="productLabel"
                  value={productLabel}
                  onChange={(e) => setProductLabel(Number(e.target.value))}
                  className="w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px] outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500"
                >
                  <option value={0}>通年</option>
                  <option value={1}>期間限定</option>
                </select>
              </div>

              <div>
                <label htmlFor="productState" className="block text-sm font-medium mb-1">
                  状態
                </label>
                <select
                  id="productState"
                  name="productState"
                  value={productState}
                  onChange={(e) => setProductState(Number(e.target.value))}
                  className="w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px] outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500"
                >
                  <option value={0}>下書き</option>
                  <option value={1}>公開</option>
                  <option value={2}>販売停止</option>
                </select>
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium mb-1">
                  価格（税込）
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  step={1}
                  autoComplete="off"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px] outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500"
                  placeholder="1500"
                />
              </div>

              <div>
                <label htmlFor="salePrice" className="block text-sm font-medium mb-1">
                  割引価格
                </label>
                <input
                  id="salePrice"
                  name="salePrice"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  step={1}
                  autoComplete="off"
                  value={salePrice}
                  onChange={(e) => setSalePrice(Number(e.target.value))}
                  className="w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px] outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500"
                  placeholder="1200"
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-black/10 bg-neutral-800 p-6">
            <div className="md:col-span-2">
              <label htmlFor="desc" className="block text-sm font-medium mb-1">
                説明文
              </label>
              <textarea
                id="desc"
                name="desc"
                rows={4}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px] outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500"
                placeholder="口どけのよいビターガナッシュに、ほのかな洋酒の香り…"
              />
            </div>
          </section>

          <section className="rounded-2xl border border-black/10 bg-neutral-800 p-6">
            <label
              htmlFor="images"
              className="flex flex-col items-center justify-center gap-2 h-40 w-full p-4 rounded-2xl border border-dashed border-black/15 bg-white/50 cursor-pointer transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-500/20"
            >
              <Upload className="size-5" />
              <span className="text-sm">画像をアップロード（複数可）</span>
              <input id="images" type="file" multiple className="sr-only" />
            </label>

            <div className='grid grid-cols-3 mt-4 gap-3'>
              {[1, 2, 3].map((i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden ring-1 ring-black/10 bg-neutral-100 dark:bg-neutral-700">
                  <div className="absolute inset-0 grid place-items-center text-xs text-neutral-500">プレビュー {i}</div>
                  <button
                    type="button"
                    className="absolute right-1 top-1 inline-flex items-center rounded-md bg-white/90 p-1.5 text-xs ring-1 ring-black/10 hover:bg-white"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* 右：サイド */}
        <div className="col-span-12 lg:col-span-4 sticky top-6 grid gap-6 self-start">
          <section className="rounded-2xl border border-black/10 bg-neutral-800 p-6">
            <h1 className="flex items-center gap-2 text-lg font-semibold">
              <Save className="size-4" />
              <span>カテゴリー & タグ</span>
            </h1>
            <p className="mt-1 text-sm text-neutral-400">検索・絞り込みに使用</p>

            <div className='mt-6 space-y-2'>
              {labels.map((label) => (
                <label key={label.id} className='flex items-center gap-2'>
                  <input
                    type='checkbox'
                    className='size-4 rounded border border-black/20 dark:border-white/20 accent-amber-600'
                    checked={categories.includes(label.id)}
                    onChange={() => toggleCategory(label.id)}
                  />
                  {label.label}
                </label>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-black/10 bg-neutral-800 p-6">
            <h1 className="flex items-center gap-2 text-lg font-semibold">
              <Package className="size-4" />
              <span>在庫</span>
            </h1>
            <p className="mt-1 text-sm text-neutral-400">在庫を管理する</p>

            <div className='grid grid-cols-2 gap-x-6 gap-y-5 mt-6'>
              <div>
                <label htmlFor="stock" className="block text-sm font-medium mb-1">
                  在庫
                </label>
                <input
                  id="stock"
                  name="stock"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  step={1}
                  autoComplete="off"
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                  className="w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px] outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500"
                  placeholder="1500"
                />
              </div>

              <div>
                <label htmlFor="stockState" className="block text-sm font-medium mb-1">
                  在庫状況
                </label>
                <select
                  id="stockState"
                  name="stockState"
                  value={stockState}
                  onChange={(e) => setStockState(Number(e.target.value))}
                  className='w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px] outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500'
                >
                  <option value={0}>在庫あり</option>
                  <option value={1}>在庫切れ</option>
                </select>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
