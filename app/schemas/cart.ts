import { z } from 'zod';
import { productPurchaseSchema } from '@/app/schemas/productPurchase'

export const cartSchema = productPurchaseSchema
    .extend({
        id: z.coerce.number().int().min(0)
    });
export type CartSchema = z.infer<typeof cartSchema>