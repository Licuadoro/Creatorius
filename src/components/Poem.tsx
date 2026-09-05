import { useEffect, useState } from "react";
import { POEM } from "../data";
import { useInView } from "../hooks";

const POEM_LINES = POEM.split("\n");
const POEM_TEXT = POEM;
const TYPE_START_DELAY = 350;

function useTypewriter(active: boolean, reduced: boolean) {
  const full = POEM_TEXT;
  const [count, setCount] = useState(reduced ? full.length : 0);

  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setCount(full.length);
      return;
    }
    setCount(0);
    let i = 0;
    let t = 0;
    const tick = () => {
      i += 1;
      setCount(i);
      if (i >= full.length) return;
      const ch = full[i - 1];
      let d = 24 + Math.random() * 34;
      if (ch === "\n") d = 430;
      else if (",;".includes(ch)) d = 180;
      else if (".!?".includes(ch)) d = 300;
      t = window.setTimeout(tick, d);
    };
    t = window.setTimeout(tick, TYPE_START_DELAY);
    return () => window.clearTimeout(t);
  }, [active, reduced, full]);

  return count;
}

/** El poema del encargo: se escribe a mano al entrar en pantalla. */
export default function Poem() {
  const { ref, inView } = useInView<HTMLDivElement>(0.18);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const count = useTypewriter(inView, reduced);
  const done = count >= POEM_TEXT.length;

  let remaining = count;
  const rendered = POEM_LINES.map((line, li) => {
    const take = Math.max(0, Math.min(line.length, remaining));
    remaining -= line.length;
    return { line, take, li };
  });

  const caretIdx = rendered.findIndex((r) => r.take < r.line.length);

  return (
    <div ref={ref}>
      <div className="relative mx-auto max-w-3xl border border-ink-600/80 bg-ink-850/85 px-7 py-9 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.85)] transition-transform duration-700 md:px-12 md:py-11">
        {/* esquinas del pliego */}
        <span className="pointer-events-none absolute left-2 top-2 h-5 w-5 border-l-2 border-t-2 border-gold-500/50" aria-hidden="true" />
        <span className="pointer-events-none absolute bottom-2 right-2 h-5 w-5 border-b-2 border-r-2 border-gold-500/50" aria-hidden="true" />

        <p
          className="font-hand whitespace-pre-wrap text-[24px] leading-[1.42] text-parch-100/95 md:text-[27px]"
          style={{ textShadow: "0 0 22px rgba(227,179,65,0.10)" }}
        >
          {rendered.map(({ line, take, li }) => (
            <span key={li}>
              {line.slice(0, take)}
              {!done && caretIdx === li && (
                <span className="pen-caret" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19.5 3.5 8.5 14.5l-1.8 4.6a.5.5 0 0 0 .65.65L12 17.9 23 6.9z" transform="translate(-1.5 -1)" />
                    <path d="m16.5 6.5 3 3" />
                  </svg>
                </span>
              )}
              {li < rendered.length - 1 ? "\n" : ""}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
