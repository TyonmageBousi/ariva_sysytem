'use client'

import TextForm, { FieldTextProps } from "@/app/components/public/form/TextForm"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { settlementSchema, SettlementSchema } from '@/app/schemas/settlement'

export default function Settlement() {

    const { handleSubmit, register, formState: { errors } } = useForm<SettlementSchema>({
        resolver: zodResolver(settlementSchema)
    });

    const cartNumberProps: FieldTextProps<SettlementSchema> = {
        label: 'カート番号',
        name: 'cartNumber',
        register,
        inputStyle: 'mt-1 w-full rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 px-3 py-2.5 text-[15px] outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500',
        placeholder: '',
        errors
    }
    const cardHolderNameProps: FieldTextProps<SettlementSchema> = {
        label: 'カード名義',
        name: 'cardHolderName',
        register,
        inputStyle: 'mt-1 w-full rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 px-3 py-2.5 text-[15px] outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500',
        placeholder: '',
        errors
    }
    const expiryMonthProps: FieldTextProps<SettlementSchema> = {
        label: '有効期限（月）',
        name: 'expiryMonth',
        register,
        inputStyle: 'mt-1 w-full rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 px-3 py-2.5 text-[15px] outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500',
        placeholder: '',
        errors
    }
    const expiryYearProps: FieldTextProps<SettlementSchema> = {
        label: '有効期限（年）',
        name: 'expiryYear',
        register,
        inputStyle: 'mt-1 w-full rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 px-3 py-2.5 text-[15px] outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500',
        placeholder: '',
        errors
    }
    const securityCodeProps: FieldTextProps<SettlementSchema> = {
        label: 'セキュリティコード',
        name: 'securityCode',
        register,
        inputStyle: 'mt-1 w-full rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 px-3 py-2.5 text-[15px] outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500',
        placeholder: '',
        errors
    }

    const onSubmit = async (data: SettlementSchema) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/requestSettlement`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
        } catch (error) {

        }

    }

    return (
        <div className="min-h-screen bg-[#07080b] text-white py-14">
            <div className="mx-auto max-w-2xl px-6">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
                    {/* subtle top glow */}
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_30%_10%,rgba(255,220,170,0.12),rgba(0,0,0,0.0)_55%)]" />
                        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.30),rgba(0,0,0,0.65))]" />
                    </div>

                    <div className="relative p-7 sm:p-10">
                        <p className="text-[11px] tracking-[0.45em] text-white/55">PAYMENT</p>
                        <h2 className="mt-4 text-2xl sm:text-3xl font-extralight tracking-wide">
                            カード情報入力
                        </h2>
                        <p className="mt-3 text-sm text-white/55">
                            必要事項を入力してください。カード番号は安全に取り扱われます。
                        </p>

                        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                            {/* ここは TextForm 側を “黒系入力” に揃えるのが理想 */}
                            <TextForm props={cartNumberProps} />
                            <TextForm props={cardHolderNameProps} />

                            <div className="grid grid-cols-2 gap-4">
                                <TextForm props={expiryMonthProps} />
                                <TextForm props={expiryYearProps} />
                            </div>

                            <TextForm props={securityCodeProps} />

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className="
                w-full rounded-xl border border-white/12
                bg-white/[0.06] py-4
                text-sm tracking-[0.18em] uppercase text-white/90
                transition
                hover:bg-white/[0.10] hover:border-white/20
                focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/10
              "
                                >
                                    送信
                                </button>

                                <p className="mt-4 text-xs leading-relaxed text-white/45">
                                    ※ CVV（セキュリティコード）はカード裏面の3桁（AMEXは表面4桁）です。
                                </p>
                            </div>
                        </form>
                    </div>

                    <div className="h-px w-full bg-white/10" />
                    <div className="px-7 sm:px-10 py-5 text-xs text-white/45">
                        不正利用防止のため、入力内容は暗号化して送信されます。
                    </div>
                </div>
            </div>
        </div>

    )

}