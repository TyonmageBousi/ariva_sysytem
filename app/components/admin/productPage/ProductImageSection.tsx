
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import {  NewProductValues } from '@/app/schemas/product'
import { Upload, Trash2} from 'lucide-react';
import React, { useState, useRef } from 'react'

type Props = {
    register: UseFormRegister<NewProductValues>;
    setValue: UseFormSetValue<NewProductValues>;
};

export default function ProductImageSection({ setValue }: Props) {

    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const images = Array.from(e.target.files || [])
        const updatedImages = [...selectedImages];
        for (const image of images) {
            if (updatedImages.length < 3) {
                updatedImages.push(image)
            } else {
                break;
            }
        }
        setSelectedImages(updatedImages);
        setValue('images', updatedImages);
        e.target.value = '';
    }
    const handleRemoveImage = (i: number) => {
        const updatedImages = selectedImages.filter((_, index) => index !== i);
        setSelectedImages(updatedImages);
        setValue('images', updatedImages);
    }
    return (
        <section className='rounded-2xl border border-black/10 bg-neutral-800 p-6' >
            <label
                htmlFor='images'
                className='flex flex-col items-center justify-center 
                                        gap-2 h-40 w-full p-4 rounded-2xl 
                                        border border-dashed border-black/15
                                        bg-white/50 cursor-pointer transition-colors 
                                    hover:bg-white focus-visible:outline-none 
                                    focus-visible:ring-4 focus-visible:ring-amber-500/20'
            >
                <Upload className='size-5' />
                <span className='text-sm'>画像をアップロード（複数可）</span>
                <input
                    id='images'
                    type='file'
                    multiple
                    accept='image/*'
                    className='sr-only'
                    onChange={handleImageChange}
                />
            </label>
            <div className='grid grid-cols-3 mt-4 gap-3'>
                {[0, 1, 2].map((index) => {
                    const image = selectedImages[index];
                    return (
                        <div key={index} className='relative aspect-square rounded-xl overflow-hidden ring-1 ring-black/10 bg-neutral-100'>
                            {image ? (
                                <img src={URL.createObjectURL(image)} alt='preview' className='w-full h-full object-cover' />
                            ) : (
                                <div className='absolute inset-0 grid place-items-center text-xs text-neutral-500'>
                                    プレビュー {index + 1}
                                </div>
                            )}
                            {image && (
                                <button
                                    type='button'
                                    className='absolute right-1 top-1 inline-flex items-center rounded-md bg-white/90 p-1.5 text-xs ring-1 ring-black/10 hover:bg-white'
                                    onClick={() => handleRemoveImage(index)}
                                >
                                    <Trash2 className='size-3.5' />
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </section >
    )
}