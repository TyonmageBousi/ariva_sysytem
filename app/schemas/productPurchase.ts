import { z } from 'zod';


export const productPurchaseSchema = z.object({
  productId: z.coerce.number().int().min(0),
  name: z.string().trim(),
  price: z.coerce.number().int().min(0),
  quantity: z.coerce.number().int().min(0),
})
export type productPurchaseSchema = z.infer<typeof productPurchaseSchema>;


