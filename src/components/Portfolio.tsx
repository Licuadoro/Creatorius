import { useState } from "react";
import RuneGlyph from "./RuneGlyph";
import { PORTAFOLIO, type Obra } from "../data";
import { Reveal, SectionHeading } from "./Chrome";

const TONO = {
  gold: {
    border: "hover:border-gold-400/70",
    glow: "hover:shadow-[0_30px_70px_-24px_rgba(227,179,65,0.35)]",
    text: "text-gold-400",
    dot: "bg-gold-400",
    mono: "text-gold-300",
    chip: "border-gold-500/40 text-gold-300",
  },
  mint: {
    border: "hover:border-mint-400/70",
    glow: "hover:shadow-[0_30px_70px_-24px_rgba(94,234,212,0.32)]",
    text: "text-mint-400",
    dot: "bg-mint-400",
    mono: "text-mint-300",
    chip: "border-mint-500/40 text-mint-300",
  },
  ember: {
    border: "hover:border-ember-400/70",
    glow: "hover:shadow-[0_30px_70px_-24px_rgba(226,99,90,0.32)]",
    text: "text-ember-400",
    dot: "bg-ember-400",
    mono: "text-ember-300",
    chip: "border-ember-400/40 text-ember-300",
  },
} as const;

const RUNAS_OBRA = ["j", "e", "o", "s", "g", "d", "q", "u"];

/** Vista previa dentro de un marco de navegador; si la imagen falla, cae a una runa. */
function ObraPreview({ obra, tono, runa }: { obra: Obra; tono: (typeof TONO)[keyof typeof TONO]; runa: string }) {
  const [rota, setRota] = useState(false);
  return (
    <div className="obra-prev relative overflow-hidden border-b border-ink-600/80 bg-ink-900">
      <div className="flex items-center gap-1.5 border-b border-ink-700 bg-ink-850 px-2.5 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-ink-600" />
        <span className="h-1.5 w-1.5 rounded-full bg-ink-600" />
        <span className="h-1.5 w-1.5 rounded-full bg-ink-600" />
        <span className="ml-2 truncate font-digital text-[8px] tracking-[0.14em] text-parch-600">{obra.dominio}</span>
      </div>
      <div className="obra-prev-img relative aspect-[16/9] overflow-hidden">
        {!rota ? (
          <img
            src={obra.img}
            alt={`Vista previa de ${obra.nombre}`}
            loading="lazy"
            onError={() => setRota(true)}
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.07]"
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-ink-900">
            <RuneGlyph ch={runa} strokeWidth={1.1} className={`h-16 w-16 ${tono.text} opacity-50`} />
          </div>
        )}
        {/* velo inferior para fundir con el texto */}
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#0d131d] to-transparent" aria-hidden="true" />
      </div>
    </div>
  );
}

function ObraCard({ obra, i }: { obra: Obra; i: number }) {
  const tono = TONO[obra.tono];
  const runa = RUNAS_OBRA[i % RUNAS_OBRA.length];
  return (
    <Reveal delay={(i % 3) * 110}>
      <a
        href={obra.url}
        target="_blank"
        rel="noreferrer"
        className={`obra-card group relative flex aspect-square flex-col overflow-hidden border border-ink-600 bg-[linear-gradient(165deg,#151e2c,#0d131d_75%)] transition-all duration-500 hover:-translate-y-2 ${tono.border} ${tono.glow}`}
      >
        {/* esquinas que crecen */}
        <span className="pc-corner pc-tl z-10" aria-hidden="true" />
        <span className="pc-corner pc-tr z-10" aria-hidden="true" />
        <span className="pc-corner pc-bl z-10" aria-hidden="true" />
        <span className="pc-corner pc-br z-10" aria-hidden="true" />

        {/* barrido de luz */}
        <span className="obra-shine" aria-hidden="true" />

        {/* runa de fondo en la zona de texto */}
        <RuneGlyph
          ch={runa}
          strokeWidth={0.9}
          className={`absolute -bottom-10 -right-8 h-36 w-36 opacity-[0.06] transition-all duration-700 ${tono.text} group-hover:rotate-12 group-hover:opacity-[0.13]`}
        />

        {/* vista previa */}
        <ObraPreview obra={obra} tono={tono} runa={runa} />

        {/* identidad */}
        <span className="relative flex min-h-0 flex-1 flex-col p-5">
          <span className="flex items-start justify-between gap-3">
            <span className="min-w-0">
              <span className="font-digital text-[8.5px] tracking-[0.28em] text-parch-600">OBRA {String(i + 1).padStart(2, "0")}</span>
              <span className="mt-1 block truncate font-display text-[19px] font-bold leading-tight tracking-wide text-parch-100">
                {obra.nombre}
              </span>
            </span>
            <span className={`grid h-9 w-9 shrink-0 place-items-center border border-ink-600 ${tono.text} transition-all duration-500 group-hover:border-current group-hover:bg-ink-900/70`}>
              <svg viewBox="0 0 16 16" className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3.5 12.5 12.5 3.5M6 3.5h6.5V10" />
              </svg>
            </span>
          </span>

          <span className="mt-2.5 min-h-0 flex-1 overflow-hidden">
            <span className="line-clamp-3 block text-[12.5px] leading-relaxed text-parch-500 transition-colors duration-300 group-hover:text-parch-300">
              {obra.desc}
            </span>
          </span>

          <span className={`mt-3 inline-flex items-center gap-2 font-digital text-[9px] tracking-[0.24em] ${tono.mono}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${tono.dot}`} />
            <span className="opacity-60 transition-all duration-500 group-hover:translate-x-0.5 group-hover:opacity-100">VISITAR ESTE MUNDO</span>
          </span>
        </span>
      </a>
    </Reveal>
  );
}

export default function Portafolio() {
  return (
    <section id="obras" className="relative mx-auto w-full max-w-7xl scroll-mt-24 px-6 py-24 lg:py-28">
      <SectionHeading
        kicker="OBRAS FORJADAS"
        title={
          <>
            El <span className="text-gold-400">portafolio</span>
          </>
        }
        accent="Cada tarjeta es un mundo que ya existe. Haz clic sobre ella y entra a verlo con tus propios ojos."
      />

      {PORTAFOLIO.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {PORTAFOLIO.map((obra, i) => (
            <ObraCard key={obra.url} obra={obra} i={i} />
          ))}
        </div>
      ) : (
        <Reveal>
          <div className="relative mx-auto flex max-w-xl flex-col items-center border border-dashed border-gold-600/35 px-8 py-16 text-center">
            <RuneGlyph ch="j" strokeWidth={1.2} className="spin-slow h-14 w-14 text-gold-500/60" />
            <p className="mt-6 font-display text-xl font-bold tracking-wide text-parch-100">
              El portafolio se está <span className="text-gold-400">forjando</span>
            </p>
            <p className="mt-3 max-w-sm text-[14.5px] leading-relaxed text-parch-500">
              Muy pronto verás aquí, como tarjetas, los mundos que ya existen. Tu web podría ser la primera de esta lista.
            </p>
          </div>
        </Reveal>
      )}
    </section>
  );
}
