import type { ReactNode } from "react";
import { Reveal, SectionHeading } from "./Chrome";

/* ---------------- Sigilos (iconos dibujados a mano) ---------------- */

function Sigil({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
      {children}
    </svg>
  );
}

const SIGILS: Record<string, ReactNode> = {
  invoca: (
    <Sigil>
      <path d="M22 24a2.5 2.5 0 0 1 5 0 5 5 0 0 1-10 0 9 9 0 0 1 18 0 13 13 0 0 1-26 0" />
      <path d="M35 7l1.6 3.4L40 12l-3.4 1.6L35 17l-1.6-3.4L30 12l3.4-1.6z" />
    </Sigil>
  ),
  trazo: (
    <Sigil>
      <circle cx="24" cy="9" r="3" />
      <path d="M24 12l-9 22" />
      <path d="M24 12l9 22" />
      <path d="M15 34q9-6 18 0" />
    </Sigil>
  ),
  elementos: (
    <Sigil>
      <path d="M26 10l8 8-13 13c-2.5 2.5-6 2.5-8 0s-2.5-5.5 0-8z" />
      <path d="M34 18l3-3" />
      <path d="M13 35c2 1.5 4 1.5 6 0" />
      <path d="M38 8l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" />
    </Sigil>
  ),
  entrega: (
    <Sigil>
      <circle cx="33" cy="15" r="5.5" />
      <path d="M8 20l13-4M6 29l15-5M10 38l13-6" />
    </Sigil>
  ),
  vitrina: (
    <Sigil>
      <rect x="9" y="9" width="30" height="30" />
      <path d="M24 16.5l2.3 4.7 5.2.8-3.75 3.65.9 5.15L24 28.4l-4.65 2.45.9-5.15L16.5 22l5.2-.8z" />
    </Sigil>
  ),
};

/* ---------------- El ritual ---------------- */

const STEPS = [
  {
    sigil: "invoca",
    num: "I",
    title: "Evocación",
    text: "Tú rellenas el formulario, y materializas tu idea en tu mente mientras lo sueltas en el teclado. A mi me llega a mi correo todo lo que pediste, te responderé cuestionándote las dudas que tenga, y hablaremos sobre tu idea.",
  },
  {
    sigil: "trazo",
    num: "II",
    title: "Comienzo",
    text: "Tras haber saldado un precio justo y negociado, yo comienzo a crear los trazos sobre los planos, hago la web funcional, te comparto actualizaciones, y me puedes pedir cambios.",
  },
  {
    sigil: "elementos",
    num: "III",
    title: "Los elementos",
    text: "Me pondré a ilustrar y redactar todos los elementos que me hayas pedido, y añadiré todos los detalles finales hasta terminar la web.",
  },
  {
    sigil: "entrega",
    num: "IV",
    title: "Entrega de llaves",
    text: "Te envío el código, te enseño a publicar tu web y te muestro cómo usar la web.",
  },
  {
    sigil: "vitrina",
    num: "V",
    title: "La vitrina",
    text: "Me compartes el enlace de tu web, y yo lo pondré en mi portafolio. Así la gente que entre aquí podrá acceder a tu web para que la conozcan, y yo me gano reputación. Si crees que me lo merezco, déja un buen comentario y una puntuación de 0 a 5 estrellas, y yo lo exhibiré con orgullo en mi portafolio.",
  },
];

export function Process() {
  return (
    <section id="ritual" className="relative mx-auto w-full max-w-6xl px-6 py-24 lg:py-32">
      <SectionHeading
        kicker="EL RITUAL DE FORJA"
        title={
          <>
            De la chispa al <span className="text-gold-400">mundo vivo</span>
          </>
        }
        accent="Cinco pasos, ningún misterio. Así se convierte una idea que solo existe en tu cabeza en una web que existe en todas las pantallas."
      />

      <div className="relative">
        <div className="absolute bottom-4 left-5 top-4 border-l border-dashed border-gold-600/30 lg:left-1/2" aria-hidden="true" />
        {STEPS.map((s, i) => (
          <Reveal key={s.num} delay={i * 90} className={`relative mb-16 pl-16 last:mb-0 lg:w-1/2 lg:pl-0 ${i % 2 === 1 ? "lg:ml-auto lg:pl-16" : "lg:pr-16"}`}>
            <div
              className={`absolute left-5 top-0 flex h-11 w-11 -translate-x-1/2 rotate-45 items-center justify-center border border-gold-500/60 bg-ink-850 transition-transform duration-500 hover:scale-110 lg:left-auto ${
                i % 2 === 1 ? "lg:left-0" : "lg:left-full"
              }`}
            >
              <span className="-rotate-45 text-gold-400">{SIGILS[s.sigil]}</span>
            </div>
            <div className="group border border-ink-600/60 bg-ink-850/70 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-[0_18px_50px_-18px_rgba(227,179,65,0.25)]">
              <div className="flex items-baseline gap-4">
                <span className="font-display text-3xl font-black text-gold-500/25 transition-colors duration-500 group-hover:text-gold-500/60">{s.num}</span>
                <h3 className="font-display text-xl font-bold tracking-wide text-parch-100">{s.title}</h3>
              </div>
              <p className="mt-3 text-[14.5px] leading-relaxed text-parch-300/90">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}






