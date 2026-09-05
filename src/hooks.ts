import { useEffect, useRef, useState } from "react";

export function useInView<T extends HTMLElement>(threshold = 0.18, once = true) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            if (once) obs.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, once]);

  return { ref, inView };
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

const SCRAMBLE_POOL = "ΛXVKZWMR#Δᐁ";

/** Efecto de texto que se "decodifica" desde glifos hasta el texto final. */
export function useScramble(text: string, active: boolean, speed = 34) {
  const [out, setOut] = useState(active ? "" : text);
  const done = useRef(false);

  useEffect(() => {
    if (!active || done.current) return;
    let frame = 0;
    const id = window.setInterval(() => {
      frame += 1;
      const settled = Math.floor(frame / 2.4);
      if (settled >= text.length) {
        setOut(text);
        done.current = true;
        window.clearInterval(id);
        return;
      }
      let s = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === " ") { s += " "; continue; }
        s += i < settled ? ch : SCRAMBLE_POOL[Math.floor(Math.random() * SCRAMBLE_POOL.length)];
      }
      setOut(s);
    }, speed);
    return () => window.clearInterval(id);
  }, [active, text, speed]);

  return out;
}
