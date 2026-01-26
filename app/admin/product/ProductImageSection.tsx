
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { NewProductValues } from '@/app/schemas/product'
import { Upload, Trash2 } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react'

type Props = {
    register: UseFormRegister<NewProductValues>;
    setValue: UseFormSetValue<NewProductValues>;
    defaultsImage?: string[]
};

export default function ProductImageSection({ setValue, defaultsImage }: Props) {

    let images = defaultsImage ? [...defaultsImage] : [];
    for (let i = images.length; i < 3; i++) {
        images.push("/sample/sample.png")
    }

    const [defaultImages, setDefaultImages] = useState<string[]>(images);
    const [selectedImages, setSelectedImages] = useState<File[]>([]);

    useEffect(() => {
        const filteredImages = defaultImages.filter((defaultImage) => (defaultImage !== "/sample/sample.png"))
        setValue('defaultImages', filteredImages);
    }, [defaultImages]);



    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const images = Array.from(e.target.files || [])
        e.currentTarget.value = ""; 

        setSelectedImages((prev) => {
            const merged = [...prev, ...images];

            const map = new Map<string, File>();
            for (const f of merged) {
                const key = `${f.name}__${f.size}__${f.lastModified}`;
                if (!map.has(key)) map.set(key, f);
            }
            const next = Array.from(map.values()).slice(0, 3);

            setValue("images", next, { shouldDirty: true, shouldValidate: true });
            return next
        });
    };
    const handleRemoveImage = (i: number) => {
        const updatedImages = selectedImages.filter((_, index) => index !== i);
        setSelectedImages(updatedImages);
        setValue('images', updatedImages);

    }
    const handleRemoveDefaultImage = (i: number) => {
        setDefaultImages(defaultImages.filter((_, index) => index !== i));
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
            <div className='grid grid-cols-3 mt-4 gap-3'>
                {defaultImages.map((image, index) => (
                    <div key={index} className='relative aspect-square rounded-xl overflow-hidden ring-1 ring-black/10 bg-neutral-100'>
                        <img key={index} src={image} alt={`image-${index}`} />
                        <button
                            type='button'
                            className='absolute right-1 top-1 inline-flex items-center rounded-md bg-white/90 p-1.5 text-xs ring-1 ring-black/10 hover:bg-white'
                            onClick={() => handleRemoveDefaultImage(index)}
                        >
                            <Trash2 className='size-3.5' />
                        </button>
                    </div>
                )
                )
                }
            </div>
        </section >
    )
}