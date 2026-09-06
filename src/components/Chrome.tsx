import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import RuneGlyph from "./RuneGlyph";
import { FLOATERS, MARQUEE_ITEMS, MONEDA_LISTA } from "../data";
import { useInView, useScramble } from "../hooks";
import { useCurrency } from "../currency";

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

/* ---------------- Selector de moneda ---------------- */

function CurrencyMenu() {
  const { code, setCode, enVivo } = useCurrency();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const lista = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return MONEDA_LISTA;
    return MONEDA_LISTA.filter((m) => m.code.toLowerCase().includes(t) || m.name.toLowerCase().includes(t));
  }, [q]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        title="Cambiar la moneda de todos los precios"
        className={`flex items-center gap-2 border px-3 py-1.5 font-digital text-[10px] tracking-[0.18em] transition-all duration-300 ${
          open
            ? "border-gold-400 bg-gold-400/15 text-gold-200"
            : "border-gold-600/40 bg-gold-400/[0.06] text-gold-300 hover:border-gold-400 hover:bg-gold-400/12"
        }`}
      >
        <svg viewBox="0 0 16 16" className={`h-3.5 w-3.5 transition-transform duration-500 ${open ? "rotate-[360deg]" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
          <circle cx="8" cy="8" r="6.2" />
          <path d="M5.4 8h5.2M6.4 5.9c0-1 .7-1.6 1.6-1.6s1.6.6 1.6 1.6c0 2.4-3.2 1.8-3.2 4.2 0 1 .7 1.6 1.6 1.6s1.6-.6 1.6-1.6" strokeWidth="1.1" strokeLinecap="round" />
        </svg>
        {code}
        <svg viewBox="0 0 12 12" className={`h-2.5 w-2.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M2.5 4.5 6 8l3.5-3.5" />
        </svg>
      </button>

      {open && (
        <div className="menu-pop absolute right-0 top-[calc(100%+10px)] z-50 w-[320px] border border-gold-600/35 bg-ink-900 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.9)]">
          <div className="flex items-center justify-between border-b border-ink-700 px-4 py-3">
            <p className="font-digital text-[10px] tracking-[0.24em] text-gold-400">MONEDA DEL TEMPLO</p>
            <span className={`flex items-center gap-1.5 font-digital text-[9px] tracking-[0.14em] ${enVivo ? "text-mint-400" : "text-parch-500"}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${enVivo ? "bg-mint-400" : "bg-parch-600"}`} />
              {enVivo ? "TASAS EN VIVO" : "TASAS DE RESPALDO"}
            </span>
          </div>
          <div className="px-4 pt-3">
            <input
              autoFocus
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar… (COP, yen, euro…)"
              className="pacto-input py-2 text-[13px]"
            />
          </div>
          <ul className="menu-scroll mt-2 max-h-72 overflow-y-auto px-2 pb-2" role="listbox">
            {lista.map((m) => {
              const activa = m.code === code;
              return (
                <li key={m.code}>
                  <button
                    role="option"
                    aria-selected={activa}
                    onClick={() => {
                      setCode(m.code);
                      setOpen(false);
                      setQ("");
                    }}
                    className={`group flex w-full items-center gap-3 px-2.5 py-2 text-left transition-colors duration-200 ${
                      activa ? "bg-gold-400/[0.12]" : "hover:bg-ink-800"
                    }`}
                  >
                    <span className={`w-11 shrink-0 font-digital text-[11px] tracking-[0.14em] ${activa ? "text-gold-300" : "text-parch-300"}`}>
                      {m.code}
                    </span>
                    <span className="flex-1 truncate text-[12.5px] text-parch-500 group-hover:text-parch-300">{m.name}</span>
                    <span className="shrink-0 font-digital text-[10px] text-parch-600">{m.symbol}</span>
                    {activa && (
                      <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 shrink-0 text-gold-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="m1.5 5.2 2.4 2.4L8.5 2.6" />
                      </svg>
                    )}
                  </button>
                </li>
              );
            })}
            {lista.length === 0 && (
              <li className="px-3 py-6 text-center text-[12.5px] italic text-parch-500">
                Ninguna moneda responde a ese nombre.
              </li>
            )}
          </ul>
          <p className="border-t border-ink-700 px-4 py-2.5 font-digital text-[9px] leading-relaxed tracking-[0.14em] text-parch-600">
            LOS PRECIOS SE TRADUCEN EN TODA LA PÁGINA · CONVERSIÓN ORIENTATIVA
          </p>
        </div>
      )}
    </div>
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
          <a href="#obras" className="link-underline transition-colors hover:text-gold-300">OBRAS</a>
          <a href="#ofrendas" className="link-underline transition-colors hover:text-gold-300">OFRENDAS</a>
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-2 border border-mint-500/30 bg-mint-500/[0.06] px-3 py-1.5 font-digital text-[10px] tracking-[0.18em] text-mint-300 md:flex">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-mint-400" />
            ABIERTO A ENCARGOS
          </span>
          <CurrencyMenu />
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


