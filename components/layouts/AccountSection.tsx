"use client"

export default function AccountSection() {
    return (
        <div
            className="
      hidden md:flex md:fixed md:inset-y-0 md:left-0 md:w-1/2
      items-center justify-center px-14 py-16 overflow-hidden
    "
        >
            {/* background layers */}
            <div className="pointer-events-none absolute inset-0">
                {/* vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_50%_30%,rgba(255,255,255,0.06),rgba(0,0,0,0.92)_55%,#000_78%)]" />
                {/* warm halo */}
                <div className="absolute -top-24 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,200,120,0.12),rgba(255,200,120,0.00)_70%)] blur-2xl" />
                {/* subtle grain */}
                <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay bg-[url('/noise.png')]" />
            </div>

            <div className="relative z-10 max-w-md text-left">
                <p className="text-[11px] tracking-[0.45em] text-white/55">VELOUR CACAO</p>
                <h1 className="mt-4 text-4xl lg:text-5xl font-extralight tracking-wide">
                    Velour Cacao
                    <span className="block mt-3 text-base tracking-[0.35em] text-amber-200/80">
                        Treat Yourself
                    </span>
                </h1>
                <p className="mt-6 text-sm leading-relaxed text-white/55">
                    ログインして、あなたのとっておきのチョコをお届け。<br />
                    会員限定の先行セールや、バレンタインのギフト予約も。
                </p>

                <div className="mt-10 h-px w-full bg-white/10" />
                <p className="mt-6 text-xs leading-relaxed text-white/45">
                    静けさを、贅沢として設計する。<br />
                    味の前に届くものがある。
                </p>
            </div>
        </div>
    )

}