import { z } from 'zod';

// SKUコードのバリデーション（数字6桁のみ）
const skuCodeSchema = z
    .string()
    .length(10, 'SKU code must be exactly 10 characters')
    .startsWith('SKU-', 'SKU code must start with "SKU-"')
    .regex(/^SKU-[0-9]{6}$/, 'SKU code format must be SKU-123456 (6 digits after SKU-)');

// 商品作成用スキーマ（camelCaseで統一）
export const CreateProductSchema = z.object({
    name: z.string().min(1, 'Product name is required'),
    skuCode: skuCodeSchema,
    price: z.number().min(0, 'Price must be non-negative'),
    discountPrice: z.number().int().min(0).optional(),
    saleStartAt: z.coerce.date(),
    saleEndAt: z.coerce.date(),
    status: z.number().int().min(0).default(0),
    categoryIds: z.array(z.uuid()).default([]),
    colorIds: z.array(z.uuid()).default([]),
    stock: z.number().int().min(0),
    description: z.string()
        .min(1, { message: "1文字以上で入力してください" })
        .max(100, { message: "100文字以内で入力してください" }),
    images: z.array(z.string()).optional()
})
    .refine((data) =>
        data.discountPrice === undefined || data.discountPrice < data.price,
        {
            message: "割引価格は通常価格より安くしてください",
            path: ["discountPrice"],
        }
    )
    .refine((data) =>
        data.saleStartAt < data.saleEndAt,
        {
            message: "販売終了時刻は、開始時刻よりも後にして下さい",
            path: ["saleEndAt"],
        }
    );

export type CreateProductInput = z.infer<typeof CreateProductSchema>;