import RuneGlyph from "./RuneGlyph";
import { PORTAFOLIO, type Obra } from "../data";
import { Reveal, SectionHeading } from "./Chrome";

const TONO = {
  gold: {
    border: "hover:border-gold-400/70",
    glow: "hover:shadow-[0_28px_70px_-26px_rgba(227,179,65,0.4)]",
    text: "text-gold-400",
    ring: "group-hover:bg-gold-400/12",
    mono: "text-gold-300",
  },
  mint: {
    border: "hover:border-mint-400/70",
    glow: "hover:shadow-[0_28px_70px_-26px_rgba(94,234,212,0.38)]",
    text: "text-mint-400",
    ring: "group-hover:bg-mint-400/12",
    mono: "text-mint-300",
  },
  ember: {
    border: "hover:border-ember-400/70",
    glow: "hover:shadow-[0_28px_70px_-26px_rgba(226,99,90,0.38)]",
    text: "text-ember-400",
    ring: "group-hover:bg-ember-400/12",
    mono: "text-ember-300",
  },
} as const;

const RUNAS_OBRA = ["j", "e", "o", "s", "g", "d", "q", "u"];

function ObraCard({ obra, i }: { obra: Obra; i: number }) {
  const tono = TONO[obra.tono];
  const monograma = obra.nombre.trim().charAt(0).toUpperCase() || "W";
  const dominio = obra.dominio.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return (
    <Reveal delay={(i % 4) * 90}>
      <a
        href={obra.url}
        target="_blank"
        rel="noreferrer"
        className={`obra-card group relative block aspect-square overflow-hidden border border-ink-600 bg-[linear-gradient(160deg,#161f2e,#0d131d)] transition-all duration-500 hover:-translate-y-2 ${tono.border} ${tono.glow}`}
      >
        {/* esquinas que crecen */}
        <span className="pc-corner pc-tl" aria-hidden="true" />
        <span className="pc-corner pc-tr" aria-hidden="true" />
        <span className="pc-corner pc-bl" aria-hidden="true" />
        <span className="pc-corner pc-br" aria-hidden="true" />

        {/* runa de fondo */}
        <RuneGlyph
          ch={RUNAS_OBRA[i % RUNAS_OBRA.length]}
          strokeWidth={0.9}
          className={`absolute -bottom-8 -right-8 h-40 w-40 opacity-[0.07] transition-all duration-700 ${tono.text} group-hover:rotate-12 group-hover:opacity-[0.14]`}
        />

        {/* barrido de luz */}
        <span className="obra-shine" aria-hidden="true" />

        <span className="relative flex h-full flex-col justify-between p-5">
          <span className="flex items-start justify-between">
            <span className={`font-display text-[44px] font-black leading-none ${tono.mono} transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110`}>
              {monograma}
            </span>
            <span className={`grid h-9 w-9 place-items-center border border-ink-600 ${tono.text} transition-all duration-500 group-hover:border-current group-hover:bg-ink-900/60`}>
              <svg viewBox="0 0 16 16" className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3.5 12.5 12.5 3.5M6 3.5h6.5V10" />
              </svg>
            </span>
          </span>

          <span>
            <span className="font-digital text-[9px] tracking-[0.26em] text-parch-600">OBRA {String(i + 1).padStart(2, "0")}</span>
            <span className={`mt-1 block truncate font-display text-[17px] font-bold tracking-wide text-parch-100 transition-colors duration-300`}>
              {obra.nombre}
            </span>
            <span className="mt-0.5 block truncate font-digital text-[10.5px] tracking-[0.08em] text-parch-500 group-hover:text-parch-300">
              {dominio}
            </span>
            <span className={`mt-3 inline-flex items-center gap-2 font-digital text-[9px] tracking-[0.24em] opacity-0 transition-all duration-500 group-hover:opacity-100 ${tono.text}`}>
              VISITAR ESTE MUNDO
              <svg viewBox="0 0 14 14" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2 7h10M8 3l4 4-4 4" />
              </svg>
            </span>
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
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
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
