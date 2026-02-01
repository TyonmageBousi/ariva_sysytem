import ProductForm from "@/app/admin/product/CreateProductForm";
import { type FiledCheckBoxLabels } from "@/app/components/public/form/CheckBoxForm"
import HandleFrontError from '@/app/components/error/error';
import { ProductFormatted } from "@/app/types/responseProduct";

export default async function Product({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
    try {

        const paramId = await searchParams;
        const id = paramId.id;
        let data: ProductFormatted | undefined = undefined;
        let newSkuCode: string | undefined = undefined;
        if (id) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/productDetail/${id}`)
            const result = await res.json();
            if (!res.ok) throw new Error(result);
            if (!result.success) throw new Error(result)
            if ((result.length === 0)) {
                throw new Error(result);
            }
            data = result.data;
        } else {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/product`)
            const result = await res.json();
            if (!res.ok) throw new Error(result);
            if (!result.success) throw new Error(result)
            newSkuCode = result.data;
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/public/categories`)

        const result = await res.json();

        if (!res.ok) throw new Error(result);

        if (!result.success) throw new Error(result)

        const categories: FiledCheckBoxLabels[] = result.categories;
        const colorCategories: FiledCheckBoxLabels[] = result.colorCategories;

        return <ProductForm categories={categories} colorCategories={colorCategories} defaultData={data} newSkuCode={newSkuCode} />;
    } catch (error) {
        if (error instanceof Error)
            return (
            )
    }
}