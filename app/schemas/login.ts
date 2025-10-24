import { z } from "zod";

export const LoginSchema = z
    .object({
        email: z.email('有効なメールアドレスを入力してください'),
        password: z
            .string()
            .min(8, "8文字以上で入力してください")
            .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, "英字と数字を少なくとも1文字ずつ含めてください"),
    });

export type LoginValues = z.infer<typeof LoginSchema >