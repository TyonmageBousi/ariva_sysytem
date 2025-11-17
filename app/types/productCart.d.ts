import { productPurchaseSchema } from '@/app/schemas/productPurchase'

export type ProductCart = productPurchaseSchema & {
    id:number;
    image: string;
}