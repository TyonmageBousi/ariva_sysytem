import { z } from "zod";
import { prefectures } from "@/app/components/user/address/AddressContainer"

export const AddressSchema = z.object({
    postalCode: z
        .string()
        .min(1, "郵便番号を入力してください")
        .regex(/^\d{3}-?\d{4}$/, "郵便番号は 123-4567 の形式で入力してください")
        .transform((v) => v.replace("-", ""))
        .transform((v) => `${v.slice(0, 3)}-${v.slice(3, 7)}`),
    prefecture: z.enum(prefectures, {
        message: '都道府県を入力してください'
    }),
    city: z.string().min(1, "市区町村を入力してください").trim(),
    address1: z.string().min(1, "丁目・番地を入力してください").trim(),
    address2: z.string().trim().optional(),
})


export type AddressValues = z.infer<typeof AddressSchema>
