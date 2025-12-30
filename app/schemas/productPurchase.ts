import { z } from 'zod';

export const ProductPurchaseSchema = z.object({
  productId: z.coerce.number().int().min(0),
  name: z.string().trim(),
  price: z.coerce.number().int().min(0),
  purchaseQuantity: z.coerce.number().int().min(0),
})
export type ProductPurchaseValues = z.infer<typeof ProductPurchaseSchema>;


