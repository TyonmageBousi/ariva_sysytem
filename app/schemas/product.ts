import { z } from 'zod';


export const NewProductSchema =
    z.object({
    id: z.number().min(0).optional(),
        name: z.string().min(1, "商品名を入力してください").trim(),
        skuCode: z.string().min(1, "SKUコードを入力してください").trim(),
        description: z.string()
            .min(1, { message: "1文字以上で入力してください" })
            .max(100, { message: "100文字以内で入力してください" }),
        price: z.number().min(0, "0円以上で入力してください"),
        discountPrice: z.number().min(0).optional(),
        stock: z.number().min(0, "0以上で入力してください"),
        status: z.string(),
        saleStartAt: z.date(),
        saleEndAt: z.date(),
        categoryIds: z.array(z.string()).optional(),
        colorIds: z.array(z.string()).optional(),
        images: z.array(z.instanceof(File)).optional(),
        defaultImages: z.array(z.string()).optional(),
    }).refine((data) =>
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

export type NewProductValues = z.infer<typeof NewProductSchema>;
