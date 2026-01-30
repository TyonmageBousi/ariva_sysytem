'use client';

import { useMemo } from 'react';

export default function OtherProduct() {
    const productDetailsData: any[] = []; // 本番は props で受け取る想定

    const loopList = useMemo(() => {
        // 無限ループ用に2倍。空なら空でOK
        return [...productDetailsData, ...productDetailsData];
    }, [productDetailsData]);

    return (
        <section className="relative w-full bg-black text-white z-50">
            {/* top soft glow */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_50%_30%,rgba(255,255,255,0.06),rgba(0,0,0,0.92)_55%,#000_78%)]" />
                <div className="absolute -top-24 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,200,120,0.10),rgba(255,200,120,0.00)_70%)] blur-2xl" />
                <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay bg-[url('/noise.png')]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-8 py-28">
                {/* mini header */}
                <div className="mb-12">
                    <p className="text-[11px] font-light tracking-[0.45em] text-white/60 uppercase">
                        CONCEPT
                    </p>
                    <h2 className="mt-4 text-4xl font-extralight tracking-wide text-white">
                        静けさを、贅沢として設計する。
                    </h2>
                    <p className="mt-6 max-w-2xl text-sm font-light leading-relaxed text-white/60">
                        味の前に届くものがある。箱の重み、紙の手触り、ふたが浮く瞬間。
                        それだけで、もう“贈り物”は完成している。
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-10 lg:grid-cols-2">
                    {/* left image */}
                    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
                        <div className="relative h-[420px] w-full">
                            {/* overlays */}
                            <div className="absolute inset-0">
                                <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_35%_30%,rgba(255,220,170,0.16),rgba(0,0,0,0.0)_55%)]" />
                                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.00),rgba(0,0,0,0.55))]" />
                            </div>

                            {/* viewport */}
                            <div className="absolute inset-0 overflow-hidden">
                                {/* track */}
                                <div className="slider-track h-full flex items-center gap-6 px-8">
                                    {loopList.map((product, index) => (
                                        <div
                                            key={`${product?.id ?? product?.name ?? 'p'}-${index}`}
                                            className="shrink-0 w-[280px] h-[320px] overflow-hidden rounded-2xl border border-white/10 bg-black/30"
                                        >
                                            <img
                                                src={product?.productImages?.[0]}
                                                alt={product?.name ?? 'product'}
                                                className="h-full w-full object-cover opacity-[0.95]"
                                                draggable={false}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* chip */}
                            <div className="absolute bottom-6 left-6 rounded-full border border-white/10 bg-black/40 px-4 py-2 backdrop-blur-md">
                                <p className="text-[11px] font-light tracking-widest text-white/70 uppercase">
                                    UNBOXING MOMENT
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* right text */}
                    <div className="flex flex-col justify-between">
                        <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
                            <p className="text-[11px] font-light tracking-[0.45em] text-amber-200/70 uppercase">
                                THE RITUAL
                            </p>

                            <h3 className="mt-4 text-2xl font-extralight tracking-wide text-white">
                                “開ける時間”まで、作品にする。
                            </h3>

                            <p className="mt-6 text-sm font-light leading-relaxed text-white/60">
                                目立つ装飾は要らない。
                                <span className="text-white/90"> 余白と質感だけ </span>
                                を残すことで、静かな強さが生まれる。
                            </p>

                            {/* 3 lines */}
                            <div className="mt-10 space-y-5">
                                {[
                                    { title: 'ふたが浮く、0.5秒', desc: '期待が立ち上がる速度。' },
                                    { title: '整列の美学', desc: '余白が“格”を決める。' },
                                    { title: '香りが先に届く', desc: '味の前に、記憶が始まる。' },
                                ].map((s, i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <span className="mt-1 inline-block h-2 w-2 rounded-full bg-amber-200/60" />
                                        <div className="flex-1">
                                            <p className="text-sm font-light tracking-wide text-white/90">
                                                {s.title}
                                            </p>
                                            <p className="mt-1 text-sm font-light leading-relaxed text-white/55">
                                                {s.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <div className="mt-12 flex flex-wrap items-center gap-4">
                                <button className="group inline-flex items-center gap-2 rounded-full border border-amber-200/30 bg-amber-200/10 px-6 py-3 text-[11px] font-light tracking-[0.35em] text-amber-100 uppercase transition-all duration-300 hover:border-amber-200/50 hover:bg-amber-200/15">
                                    <span>商品を見る</span>
                                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                                        →
                                    </span>
                                </button>

                                <button className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-6 py-3 text-[11px] font-light tracking-[0.35em] text-white/70 uppercase transition-all duration-300 hover:bg-white/[0.04]">
                                    <span>ギフト体験</span>
                                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                                        →
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pointer-events-none h-24 w-full bg-[linear-gradient(to_bottom,rgba(0,0,0,0.00),rgba(0,0,0,1))]" />

            <style jsx>{`
        @keyframes slide {
        from {
            transform: translateX(0);
        }
        to {
            transform: translateX(-50%);
        }
        }

        .slider-track {
        width: max-content;
        animation: slide 30s linear infinite;
        will-change: transform;
        }
`}</style>
        </section>
    );
}
