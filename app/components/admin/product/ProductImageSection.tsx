import React from 'react'
import { UseFormRegister } from "react-hook-form";
import type { FormValues } from "../../../admin/products/page"
import { Save, Eye, Upload, Trash2, Send, Package } from "lucide-react";

type Props = {
    register: UseFormRegister<FormValues>;
};

export default function ProductImageSection({ register }: Props) {
    return (
        < section className="rounded-2xl border border-black/10 bg-neutral-800 p-6" >
            <label
                htmlFor="images"
                className="flex flex-col items-center justify-center 
                                        gap-2 h-40 w-full p-4 rounded-2xl 
                                        border border-dashed border-black/15
                                        bg-white/50 cursor-pointer transition-colors 
                                    hover:bg-white focus-visible:outline-none 
                                    focus-visible:ring-4 focus-visible:ring-amber-500/20"
            >
                <Upload className="size-5" />
                <span className="text-sm">画像をアップロード（複数可）</span>
                <input id="images" type="file" multiple className="sr-only" />
            </label>
            <div className='grid grid-cols-3 mt-4 gap-3'>
                {[1, 2, 3].map((index) => (
                    <div key={index} className="relative aspect-square rounded-xl overflow-hidden ring-1 ring-black/10 bg-neutral-100">
                        <div className="absolute inset-0 grid place-items-center text-xs text-neutral-500">
                            プレビュー {index}
                        </div>
                        <button
                            type="button"
                            className="absolute right-1 top-1 inline-flex items-center rounded-md bg-white/90 
                                                    p-1.5 text-xs ring-1 ring-black/10 hover:bg-white"
                        >
                            <Trash2 className="size-3.5 bg-white" />
                        </button>
                    </div>
                ))}
            </div>
        </section >
    )
}