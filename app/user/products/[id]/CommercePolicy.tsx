export default function CommercePolicy() {

    const policies = [
        {
            title: 'SHIPPING',
            summary: '原則 即日発送',
            description: '午前中のご注文は、可能な限り当日出荷へ。<br />贈り物のタイミングを、逃さないために。',
            label: "FAST / QUIET DELIVERY"
        },
        {
            title: 'DELIVERY FEE',
            summary: '送料 一律 500円 ',
            description: '  全国どこでも、明朗な送料設定。<br />余計な計算を、いらない体験へ。',
            label: "CLEAR / SIMPLE PRICE"
        }
    ]

    return (
        < div className="relative min-h-screen overflow-hidden bg-black" >
            < div className="pointer-events-none absolute inset-0" >
                <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_50%_35%,rgba(255,255,255,0.06),rgba(0,0,0,0.92)_55%,#000_78%)]" />
                <div className="absolute -top-32 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,200,120,0.10),rgba(255,200,120,0.00)_70%)] blur-2xl" />
                <div className="absolute left-1/2 top-1/2 h-[520px] w-[2px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent blur-[0.5px]" />
                <div
                    className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
                />
            </div >

            < div className="relative z-10 flex min-h-screen items-center justify-center px-6" >
                <div className="relative w-full max-w-5xl">
                    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[920px] -translate-x-1/2 -translate-y-1/2 rounded-[40px] border border-white/10 shadow-[0_0_160px_rgba(255,210,150,0.07)]" />

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

                        {policies.map((policy) => (
                            <div className="relative aspect-square rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_30px_120px_rgba(0,0,0,0.65)]">
                                <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[linear-gradient(135deg,rgba(255,255,255,0.10),rgba(255,255,255,0.00)_45%,rgba(255,200,120,0.06))]" />
                                <div className="pointer-events-none absolute left-6 right-6 top-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                                <div className="relative h-full p-10 sm:p-12 flex flex-col justify-between">
                                    <div>
                                        <div className="inline-flex items-center gap-3 text-[11px] tracking-[0.35em] text-white/55">
                                            <span className="h-px w-10 bg-white/20" />
                                            {policy.title}
                                            <span className="h-px w-10 bg-white/20" />
                                        </div>

                                        <h3 className="lux-heading mt-6 text-3xl sm:text-4xl font-semibold tracking-[0.14em] text-white">
                                            {policy.summary}
                                        </h3>

                                        <p className="mt-5 text-sm sm:text-base font-light leading-relaxed text-white/65">
                                            {policy.description}
                                        </p>
                                    </div>

                                    <div className="mt-8">
                                        <div className="h-px w-16 bg-white/10" />
                                        <div className="mt-6 flex items-center gap-2 text-xs text-white/50 tracking-[0.28em]">
                                            <span className="inline-block h-2 w-2 rounded-full bg-[rgba(201,164,106,0.55)]" />
                                            <span>{policy.label}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>

                    <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(255,210,150,0.10),rgba(255,210,150,0.00)_70%)] blur-2xl" />
                    <div className="pointer-events-none absolute -right-10 -bottom-12 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06),rgba(255,255,255,0.00)_70%)] blur-2xl" />
                </div>
            </div >
        </div >








    )





}