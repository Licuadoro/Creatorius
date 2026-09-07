import { useEffect, useState, useRef } from "react";
import { POEM } from "../data";
import { useInView } from "../hooks";

const POEM_LINES = POEM.split("\n");
const POEM_TEXT = POEM;
const TYPE_START_DELAY = 350;

function useTypewriter(active: boolean, reduced: boolean) {
  const full = POEM_TEXT;
  const [count, setCount] = useState(reduced ? full.length : 0);
  const [typingComplete, setTypingComplete] = useState(false);
  
  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setCount(full.length);
      setTypingComplete(true);
      return;
    }
    setCount(0);
    setTypingComplete(false);
    let i = 0;
    let t = 0;
    const tick = () => {
      i += 1;
      setCount(i);
      if (i >= full.length) {
        setTypingComplete(true);
        return;
      }
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

  return { count, typingComplete };
}

/** El poema del encargo: se escribe a mano al entrar en pantalla, luego se rompe y sale un azafrán. */
export default function Poem() {
  const { ref, inView } = useInView<HTMLDivElement>(0.18);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const { count, typingComplete } = useTypewriter(inView, reduced);
  const [shatterStarted, setShatterStarted] = useState(false);
  const [saffronGrowing, setSaffronGrowing] = useState(false);
  const poemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typingComplete && !reduced && !shatterStarted) {
      const breakTimer = setTimeout(() => {
        setShatterStarted(true);
        const growTimer = setTimeout(() => {
          setSaffronGrowing(true);
        }, 600);
        return () => clearTimeout(growTimer);
      }, 800);
      return () => clearTimeout(breakTimer);
    }
  }, [typingComplete, reduced, shatterStarted]);

  let remaining = count;
  const rendered = POEM_LINES.map((line, li) => {
    const take = Math.max(0, Math.min(line.length, remaining));
    remaining -= line.length;
    return { line, take, li };
  });

  return (
    <div ref={ref} className="relative">
      <div 
        ref={poemRef}
        className={`relative mx-auto max-w-3xl border border-ink-600/80 bg-ink-850/85 px-7 py-9 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.85)] md:px-12 md:py-11`}
      >
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
              {li < rendered.length - 1 ? "\n" : ""}
            </span>
          ))}
        </p>

        {/* Grieta en la esquina inferior derecha */}
        {shatterStarted && (
          <div 
            className="absolute bottom-2 right-2 pointer-events-none"
            style={{
              opacity: saffronGrowing ? 0 : 1,
              transition: 'opacity 0.3s ease-out',
              zIndex: 5,
            }}
          >
            <svg width="80" height="80" viewBox="0 0 80 80">
              <path 
                d="M0 0 Q15 10 25 5 Q35 0 45 10 Q55 20 60 35 Q65 50 70 65 L75 75" 
                stroke="#c0392b" 
                strokeWidth="2" 
                fill="none"
                strokeLinecap="round"
                className="crack-line"
                style={{
                  strokeDasharray: 150,
                  strokeDashoffset: saffronGrowing ? 0 : 150,
                  transition: 'stroke-dashoffset 0.6s ease-out',
                  transitionDelay: '0.2s',
                }}
              />
              <path 
                d="M25 5 Q20 15 30 25 Q40 35 35 45" 
                stroke="#c0392b" 
                strokeWidth="1.5" 
                fill="none"
                strokeLinecap="round"
                opacity="0.7"
                style={{
                  strokeDasharray: 80,
                  strokeDashoffset: saffronGrowing ? 0 : 80,
                  transition: 'stroke-dashoffset 0.5s ease-out',
                  transitionDelay: '0.4s',
                }}
              />
              <path 
                d="M45 10 Q50 20 45 30 Q40 40 50 50" 
                stroke="#c0392b" 
                strokeWidth="1" 
                fill="none"
                strokeLinecap="round"
                opacity="0.5"
                style={{
                  strokeDasharray: 70,
                  strokeDashoffset: saffronGrowing ? 0 : 70,
                  transition: 'stroke-dashoffset 0.4s ease-out',
                  transitionDelay: '0.5s',
                }}
              />
            </svg>
          </div>
        )}
      </div>

      {/* Azafrán que crece desde la grieta en la esquina inferior derecha */}
      {(shatterStarted || saffronGrowing) && (
        <div 
          className="absolute bottom-0 right-0 pointer-events-none"
          style={{ 
            zIndex: 10,
            transform: 'translateX(30%) translateY(20%)',
          }}
        >
          <div 
            className="relative"
            style={{
              opacity: shatterStarted ? 0 : 1,
              transform: saffronGrowing ? 'scale(1)' : 'scale(0)',
              transformOrigin: 'bottom right',
              transition: 'transform 2.5s ease-out, opacity 0.8s ease-out',
              transitionDelay: shatterStarted ? '0.8s' : '0s',
            }}
          >
            {/* Flor de azafrán SVG */}
            <svg 
              width="140" 
              height="200" 
              viewBox="0 0 140 200" 
              className="drop-shadow-lg"
            >
              {/* Tallo curvado */}
              <path 
                d="M70 200 Q65 160 68 120 Q72 80 70 50 Q68 30 70 20" 
                stroke="#4a7c23" 
                strokeWidth="5" 
                fill="none"
                className="saffron-stem"
                style={{
                  strokeDasharray: 220,
                  strokeDashoffset: saffronGrowing ? 0 : 220,
                  transition: 'stroke-dashoffset 1.8s ease-out',
                  transitionDelay: '1s',
                }}
              />
              
              {/* Hojas */}
              <ellipse 
                cx="62" 
                cy="160" 
                rx="10" 
                ry="30" 
                fill="#5a9c33"
                transform="rotate(-30 62 160)"
                opacity="0"
                className="saffron-leaf-left"
                style={{
                  opacity: saffronGrowing ? 0.9 : 0,
                  transform: saffronGrowing ? 'rotate(-30deg) scale(1)' : 'rotate(-30deg) scale(0)',
                  transformOrigin: '62 160',
                  transition: 'all 1.2s ease-out',
                  transitionDelay: '1.5s',
                }}
              />
              <ellipse 
                cx="78" 
                cy="135" 
                rx="9" 
                ry="26" 
                fill="#5a9c33"
                transform="rotate(25 78 135)"
                opacity="0"
                className="saffron-leaf-right"
                style={{
                  opacity: saffronGrowing ? 0.9 : 0,
                  transform: saffronGrowing ? 'rotate(25deg) scale(1)' : 'rotate(25deg) scale(0)',
                  transformOrigin: '78 135',
                  transition: 'all 1.2s ease-out',
                  transitionDelay: '1.7s',
                }}
              />
              
              {/* Pétalos del azafrán */}
              <g 
                opacity="0"
                className="saffron-flower"
                style={{
                  opacity: saffronGrowing ? 1 : 0,
                  transform: saffronGrowing ? 'scale(1)' : 'scale(0)',
                  transformOrigin: '70 25',
                  transition: 'all 1.5s ease-out',
                  transitionDelay: '2s',
                }}
              >
                {/* Pétalos exteriores */}
                <ellipse cx="70" cy="25" rx="14" ry="22" fill="#9b59b6" transform="rotate(0 70 25)" />
                <ellipse cx="70" cy="25" rx="14" ry="22" fill="#8e44ad" transform="rotate(72 70 25)" />
                <ellipse cx="70" cy="25" rx="14" ry="22" fill="#9b59b6" transform="rotate(144 70 25)" />
                <ellipse cx="70" cy="25" rx="14" ry="22" fill="#8e44ad" transform="rotate(216 70 25)" />
                <ellipse cx="70" cy="25" rx="14" ry="22" fill="#9b59b6" transform="rotate(288 70 25)" />
                
                {/* Estigmas rojos característicos del azafrán */}
                <path 
                  d="M70 25 Q70 12 63 5" 
                  stroke="#c0392b" 
                  strokeWidth="3" 
                  fill="none" 
                  strokeLinecap="round"
                />
                <path 
                  d="M70 25 Q70 10 70 0" 
                  stroke="#c0392b" 
                  strokeWidth="3" 
                  fill="none" 
                  strokeLinecap="round"
                />
                <path 
                  d="M70 25 Q70 12 77 5" 
                  stroke="#c0392b" 
                  strokeWidth="3" 
                  fill="none" 
                  strokeLinecap="round"
                />
                
                {/* Centro amarillo */}
                <circle cx="70" cy="30" r="7" fill="#f39c12" />
              </g>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
