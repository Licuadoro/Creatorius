import { useEffect, useMemo, useRef, useState } from "react";
import RuneGlyph from "./RuneGlyph";
import { ANCIENT_MEANING, HEADLINE_LINES } from "../data";
import { useReducedMotion } from "../hooks";

type Cell = { ch: string; g: number; endOfLine: boolean };

const GLYPH_MS = 96;
const SPACE_MS = 42;
const LINE_PAUSE_MS = 330;
const START_DELAY_MS = 1050;

export default function RuneText() {
  const reduced = useReducedMotion();

  const cells = useMemo<Cell[]>(() => {
    const out: Cell[] = [];
    HEADLINE_LINES.forEach((line, li) => {
      Array.from(line).forEach((ch) => {
        out.push({ ch, g: out.length, endOfLine: li < HEADLINE_LINES.length - 1 && false });
      });
    });
    // marca el final de cada línea (salvo la última)
    let cursor = 0;
    HEADLINE_LINES.forEach((line, li) => {
      cursor += Array.from(line).length;
      if (li < HEADLINE_LINES.length - 1) out[cursor - 1].endOfLine = true;
    });
    return out;
  }, []);

  const total = cells.length;
  const [revealed, setRevealed] = useState(0);
  const [done, setDone] = useState(false);
  const [runId, setRunId] = useState(0);
  const skipRef = useRef(false);

  useEffect(() => {
    if (reduced) {
      setRevealed(total);
      setDone(true);
      return;
    }
    let cancelled = false;
    let t = 0;
    skipRef.current = false;
    setRevealed(0);
    setDone(false);

    const delayFor = (i: number) => {
      if (i >= total) return 0;
      let d = cells[i].ch === " " ? SPACE_MS : GLYPH_MS;
      if (i > 0 && cells[i - 1].endOfLine) d += LINE_PAUSE_MS;
      return d;
    };

    const step = (i: number) => {
      if (cancelled || skipRef.current) return;
      setRevealed(i);
      if (i >= total) {
        setDone(true);
        return;
      }
      t = window.setTimeout(() => step(i + 1), delayFor(i));
    };

    t = window.setTimeout(() => step(1), START_DELAY_MS);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [runId, reduced, total, cells]);

  const skip = () => {
    if (done) return;
    skipRef.current = true;
    setRevealed(total);
    setDone(true);
  };

  const replay = () => setRunId((r) => r + 1);

  // reconstruye las líneas conservando los índices globales
  const lines = useMemo(() => {
    const out: Cell[][] = [];
    let i = 0;
    HEADLINE_LINES.forEach((line) => {
      const n = Array.from(line).length;
      out.push(cells.slice(i, i + n));
      i += n;
    });
    return out;
  }, [cells]);

  return (
    <div>
      <div
        key={runId}
        onClick={skip}
        title={done ? undefined : "Clic para completar el conjuro"}
        className={`hero-digital select-none ${done ? "" : "cursor-pointer"}`}
        aria-label={HEADLINE_LINES.join("\n")}
      >
        {lines.map((line, li) => (
          <div key={li} className="whitespace-pre">
            {line.map((c) => {
              const on = c.g < revealed;
              const isNext = !done && c.g === revealed && c.ch !== " ";
              return (
                <span key={c.g} className={`rc ${isNext ? "next" : ""}`} data-on={on}>
                  {c.ch !== " " && (
                    <span
                      className="rc-rune"
                      style={{ "--rd": `${Math.min(c.g * 16, 1000)}ms` } as React.CSSProperties}
                    >
                      <RuneGlyph ch={c.ch} />
                    </span>
                  )}
                  <span className="rc-letter" aria-hidden="true">
                    {c.ch}
                  </span>
                </span>
              );
            })}
          </div>
        ))}
      </div>

      {/* inscripción original: la traducción de las runas */}
      <div
        className={`fade-up mt-7 max-w-xl border-l-2 pl-4 transition-all ${
          done ? "on border-gold-500/60" : "border-transparent"
        }`}
        aria-hidden={!done}
      >
        <p className="font-digital text-[11px] tracking-[0.22em] text-gold-500/90">
          INSCRIPCIÓN ORIGINAL · TRADUCCIÓN
        </p>
        <p className="mt-1.5 text-sm italic leading-relaxed text-parch-300/85">
          «{ANCIENT_MEANING}»
        </p>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          onClick={replay}
          className={`group inline-flex items-center gap-2 border border-gold-600/40 px-3.5 py-2 font-digital text-[11px] tracking-[0.18em] text-gold-300 transition-all duration-300 hover:border-gold-400 hover:bg-gold-400/10 hover:shadow-[0_0_24px_rgba(227,179,65,0.18)] ${
            done ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-rotate-[360deg]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9" />
            <path d="M13.7 1.8v3h-3" />
          </svg>
          REPETIR CONJURO
        </button>
        <span
          className={`font-digital text-[11px] tracking-[0.18em] text-parch-500 transition-opacity duration-500 ${
            done ? "opacity-100" : "opacity-60"
          }`}
        >
          {done ? "// RUNAS SELLADAS" : "// TOCA LAS RUNAS PARA ACELERAR"}
        </span>
      </div>
    </div>
  );
}
