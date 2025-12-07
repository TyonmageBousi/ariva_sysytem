import { z } from 'zod'

export const settlementSchema = z.object({
    cartNumber: z.string().regex(/^\d{14,16}$/, 'カート番号はスペース抜きで、14桁から16桁の数字で入れてください'),
    cardHolderName: z.string().min(1),
    expiryMonth: z.string().regex(/^(0[1-9]|1[0-2])$/, '月は01-12で入力してください'),
    expiryYear: z.string().regex(/^\d{2}$/, '年は2桁で入力してください'),
    securityCode: z.string().regex(/^\d{3,4}$/, 'セキュリティコードは、スペース抜きで、3桁から4桁の数字で入れてください'),
}).refine((data) => {
    const currentYear = new Date().getFullYear() % 100;
    const inputYear = parseInt(data.expiryYear);
    return inputYear >= currentYear && currentYear + 10 >= inputYear;
}, '有効期限が正しくありません。')

export type SettlementSchema = z.infer<typeof settlementSchema>; 