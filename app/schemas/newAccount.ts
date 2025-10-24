import { z } from "zod";

export const NewAccountSchema = z
  .object({
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

    postalCode: z
      .string()
      .min(1, "郵便番号を入力してください")
      .regex(/^\d{3}-?\d{4}$/, "郵便番号は 123-4567 の形式で入力してください")
      .transform((v) => v.replace("-", ""))
      .transform((v) => `${v.slice(0, 3)}-${v.slice(3, 7)}`),

    prefecture: z.number().min(1, "都道府県を選択してください"),
    city: z.string().min(1, "市区町村を入力してください").trim(),
    address1: z.string().min(1, "丁目・番地を入力してください").trim(),
    address2: z.string().trim().optional(),
  })
  .refine((v) => v.password === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "パスワードが一致しません",
  });

export type NewAccountValues = z.infer<typeof NewAccountSchema>;
export const NewAccountSchemaBackend = z
  .object({
    email: z.string().email('有効なメールアドレスを入力してください'),
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
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "YYYY-MM-DD の形式で入力してください")
      .refine((date) => {
        const d = new Date(date);
        return d >= new Date("1900-01-01") && d <= new Date();
      }, "1900年以降、今日までの日付を入力してください")
    ,
    password: z
      .string()
      .min(8, "8文字以上で入力してください")
      .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, "英字と数字を少なくとも1文字ずつ含めてください"),
    confirmPassword: z
      .string()
      .min(1, "確認用パスワードを入力してください"),
    postalCode: z
      .string()
      .min(1, "郵便番号を入力してください")
      .regex(/^\d{3}-?\d{4}$/, "郵便番号は 123-4567 の形式で入力してください")
      .transform((v) => v.replace("-", ""))
      .transform((v) => `${v.slice(0, 3)}-${v.slice(3, 7)}`),
    prefecture: z.coerce.number().min(1, "都道府県を選択してください"), // 文字列→数値変換
    city: z.string().min(1, "市区町村を入力してください").trim(),
    address1: z.string().min(1, "丁目・番地を入力してください").trim(),
    address2: z.string().trim().optional().or(z.literal("")),
  })
  .refine((v) => v.password === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "パスワードが一致しません",
  });

export type NewAccountValuesBackend = z.infer<typeof NewAccountSchemaBackend>;