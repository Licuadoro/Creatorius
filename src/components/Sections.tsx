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
  pacto: (
    <Sigil>
      <path d="M18 14l10 10-10 10-10-10z" />
      <path d="M30 14l10 10-10 10-10-10" />
      <circle cx="24" cy="24" r="2.2" fill="currentColor" stroke="none" />
    </Sigil>
  ),
  forja: (
    <Sigil>
      <path d="M13 35L25 23" />
      <path d="M22 11l9 9-6 6-9-9z" />
      <path d="M31 20l4 4" />
      <path d="M36 10l2 2M40 16l2 2M38 8l1.5 4" />
      <path d="M9 39h8" />
    </Sigil>
  ),
  entrega: (
    <Sigil>
      <circle cx="33" cy="15" r="5.5" />
      <path d="M8 20l13-4M6 29l15-5M10 38l13-6" />
    </Sigil>
  ),
};

/* ---------------- El ritual ---------------- */

const STEPS = [
  {
    sigil: "invoca",
    num: "I",
    title: "Invocación",
    text: "Me cuentas tu idea tal como vive en tu cabeza: caótica, brillante, imposible. Yo escucho, pregunto y traduzco ese caos a un plano.",
  },
  {
    sigil: "pacto",
    num: "II",
    title: "El pacto",
    text: "Acordamos alcance, plazos y precio. Todo negociable, nada de letra pequeña: el trato se cierra mirándose a los ojos.",
  },
  {
    sigil: "forja",
    num: "III",
    title: "La forja",
    text: "Diseño, código, textos e ilustración si hace falta. Ves el mundo tomar forma con avances constantes, no con silencios.",
  },
  {
    sigil: "entrega",
    num: "IV",
    title: "La entrega",
    text: "Tu web despierta en internet, viva y afinada. Y si algo chirría, vuelvo a la forja sin dramas ni facturas sorpresa.",
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
        accent="Cuatro pasos, ningún misterio. Así se convierte una idea que solo existe en tu cabeza en una web que existe en todas las pantallas."
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






