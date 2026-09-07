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
        className={`relative mx-auto max-w-3xl border border-ink-600/80 bg-ink-850/85 px-7 py-9 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.85)] transition-transform duration-700 md:px-12 md:py-11 ${
          shatterStarted ? 'animate-shatter' : ''
        }`}
        style={{
          ...(shatterStarted ? {
            animation: 'shatter 0.8s ease-out forwards',
          } : {}),
        }}
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
      </div>

      {/* Azafrán que crece después de romper el cuadro */}
      {(shatterStarted || saffronGrowing) && (
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 10 }}
        >
          <div 
            className="relative"
            style={{
              opacity: shatterStarted ? 1 : 0,
              transform: saffronGrowing ? 'scale(1)' : 'scale(0)',
              transition: 'transform 2s ease-out, opacity 0.5s ease-out',
              transitionDelay: shatterStarted ? '0.6s' : '0s',
            }}
          >
            {/* Flor de azafrán SVG */}
            <svg 
              width="120" 
              height="180" 
              viewBox="0 0 120 180" 
              className="drop-shadow-lg"
            >
              {/* Tallo */}
              <path 
                d="M60 180 Q58 140 60 100 Q62 70 60 50" 
                stroke="#4a7c23" 
                strokeWidth="4" 
                fill="none"
                className="saffron-stem"
                style={{
                  strokeDasharray: 200,
                  strokeDashoffset: saffronGrowing ? 0 : 200,
                  transition: 'stroke-dashoffset 1.5s ease-out',
                  transitionDelay: '0.8s',
                }}
              />
              
              {/* Hojas */}
              <ellipse 
                cx="52" 
                cy="140" 
                rx="8" 
                ry="25" 
                fill="#5a9c33"
                transform="rotate(-25 52 140)"
                opacity="0"
                className="saffron-leaf-left"
                style={{
                  opacity: saffronGrowing ? 0.9 : 0,
                  transform: saffronGrowing ? 'rotate(-25deg) scale(1)' : 'rotate(-25deg) scale(0)',
                  transformOrigin: '52 140',
                  transition: 'all 1s ease-out',
                  transitionDelay: '1.2s',
                }}
              />
              <ellipse 
                cx="68" 
                cy="120" 
                rx="7" 
                ry="22" 
                fill="#5a9c33"
                transform="rotate(20 68 120)"
                opacity="0"
                className="saffron-leaf-right"
                style={{
                  opacity: saffronGrowing ? 0.9 : 0,
                  transform: saffronGrowing ? 'rotate(20deg) scale(1)' : 'rotate(20deg) scale(0)',
                  transformOrigin: '68 120',
                  transition: 'all 1s ease-out',
                  transitionDelay: '1.4s',
                }}
              />
              
              {/* Pétalos del azafrán */}
              <g 
                opacity="0"
                className="saffron-flower"
                style={{
                  opacity: saffronGrowing ? 1 : 0,
                  transform: saffronGrowing ? 'scale(1)' : 'scale(0)',
                  transformOrigin: '60 50',
                  transition: 'all 1.2s ease-out',
                  transitionDelay: '1.6s',
                }}
              >
                {/* Pétalos exteriores */}
                <ellipse cx="60" cy="35" rx="12" ry="20" fill="#9b59b6" transform="rotate(0 60 35)" />
                <ellipse cx="60" cy="35" rx="12" ry="20" fill="#8e44ad" transform="rotate(72 60 35)" />
                <ellipse cx="60" cy="35" rx="12" ry="20" fill="#9b59b6" transform="rotate(144 60 35)" />
                <ellipse cx="60" cy="35" rx="12" ry="20" fill="#8e44ad" transform="rotate(216 60 35)" />
                <ellipse cx="60" cy="35" rx="12" ry="20" fill="#9b59b6" transform="rotate(288 60 35)" />
                
                {/* Estigmas rojos característicos del azafrán */}
                <path 
                  d="M60 35 Q60 25 55 18" 
                  stroke="#c0392b" 
                  strokeWidth="2.5" 
                  fill="none" 
                  strokeLinecap="round"
                />
                <path 
                  d="M60 35 Q60 25 60 15" 
                  stroke="#c0392b" 
                  strokeWidth="2.5" 
                  fill="none" 
                  strokeLinecap="round"
                />
                <path 
                  d="M60 35 Q60 25 65 18" 
                  stroke="#c0392b" 
                  strokeWidth="2.5" 
                  fill="none" 
                  strokeLinecap="round"
                />
                
                {/* Centro amarillo */}
                <circle cx="60" cy="40" r="6" fill="#f39c12" />
              </g>
            </svg>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes shatter {
          0% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
          }
          20% {
            opacity: 0.9;
            transform: scale(1.02) rotate(-1deg);
          }
          40% {
            opacity: 0.7;
            transform: scale(1.05) rotate(2deg);
          }
          60% {
            opacity: 0.5;
            transform: scale(1.08) rotate(-3deg);
            filter: blur(2px);
          }
          80% {
            opacity: 0.3;
            transform: scale(1.1) rotate(5deg);
            filter: blur(4px);
          }
          100% {
            opacity: 0;
            transform: scale(1.15) rotate(10deg);
            filter: blur(8px);
            clip-path: polygon(20% 20%, 80% 20%, 80% 80%, 20% 80%);
          }
        }
      `}</style>
    </div>
  );
}
