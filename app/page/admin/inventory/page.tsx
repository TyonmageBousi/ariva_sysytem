import Inventory from "@/app/components/admin/inventory/Inventory";
import { ProductFormatted } from "@/app/types/responseProduct";
import { getAllCategories, getAllColorCategories } from '@/lib/db';
import { type FiledCheckBoxLabels } from "@/app/components/public/form/CheckBoxForm"
import { handleFrontError } from '@/lib/front-error';

export default async function ProductList() {
    try {
        const res = await fetch("http://localhost:3000/api/admin/productList")

        const result = await res.json();

        if (!res.ok) throw new Error(result);

        if (!result.success) throw new Error(result)

        const data: ProductFormatted[] = result.data;

        const categories: FiledCheckBoxLabels[] = await getAllCategories();

        const categoryLabel = categories.map((category) => category.label)

        const colorCategories: FiledCheckBoxLabels[] = await getAllColorCategories();

        const colorCategoryLabel = colorCategories.map((colorCategory) => colorCategory.label)

        const props = {
            productList: data,
            categoryLabel,
            colorCategoryLabel
        }
        return <Inventory {...props} />
    } catch (error) {
        if (error instanceof Error)
            return handleFrontError(error)
    }
} 