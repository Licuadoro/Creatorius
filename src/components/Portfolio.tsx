import { useEffect, useState } from "react";
import RuneGlyph from "./RuneGlyph";
import { ILUSTRACIONES, PORTAFOLIO, type Ilustracion, type Obra } from "../data";
import { Reveal, SectionHeading } from "./Chrome";

const TONO = {
  gold: {
    border: "hover:border-gold-400/70",
    glow: "hover:shadow-[0_30px_70px_-24px_rgba(227,179,65,0.35)]",
    text: "text-gold-400",
    dot: "bg-gold-400",
    mono: "text-gold-300",
  },
  mint: {
    border: "hover:border-mint-400/70",
    glow: "hover:shadow-[0_30px_70px_-24px_rgba(94,234,212,0.32)]",
    text: "text-mint-400",
    dot: "bg-mint-400",
    mono: "text-mint-300",
  },
  ember: {
    border: "hover:border-ember-400/70",
    glow: "hover:shadow-[0_30px_70px_-24px_rgba(226,99,90,0.32)]",
    text: "text-ember-400",
    dot: "bg-ember-400",
    mono: "text-ember-300",
  },
} as const;

const RUNAS_OBRA = ["j", "e", "o", "s", "g", "d", "q", "u"];

function ObraCard({ obra, i }: { obra: Obra; i: number }) {
  const tono = TONO[obra.tono];
  const runa = RUNAS_OBRA[i % RUNAS_OBRA.length];
  const [rota, setRota] = useState(false);
  return (
    <Reveal delay={(i % 3) * 110} className="h-full">
      <a
        href={obra.url}
        target="_blank"
        rel="noreferrer"
        className={`obra-card group relative flex h-full aspect-square flex-col overflow-hidden border border-ink-600 bg-[linear-gradient(165deg,#151e2c,#0d131d_75%)] transition-all duration-500 hover:-translate-y-2 ${tono.border} ${tono.glow}`}
      >
        {/* esquinas que crecen */}
        <span className="pc-corner pc-tl z-10" aria-hidden="true" />
        <span className="pc-corner pc-tr z-10" aria-hidden="true" />
        <span className="pc-corner pc-bl z-10" aria-hidden="true" />
        <span className="pc-corner pc-br z-10" aria-hidden="true" />

        {/* barrido de luz */}
        <span className="obra-shine" aria-hidden="true" />

        {/* runa de fondo */}
        <RuneGlyph
          ch={runa}
          strokeWidth={0.9}
          className={`absolute -right-8 -top-10 h-36 w-36 opacity-[0.05] transition-all duration-700 ${tono.text} group-hover:rotate-12 group-hover:opacity-[0.12]`}
        />

        {/* identidad y descripción: siempre visibles arriba */}
        <span className="relative flex flex-col p-5 pb-0">
          <span className="flex items-start justify-between gap-3">
            <span className="min-w-0">
              <span className="font-digital text-[8.5px] tracking-[0.28em] text-parch-600">
                OBRA {String(i + 1).padStart(2, "0")}
              </span>
              <span className="mt-1 block truncate font-display text-[20px] font-bold leading-tight tracking-wide text-parch-100">
                {obra.nombre}
              </span>
            </span>
            <span className={`grid h-9 w-9 shrink-0 place-items-center border border-ink-600 ${tono.text} transition-all duration-500 group-hover:border-current group-hover:bg-ink-900/70`}>
              <svg viewBox="0 0 16 16" className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3.5 12.5 12.5 3.5M6 3.5h6.5V10" />
              </svg>
            </span>
          </span>
          <span className="mt-2.5 block text-[12.5px] leading-relaxed text-parch-400 transition-colors duration-300 group-hover:text-parch-300">
            {obra.desc}
          </span>
        </span>

        {/* vista previa: ocupa el resto de la tarjeta */}
        <span className="relative mt-4 block min-h-0 flex-1 p-5 pt-0">
          <span className="flex h-full min-h-0 flex-col overflow-hidden border border-ink-600 bg-ink-900">
            <span className="flex shrink-0 items-center gap-1.5 border-b border-ink-700 bg-ink-850 px-2.5 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-ink-600" />
              <span className="h-1.5 w-1.5 rounded-full bg-ink-600" />
              <span className="h-1.5 w-1.5 rounded-full bg-ink-600" />
              <span className="ml-2 truncate font-digital text-[8px] tracking-[0.14em] text-parch-600 transition-colors duration-300 group-hover:text-parch-400">
                {obra.dominio}
              </span>
            </span>
            <span className="relative block min-h-0 flex-1 overflow-hidden">
              {!rota ? (
                <img
                  src={obra.img}
                  alt={`Vista previa de ${obra.nombre}`}
                  loading="lazy"
                  onError={() => setRota(true)}
                  className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
              ) : (
                <span className="grid h-full w-full place-items-center bg-ink-900">
                  <RuneGlyph ch={runa} strokeWidth={1.1} className={`h-14 w-14 ${tono.text} opacity-50`} />
                </span>
              )}
              {/* llamada al pasar el cursor */}
              <span className={`absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between gap-2 bg-ink-950/90 px-3 py-2 backdrop-blur-sm transition-transform duration-500 group-hover:translate-y-0`}>
                <span className={`inline-flex items-center gap-2 font-digital text-[8.5px] tracking-[0.22em] ${tono.mono}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${tono.dot}`} />
                  VISITAR ESTE MUNDO
                </span>
                <svg viewBox="0 0 14 14" className={`h-3 w-3 ${tono.text}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M2 7h10M8 3l4 4-4 4" />
                </svg>
              </span>
            </span>
          </span>
        </span>
      </a>
    </Reveal>
  );
}

/* ---------------- ilustraciones ---------------- */

const ROTACIONES = ["-rotate-2", "rotate-1", "-rotate-1"];
const ROMANOS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

function Lamina({ ilus, i, onOpen }: { ilus: Ilustracion; i: number; onOpen: (idx: number) => void }) {
  return (
    <Reveal delay={(i % 3) * 120}>
      <button
        onClick={() => onOpen(i)}
        className={`lamina group relative block w-full border border-gold-600/30 bg-[linear-gradient(160deg,#1a1712,#10161f_70%)] p-3 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.85)] transition-all duration-500 hover:z-10 hover:rotate-0 hover:border-gold-400/60 hover:shadow-[0_34px_80px_-28px_rgba(227,179,65,0.3)] ${ROTACIONES[i % ROTACIONES.length]}`}
      >
        <span className="pointer-events-none absolute left-1.5 top-1.5 h-4 w-4 border-l border-t border-gold-500/60" aria-hidden="true" />
        <span className="pointer-events-none absolute bottom-1.5 right-1.5 h-4 w-4 border-b border-r border-gold-500/60" aria-hidden="true" />

        <span className="block overflow-hidden border border-ink-700 bg-ink-900">
          <img
            src={ilus.src}
            alt={ilus.titulo}
            loading="lazy"
            className="mx-auto h-60 w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04] sm:h-72"
          />
        </span>

        <span className="flex items-center justify-between gap-3 px-1.5 pb-0.5 pt-3">
          <span className="min-w-0">
            <span className="block truncate font-display text-[14px] font-bold tracking-wide text-parch-100">{ilus.titulo}</span>
            <span className="mt-0.5 block font-digital text-[8.5px] tracking-[0.26em] text-gold-500/90">
              LÁMINA {ROMANOS[i % ROMANOS.length]} · HECHA A MANO
            </span>
          </span>
          <span className="grid h-8 w-8 shrink-0 place-items-center border border-ink-600 text-gold-400 transition-all duration-500 group-hover:border-gold-400/70 group-hover:bg-gold-400/10">
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 2v8M6 6l-2.5-2M6 6l2.5-2M10 14V6m0 4 2.5 2M10 10l-2.5 2" />
            </svg>
          </span>
        </span>
      </button>
    </Reveal>
  );
}

function Lightbox({ idx, onClose, onNav }: { idx: number; onClose: () => void; onNav: (dir: 1 | -1) => void }) {
  const ilus = ILUSTRACIONES[idx];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onNav]);

  return (
    <div
      className="lightbox-fade fixed inset-0 z-[80] flex items-center justify-center bg-ink-950/95 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={ilus.titulo}
    >
      {/* marco */}
      <div className="lightbox-in relative max-h-full" onClick={(e) => e.stopPropagation()}>
        <div className="relative border border-gold-600/50 bg-[linear-gradient(160deg,#1a1712,#10161f_70%)] p-3 shadow-[0_50px_120px_-30px_rgba(0,0,0,0.95)] sm:p-4">
          <span className="pointer-events-none absolute left-1.5 top-1.5 h-5 w-5 border-l border-t border-gold-400/70" aria-hidden="true" />
          <span className="pointer-events-none absolute right-1.5 top-1.5 h-5 w-5 border-r border-t border-gold-400/70" aria-hidden="true" />
          <span className="pointer-events-none absolute bottom-1.5 left-1.5 h-5 w-5 border-b border-l border-gold-400/70" aria-hidden="true" />
          <span className="pointer-events-none absolute bottom-1.5 right-1.5 h-5 w-5 border-b border-r border-gold-400/70" aria-hidden="true" />
          <img
            key={idx}
            src={ilus.src}
            alt={ilus.titulo}
            className="lightbox-in max-h-[70vh] max-w-[min(88vw,860px)] border border-ink-700 bg-ink-900 object-contain"
          />
        </div>
        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="min-w-0">
            <span className="block truncate font-display text-[15px] font-bold tracking-wide text-parch-100">{ilus.titulo}</span>
            <span className="font-digital text-[9px] tracking-[0.28em] text-gold-500">
              LÁMINA {ROMANOS[idx % ROMANOS.length]} DE {ROMANOS[ILUSTRACIONES.length - 1]}
            </span>
          </p>
          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={() => onNav(-1)}
              aria-label="Lámina anterior"
              className="grid h-10 w-10 place-items-center border border-ink-600 text-parch-300 transition-all duration-300 hover:border-gold-400/70 hover:text-gold-300"
            >
              <svg viewBox="0 0 14 14" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 2 4 7l5 5" /></svg>
            </button>
            <button
              onClick={() => onNav(1)}
              aria-label="Lámina siguiente"
              className="grid h-10 w-10 place-items-center border border-ink-600 text-parch-300 transition-all duration-300 hover:border-gold-400/70 hover:text-gold-300"
            >
              <svg viewBox="0 0 14 14" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m5 2 5 5-5 5" /></svg>
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={onClose}
        aria-label="Cerrar la lámina"
        className="absolute right-4 top-4 grid h-11 w-11 place-items-center border border-ink-600 bg-ink-900/80 text-parch-300 transition-all duration-300 hover:rotate-90 hover:border-red-400/70 hover:text-red-300"
      >
        <svg viewBox="0 0 14 14" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M2 2l10 10M12 2 2 12" /></svg>
      </button>
    </div>
  );
}

/* ---------------- la sección completa ---------------- */

export default function Portafolio() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const nav = (dir: 1 | -1) =>
    setLightbox((cur) => (cur === null ? cur : (cur + dir + ILUSTRACIONES.length) % ILUSTRACIONES.length));

  return (
    <section id="obras" className="relative mx-auto w-full max-w-7xl scroll-mt-24 px-6 py-24 lg:py-28">
      <SectionHeading
        kicker="OBRAS FORJADAS"
        title={
          <>
            El <span className="text-gold-400">portafolio</span>
          </>
        }
        accent="Cada tarjeta es un mundo que ya existe: haz clic sobre ella y entra a verlo con tus propios ojos."
      />

      {PORTAFOLIO.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
              Muy pronto verás aquí los mundos que ya existen. Tu web podría ser la primera de esta lista.
            </p>
          </div>
        </Reveal>
      )}

      {/* -------- tinta y trazo: las ilustraciones -------- */}
      <Reveal className="mt-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-digital text-[11px] tracking-[0.3em] text-gold-500">
              <span className="text-mint-400">//</span> TINTA Y TRAZO
            </p>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-wide text-parch-100 lg:text-4xl">
              Las <span className="text-gold-400">ilustraciones</span> de la casa
            </h3>
          </div>
          <p className="flex items-center gap-2.5 font-digital text-[10px] tracking-[0.2em] text-parch-500">
            <svg viewBox="0 0 16 16" className="h-4 w-4 text-gold-500" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 2v8M6 6l-2.5-2M6 6l2.5-2M10 14V6m0 4 2.5 2M10 10l-2.5 2" />
            </svg>
            TOCA UNA LÁMINA PARA VERLA EN GRANDE
          </p>
        </div>
        <div className="mt-5 h-px w-24 bg-gradient-to-r from-gold-500 to-transparent" aria-hidden="true" />
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        {ILUSTRACIONES.map((ilus, i) => (
          <Lamina key={ilus.src} ilus={ilus} i={i} onOpen={setLightbox} />
        ))}
      </div>

      <Reveal className="mt-10">
        <p className="text-center text-[14px] italic leading-relaxed text-parch-500">
          Toda ilustración de tus añadidos sale de estas mismas manos.{" "}
          <span className="text-parch-300">Nada de stock: trazo propio, tinta propia.</span>
        </p>
      </Reveal>

      {lightbox !== null && <Lightbox idx={lightbox} onClose={() => setLightbox(null)} onNav={nav} />}
    </section>
  );
}
