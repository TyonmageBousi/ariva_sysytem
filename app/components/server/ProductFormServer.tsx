import { notFound } from 'next/navigation'
import React from 'react'
import ProductForm from '../admin/product/ProductForm';
import { useForm } from "react-hook-form"
import type { FormValues } from '@/app/types/product';


export default async function ProductFormServer() {
    const res = await fetch("http://localhost:3000/api/categories")
    if (res.status === 404) notFound();
    if (!res.ok) throw new Error(`../api/categories fetch failed:${res.status} ${res.statusText}`);
    const { categories, colorCategories } = await res.json();
    return (
        <ProductForm categories={categories} colorCategories={colorCategories}/>
    )
}
