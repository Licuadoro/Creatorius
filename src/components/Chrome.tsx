import { useEffect, useState, type ReactNode } from "react";
import RuneGlyph from "./RuneGlyph";
import { ANCIENT_MEANING, FLOATERS, LICUADO_URL, MARQUEE_ITEMS } from "../data";
import { useInView, useScramble } from "../hooks";

/* ---------------- Reveal (aparición al hacer scroll) ---------------- */

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.14);
  return (
    <div ref={ref} className={`fade-up ${inView ? "on" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function SectionHeading({ kicker, title, accent }: { kicker: string; title: ReactNode; accent?: string }) {
  return (
    <Reveal className="mb-12">
      <p className="font-digital text-[11px] tracking-[0.3em] text-gold-500">
        <span className="text-mint-400">//</span> {kicker}
      </p>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-wide text-parch-100 lg:text-[2.6rem] lg:leading-tight">
        {title}
      </h2>
      {accent && <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-parch-500">{accent}</p>}
      <div className="mt-5 h-px w-24 bg-gradient-to-r from-gold-500 to-transparent" aria-hidden="true" />
    </Reveal>
  );
}

/* ---------------- Fondo ambiental ---------------- */

export function Ambient() {
  return (
    <>
      <div className="fixed inset-0 -z-10 bg-ink-900" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(1100px_700px_at_12%_8%,rgba(227,179,65,0.09),transparent_65%),radial-gradient(950px_650px_at_88%_85%,rgba(94,234,212,0.07),transparent_65%),radial-gradient(700px_500px_at_70%_15%,rgba(196,69,60,0.05),transparent_70%)]" />
        <div className="grid-lines absolute inset-0" />
        {/* runa colosal girando lentamente */}
        <RuneGlyph
          ch="c"
          strokeWidth={0.8}
          className="spin-slower absolute -bottom-32 -left-24 h-[430px] w-[430px] text-gold-500/[0.05]"
        />
        <RuneGlyph
          ch="s"
          strokeWidth={0.8}
          className="spin-slow absolute -right-20 top-1/3 h-[300px] w-[300px] text-mint-500/[0.05]"
        />
        {/* runas flotantes */}
        {FLOATERS.map((f, i) => (
          <span
            key={i}
            className="floater absolute"
            style={
              {
                top: f.top,
                left: f.left,
                width: f.size,
                opacity: f.opacity,
                color: f.tone === "gold" ? "var(--color-gold-400)" : "var(--color-mint-400)",
                "--dx": `${f.dx}px`,
                "--dy": `${f.dy}px`,
                "--dur": `${f.dur}s`,
                "--del": `${f.del}s`,
                "--rot": `${f.rot}deg`,
              } as React.CSSProperties
            }
          >
            <RuneGlyph ch={f.ch} className="h-auto w-full" strokeWidth={1.6} />
          </span>
        ))}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />
      </div>
      <div className="noise-overlay" style={{ zIndex: 60 }} aria-hidden="true" />
    </>
  );
}

/* ---------------- Cabecera ---------------- */

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const word = useScramble("CREATORIUS", true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled ? "border-b border-gold-600/25 bg-ink-900/85 py-2.5 backdrop-blur-md" : "border-b border-transparent py-5"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6">
        <a href="#inicio" className="group flex items-center gap-3">
          <svg viewBox="0 0 34 34" className="h-8 w-8 text-gold-400 transition-transform duration-500 group-hover:rotate-90" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 5 L11 17 L22 29" />
            <path d="M11 17 H26" />
          </svg>
          <span className="font-display text-[15px] font-bold tracking-[0.34em] text-parch-100">
            {word || "CREATORIUS"}
          </span>
        </a>

        <nav className="hidden items-center gap-7 font-digital text-[11px] tracking-[0.2em] text-parch-300 lg:flex">
          <a href="#ritual" className="link-underline transition-colors hover:text-gold-300">EL RITUAL</a>
          <a href="#ofrendas" className="link-underline transition-colors hover:text-gold-300">OFRENDAS</a>
        </nav>

        <div className="flex items-center gap-4">
          <span className="hidden items-center gap-2 border border-mint-500/30 bg-mint-500/[0.06] px-3 py-1.5 font-digital text-[10px] tracking-[0.18em] text-mint-300 sm:flex">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-mint-400" />
            ABIERTO A ENCARGOS
          </span>
          <a
            href="#contacto"
            className="border border-gold-500/60 bg-gold-400/[0.07] px-4 py-2 font-digital text-[11px] tracking-[0.18em] text-gold-300 transition-all duration-300 hover:bg-gold-400 hover:text-ink-900 hover:shadow-[0_0_28px_rgba(227,179,65,0.35)]"
          >
            ENCARGAR
          </a>
        </div>
      </div>
    </header>
  );
}

/* ---------------- Cinta corrediza ---------------- */

function MarqueeChunk() {
  return (
    <div className="flex shrink-0 items-center">
      {MARQUEE_ITEMS.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="px-6 font-digital text-[13px] tracking-[0.3em] text-gold-500/85">{item}</span>
          <svg viewBox="0 0 10 10" className="h-2 w-2 text-mint-500/70" aria-hidden="true">
            <path d="M5 0.5 L9.5 5 L5 9.5 L0.5 5 Z" fill="currentColor" />
          </svg>
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div className="marquee-mask relative overflow-hidden border-y border-gold-600/20 bg-ink-850/70 py-3.5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-900 to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-900 to-transparent" aria-hidden="true" />
      <div className="marquee-track">
        <MarqueeChunk />
        <MarqueeChunk />
      </div>
    </div>
  );
}

/* ---------------- Pie / contacto ---------------- */

export function Footer() {
  return (
    <footer id="contacto" className="relative mt-10 border-t border-gold-600/20">
      <div className="mx-auto w-full max-w-7xl px-6 pb-10 pt-20 lg:pt-28">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <p className="font-digital text-[11px] tracking-[0.3em] text-gold-500">
              <span className="text-mint-400">//</span> CONTACTO
            </p>
            <h2 className="mt-4 font-display text-4xl font-black leading-[1.08] tracking-wide text-parch-100 lg:text-6xl">
              ¿FORJAMOS
              <br />
              <span className="text-gold-400">TU MUNDO?</span>
            </h2>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-parch-300/90">
              Cuéntame la idea que te ronda. Sin fórmulas, sin cuestionarios eternos: una conversación,
              un pacto honesto y tu web tomando forma. El precio se negocia mirándose a los ojos.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={LICUADO_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 bg-gold-400 px-7 py-3.5 font-digital text-[12px] tracking-[0.22em] text-ink-900 transition-all duration-300 hover:shadow-[0_0_40px_rgba(227,179,65,0.45)] hover:brightness-110"
              >
                ESCRÍBEME VÍA LICUADO
                <svg viewBox="0 0 16 16" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 13 13 3M6 3h7v7" />
                </svg>
              </a>
              <a
                href="#inicio"
                className="font-digital text-[11px] tracking-[0.2em] text-parch-500 transition-colors hover:text-mint-400"
              >
                ↑ VOLVER A LAS RUNAS
              </a>
            </div>
          </Reveal>

          <Reveal delay={140} className="lg:justify-self-end">
            <div className="relative max-w-sm border border-ink-600/80 bg-ink-850/80 p-6">
              <RuneGlyph ch="g" className="absolute -right-4 -top-5 h-12 w-12 text-gold-500/30" strokeWidth={1.6} />
              <p className="font-digital text-[10px] tracking-[0.28em] text-parch-500">DOGMAS DE LA CASA</p>
              <ul className="mt-4 space-y-3 text-sm text-parch-300/90">
                {[
                  "Ninguna idea es demasiado rara.",
                  "El precio se pacta antes, nunca después.",
                  "Si no brilla, vuelve a la forja.",
                  "Cada web es un mundo, no una plantilla.",
                ].map((d, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg viewBox="0 0 10 10" className="mt-1.5 h-2 w-2 shrink-0 text-gold-500" aria-hidden="true">
                      <path d="M5 0.5 L9.5 5 L5 9.5 L0.5 5 Z" fill="currentColor" />
                    </svg>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-ink-700/80 pt-8 md:flex-row md:items-center">
          <p className="max-w-md text-[13px] italic leading-relaxed text-parch-500">
            «{ANCIENT_MEANING}»
          </p>
          <div className="flex items-center gap-5 font-digital text-[10px] tracking-[0.2em] text-parch-500">
            <span>CREATORIUS © 2026</span>
            <span className="hidden h-3 w-px bg-ink-600 sm:block" aria-hidden="true" />
            <span>FORJADO A MANO Y A RUNA</span>
            <a href={LICUADO_URL} target="_blank" rel="noreferrer" className="link-underline text-gold-500 transition-colors hover:text-gold-300">
              LICUADO
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
