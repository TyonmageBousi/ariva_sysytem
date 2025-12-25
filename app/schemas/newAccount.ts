import { z } from "zod";
import { AddressSchema } from '@/app/schemas/address'

export const NewAccountSchema = z.object({
  email: z.email('有効なメールアドレスを入力してください'),
  name: z
    .string()
    .min(2, "氏名は2文字以上で入力してください")
    .trim(),

  phone: z
    .string()
    .min(1, "電話番号を入力してください")
    .regex(/^[0-9\-+()]+$/, "数字またはハイフンのみで入力してください")
    .trim(),

  birthday: z
    .date()
    .min(new Date("1900-01-01"), "1900年以降の日付を入力してください")
    .max(new Date(), "未来の日付は選択できません"),

  password: z
    .string()
    .min(8, "8文字以上で入力してください")
    .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, "英字と数字を少なくとも1文字ずつ含めてください"),

  confirmPassword: z
    .string()
    .min(1, "確認用パスワードを入力してください"),

})
  .extend(AddressSchema.shape)
  
  .refine((v) => v.password === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "パスワードが一致しません",
  });

export type NewAccountValues = z.infer<typeof NewAccountSchema>;
