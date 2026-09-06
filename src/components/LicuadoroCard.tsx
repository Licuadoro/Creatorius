import { useRef, useState } from "react";
import { CARD_PARAGRAPH, LICUADO_LOGO, LICUADO_URL, LICUADORO_PHOTO } from "../data";
import { useReducedMotion } from "../hooks";

function CornerOrnament({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 28 28" className={`pointer-events-none absolute h-7 w-7 text-gold-500/70 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M1 27 V6 Q1 1 6 1 H27" strokeLinecap="round" />
      <path d="M6 6 l4 4 M10 6 l-4 4" strokeLinecap="round" strokeWidth="1.2" />
    </svg>
  );
}

function Diamond({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 10" className={className} aria-hidden="true">
      <path d="M5 0.5 L9.5 5 L5 9.5 L0.5 5 Z" fill="currentColor" />
    </svg>
  );
}

export default function LicuadoroCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [settling, setSettling] = useState(false);
  const [photoOk, setPhotoOk] = useState(true);
  const reduced = useReducedMotion();

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setSettling(false);
    setTilt({ rx: y * -7, ry: x * 9 });
  };

  const onLeave = () => {
    setSettling(true);
    setTilt({ rx: 0, ry: 0 });
  };

  return (
    <div className="relative" style={{ perspective: "1200px" }}>
      {/* halo y anillo orbital tras la tarjeta */}
      <div className="pointer-events-none absolute -inset-10" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(227,179,65,0.1),transparent_70%)]" />
        <svg viewBox="0 0 400 400" className="spin-slow absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 text-gold-600/30" fill="none">
          <circle cx="200" cy="200" r="192" stroke="currentColor" strokeWidth="1" strokeDasharray="3 14" />
          <circle cx="200" cy="8" r="3.5" fill="#e3b341" opacity="0.8" />
          <circle cx="200" cy="392" r="2.5" fill="#5eead4" opacity="0.7" />
        </svg>
      </div>

      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={`card-tilt relative w-[min(92vw,410px)] border border-gold-600/35 bg-ink-850/95 px-7 pb-7 pt-8 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.75),0_0_50px_-18px_rgba(227,179,65,0.35)] ${settling ? "settling" : ""}`}
        style={{ transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
      >
        <CornerOrnament className="left-2 top-2" />
        <CornerOrnament className="right-2 top-2 rotate-90" />
        <CornerOrnament className="bottom-2 right-2 rotate-180" />
        <CornerOrnament className="bottom-2 left-2 -rotate-90" />

        {/* sello */}
        <div className="stamp-in pointer-events-none absolute -right-4 -top-6 z-10 select-none" aria-hidden="true">
          <div className="stamp-ink flex items-center gap-2 bg-ink-900/40 px-3.5 py-2">
            <Diamond className="h-2 w-2" />
            <div className="font-display text-[12px] leading-[1.15] tracking-[0.14em]" style={{ fontWeight: 800 }}>
              ABIERTO A
              <br />
              NEGOCIAR
            </div>
            <Diamond className="h-2 w-2" />
          </div>
        </div>

        {/* identidad */}
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <div className="breathe absolute -inset-1.5 border border-mint-500/40" aria-hidden="true" />
            {photoOk ? (
              <img
                src={LICUADORO_PHOTO}
                alt="Retrato de Licuadoro"
                onError={() => setPhotoOk(false)}
                className="breathe h-[88px] w-[88px] border border-gold-500/50 object-cover"
                loading="eager"
              />
            ) : (
              <div className="flex h-[88px] w-[88px] items-center justify-center border border-gold-500/50 bg-ink-800 font-display text-4xl font-bold text-gold-400">
                L
              </div>
            )}
          </div>
          <div>
            <p className="font-digital text-[10px] tracking-[0.3em] text-mint-400">ARTESANO DIGITAL</p>
            <h2 className="mt-1 font-display text-[26px] font-bold leading-none tracking-wide text-parch-100">
              Licuadoro
            </h2>
            <p className="mt-1.5 text-xs text-parch-500">forja webs · invoca ideas</p>
          </div>
        </div>

        {/* divisor ornamental */}
        <div className="mt-5 flex items-center gap-3 text-gold-600/70" aria-hidden="true">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-600/50 to-gold-600/50" />
          <Diamond className="h-1.5 w-1.5 text-gold-500" />
          <span className="h-px flex-1 bg-gradient-to-l from-transparent via-gold-600/50 to-gold-600/50" />
        </div>

        {/* membresía */}
        <div className="mt-4 text-center">
          <p className="text-sm tracking-wide text-parch-300/90">miembro de</p>
          <a
            href={LICUADO_URL}
            target="_blank"
            rel="noreferrer"
            className="group relative mt-2 inline-block transition-transform duration-300 hover:scale-[1.05]"
            title="Visitar LICUADO"
          >
            <span className="absolute -inset-3 bg-gold-400/0 blur-xl transition-all duration-500 group-hover:bg-gold-400/15" aria-hidden="true" />
            <img
              src={LICUADO_LOGO}
              alt="Logotipo del estudio LICUADO"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              className="relative mx-auto h-16 w-auto object-contain"
              loading="eager"
            />
            <span className="relative mx-auto mt-1 block h-px w-0 bg-mint-400 transition-all duration-500 group-hover:w-full" aria-hidden="true" />
          </a>
        </div>

        {/* manifiesto */}
        <p className="mt-5 text-[13.5px] leading-[1.75] text-parch-300/95">
          <span className="float-left mr-2 mt-0.5 font-display text-[34px] font-bold leading-[0.85] text-gold-400">S</span>
          {CARD_PARAGRAPH.slice(1)}
        </p>

        {/* ficha */}
        <dl className="mt-5 grid grid-cols-3 gap-2 border-y border-ink-600/60 py-3 font-digital text-[10px] tracking-wider">
          <div>
            <dt className="text-parch-500">OFICIO</dt>
            <dd className="mt-1 text-gold-300">CREADOR WEB</dd>
          </div>
          <div>
            <dt className="text-parch-500">ESTUDIO</dt>
            <dd className="mt-1 text-gold-300">LICUADO</dd>
          </div>
          <div>
            <dt className="text-parch-500">ESTADO</dt>
            <dd className="mt-1 text-mint-400">DISPONIBLE</dd>
          </div>
        </dl>

        <a
          href="#calculadora"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("calculadora")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="group mt-5 flex w-full items-center justify-center gap-2 border border-gold-500/60 bg-gold-400/[0.07] py-3 font-digital text-[12px] tracking-[0.22em] text-gold-300 transition-all duration-300 hover:bg-gold-400 hover:text-ink-900 hover:shadow-[0_0_34px_rgba(227,179,65,0.35)]"
        >
          ENCARGAR UNA WEB
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 8h11M9 3.5 13.5 8 9 12.5" />
          </svg>
        </a>
      </div>
    </div>
  );
}
