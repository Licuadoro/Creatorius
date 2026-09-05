import { useEffect, useMemo, useRef, useState } from "react";
import { POEM } from "../data";
import { useInView, useReducedMotion } from "../hooks";

function PenNib({ hidden }: { hidden: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`poem-caret -mb-1 ml-0.5 inline-block h-[0.85em] w-[0.85em] text-gold-400 transition-opacity duration-500 ${hidden ? "opacity-0" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 20c0-4 1.5-6.5 4-9L17.5 1.5 22.5 6.5 13 16c-2.5 2.5-5 4-9 4Z" />
      <path d="M13 6l5 5" />
      <path d="M4 20l4.5-4.5" />
    </svg>
  );
}

export default function Poem() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);
  const [runId, setRunId] = useState(0);
  const timer = useRef<number | null>(null);

  const total = POEM.length;
  const finished = count >= total;

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setCount(total);
      return;
    }
    let i = 0;
    setCount(0);
    timer.current = window.setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= total && timer.current) {
        window.clearInterval(timer.current);
        timer.current = null;
      }
    }, 26);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [inView, runId, reduced, total]);

  const visible = useMemo(() => POEM.slice(0, count), [count]);
  const lines = useMemo(() => visible.split("\n"), [visible]);

  const replay = () => {
    if (timer.current) window.clearInterval(timer.current);
    setRunId((r) => r + 1);
  };

  // índice de la última línea con contenido (para colocar la pluma)
  let lastContentIdx = -1;
  lines.forEach((l, i) => { if (l.length > 0) lastContentIdx = i; });

  return (
    <section id="conjuro" className="relative mx-auto w-full max-w-6xl px-6 py-24 lg:py-32" ref={ref}>
      {/* pluma gigante de fondo */}
      <svg viewBox="0 0 24 24" className="pointer-events-none absolute -right-4 top-10 h-72 w-72 rotate-12 text-gold-500/[0.05] lg:-right-16 lg:h-96 lg:w-96" fill="currentColor" aria-hidden="true">
        <path d="M4 20c0-4 1.5-6.5 4-9L17.5 1.5 22.5 6.5 13 16c-2.5 2.5-5 4-9 4Z" />
      </svg>

      <div className="mb-10">
        <p className="font-digital text-[11px] tracking-[0.3em] text-gold-500">
          <span className="text-mint-400">//</span> EL CONJURO DEL ENCARGO
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-wide text-parch-100 lg:text-4xl">
          Lo que recito antes de <span className="text-gold-400">forjar</span> cada web
        </h2>
        <div className="mt-4 h-px w-24 bg-gradient-to-r from-gold-500 to-transparent" aria-hidden="true" />
      </div>

      <div className="relative max-w-3xl">
        <div className="font-hand text-[clamp(1.55rem,2.7vw,2.15rem)] leading-[1.45] text-[#ecd9a4]" style={{ textShadow: "0 0 18px rgba(227,179,65,0.12)" }}>
          {lines.map((line, i) => (
            <p key={i} className={line === "" ? "h-[0.9em]" : "min-h-[1em] whitespace-pre-wrap"}>
              {line}
              {!finished && i === lastContentIdx && <PenNib hidden={false} />}
            </p>
          ))}
          {finished && <PenNib hidden={true} />}
        </div>

        {/* rúbrica que se dibuja al terminar */}
        <svg
          viewBox="0 0 620 40"
          className={`flourish mt-6 h-9 w-[min(80vw,540px)] text-gold-500/80 ${finished ? "drawn" : ""}`}
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 26 C 90 6, 150 36, 230 20 S 360 6, 420 22 S 540 34, 616 12"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path d="M560 28 l10 -10 M566 30 l10 -10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>

        <button
          onClick={replay}
          className={`group mt-6 inline-flex items-center gap-2 font-digital text-[11px] tracking-[0.22em] text-parch-500 transition-all duration-500 hover:text-mint-400 ${finished ? "opacity-100" : "pointer-events-none opacity-0"}`}
        >
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-rotate-[360deg]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9" />
            <path d="M13.7 1.8v3h-3" />
          </svg>
          REESCRIBIR EL CONJURO
        </button>
      </div>
    </section>
  );
}
