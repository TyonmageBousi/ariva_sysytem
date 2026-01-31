import { z } from 'zod';

export const searchProductSchema = z.object({
    name: z.string().trim().optional(),
    skuCode: z.string().trim().optional(),
    startPrice: z.number().min(0).optional(),
    endPrice: z.number().min(0).optional(),
    categoryIds: z.array(z.coerce.number()).optional(),
    colorIds: z.array(z.coerce.number()).optional(),
}).refine(
    (data) => {
        if (data.startPrice !== undefined && data.endPrice !== undefined) {
            return data.endPrice >= data.startPrice;
        }
        return true;
    },
    {
        message: "終了価格は開始価格以上にしてください",
        path: ["endPrice"],
    }
)

export type SearchProductValues = z.infer<typeof searchProductSchema>;