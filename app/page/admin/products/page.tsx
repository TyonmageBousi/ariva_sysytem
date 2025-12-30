import ProductForm from "@/app/components/admin/productForm/ProductFrom";
import { type FiledCheckBoxLabels } from "@/app/components/public/form/CheckBoxForm"
import { handleFrontError } from '@/lib/front-error';

export default async function Product() {
    try {
        const res = await fetch("http://localhost:3000/api/public/categories")

        const result = await res.json();

        if (!res.ok) throw new Error(result);

        if (!result.success) throw new Error(result)

        const categories: FiledCheckBoxLabels[] = result.categories;
        const colorCategories: FiledCheckBoxLabels[] = result.colorCategories;
        return <ProductForm categories={categories} colorCategories={colorCategories} />;
    } catch (error) {
        if (error instanceof Error)
            return handleFrontError(error)
    }
}