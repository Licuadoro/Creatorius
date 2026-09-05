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

/* ---------------- Las ofrendas ---------------- */

const INCLUDED = [
  "Web a medida, de la primera chispa al último píxel",
  "Diseño, desarrollo y despliegue en el mundo real",
  "Textos redactados e ilustraciones si los necesitas",
  "Ajustes hasta que la web brille como la imaginaste",
];

export function Offerings() {
  return (
    <section id="ofrendas" className="relative mx-auto w-full max-w-6xl px-6 py-24 lg:py-32">
      <SectionHeading
        kicker="OFRENDAS"
        title={
          <>
            Elige tu <span className="text-gold-400">ritual</span>
          </>
        }
        accent="No hay tarifas grabadas en piedra: cada mundo es distinto y cada bolsillo también. Todo se conversa y todo se negocia."
      />

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Ofrenda mayor */}
        <Reveal className="lg:col-span-3">
          <div className="group relative h-full border border-gold-500/45 bg-gradient-to-b from-ink-800 to-ink-850 p-8 transition-all duration-500 hover:border-gold-400 hover:shadow-[0_24px_70px_-24px_rgba(227,179,65,0.35)] lg:p-10">
            <div className="absolute -right-3 -top-4 rotate-6 border-2 border-ember-400/80 bg-ink-900/70 px-3 py-1 font-digital text-[10px] tracking-[0.22em] text-ember-300">
              LO MÁS FORJADO
            </div>
            <p className="font-digital text-[11px] tracking-[0.3em] text-mint-400">OFRENDA MAYOR</p>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-wide text-parch-100 lg:text-3xl">La forja completa</h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-parch-500">
              Una web entera, nacida de tu idea y afinada hasta el último detalle. El mundo completo, con sus continentes y sus mares.
            </p>
            <p className="mt-7 font-display text-4xl font-black tracking-wide text-gold-400">
              A NEGOCIAR
              <span className="ml-3 align-middle font-digital text-[11px] tracking-[0.2em] text-parch-500">/ precio honesto</span>
            </p>
            <ul className="mt-7 space-y-3">
              {INCLUDED.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[14.5px] text-parch-300/95">
                  <svg viewBox="0 0 10 10" className="mt-1.5 h-2 w-2 shrink-0 text-gold-500" aria-hidden="true">
                    <path d="M5 0.5 L9.5 5 L5 9.5 L0.5 5 Z" fill="currentColor" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="#contacto"
              className="mt-9 inline-flex items-center gap-3 bg-gold-400 px-6 py-3 font-digital text-[11px] tracking-[0.22em] text-ink-900 transition-all duration-300 hover:shadow-[0_0_36px_rgba(227,179,65,0.45)] hover:brightness-110"
            >
              PEDIR ESTA OFRENDA
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 8h11M9 3.5 13.5 8 9 12.5" />
              </svg>
            </a>
          </div>
        </Reveal>

        {/* Ofrendas menores */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Reveal delay={120}>
            <div className="group border border-ink-600/70 bg-ink-850/70 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-mint-500/50 hover:shadow-[0_20px_55px_-22px_rgba(94,234,212,0.3)]">
              <p className="font-digital text-[10px] tracking-[0.3em] text-mint-400">OFRENDA BREVE</p>
              <h3 className="mt-2 font-display text-xl font-bold tracking-wide text-parch-100">La chispa</h3>
              <p className="mt-2 text-sm leading-relaxed text-parch-500">
                Una landing que cuenta tu idea en un suspiro: rápida, afilada y lista para conquistar.
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-ink-700 pt-4">
                <span className="font-display text-lg font-bold text-gold-400">A NEGOCIAR</span>
                <a href="#contacto" className="link-underline font-digital text-[10px] tracking-[0.2em] text-mint-400">
                  PEDIRLA →
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={220}>
            <div className="group border border-ink-600/70 bg-ink-850/70 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-500/50 hover:shadow-[0_20px_55px_-22px_rgba(227,179,65,0.3)]">
              <p className="font-digital text-[10px] tracking-[0.3em] text-gold-500">OFRENDA EXPANSIVA</p>
              <h3 className="mt-2 font-display text-xl font-bold tracking-wide text-parch-100">El mundo entero</h3>
              <p className="mt-2 text-sm leading-relaxed text-parch-500">
                Web + identidad + base para lo que venga después: tu marca con raíces y horizonte, lista para crecer.
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-ink-700 pt-4">
                <span className="font-display text-lg font-bold text-gold-400">A NEGOCIAR</span>
                <a href="#contacto" className="link-underline font-digital text-[10px] tracking-[0.2em] text-gold-400">
                  PEDIRLO →
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <p className="border-l-2 border-mint-500/50 pl-4 text-[13px] italic leading-relaxed text-parch-500">
              «Estoy abierto a negociar los precios, pero ten en cuenta que se hace el trabajo con esfuerzo.»
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- El oráculo ---------------- */

const ORACLE_QA = [
  {
    q: "¿Cuánto tarda en existir mi web?",
    a: "Depende del mundo: una chispa (landing) suele tomar días; una forja completa, un par de semanas. El plazo se fija en el pacto y se cumple: los dioses también entregan a tiempo.",
  },
  {
    q: "¿Cómo funciona el pago?",
    a: "Como acordemos: por hitos, una mitad al empezar y otra al entregar, o todo al final si la confianza ya está forjada. El precio se negocia antes de mover un solo píxel.",
  },
  {
    q: "¿Y si no me gusta lo que veo?",
    a: "Vuelvo a la forja. Los ajustes razonables entran en el pacto; prefiero mil veces una web que ames a una que simplemente toleres.",
  },
  {
    q: "¿De verdad escribes los textos e ilustras los elementos?",
    a: "Sí. Si me lo pides, redactaré los textos e ilustraré los elementos, exactamente como promete el conjuro. Tú traes la idea; yo pongo hasta la última coma y la última línea.",
  },
  {
    q: "¿Quién está detrás de Creatorius?",
    a: "Licuadoro, único miembro de LICUADO: un estudio de videojuegos con más ambición que personal que germina como un azafrán entre el asfalto. Cada web que encargas riega ese sueño.",
  },
];

export function Oracle() {
  return (
    <section id="oraculo" className="relative mx-auto w-full max-w-4xl px-6 py-24 lg:py-32">
      <SectionHeading
        kicker="EL ORÁCULO"
        title={
          <>
            Pregunta sin <span className="text-gold-400">miedo</span>
          </>
        }
        accent="Las dudas que todo el mundo trae al templo. Si la tuya no está, el oráculo responde en persona: escríbeme."
      />

      <div className="space-y-3">
        {ORACLE_QA.map((item, i) => (
          <Reveal key={i} delay={i * 70}>
            <details className="oracle group border border-ink-600/70 bg-ink-850/60 transition-colors duration-300 open:border-gold-500/40 hover:border-gold-600/40">
              <summary className="flex items-center justify-between gap-4 px-6 py-5">
                <span className="oracle-q font-body text-[15.5px] font-semibold text-parch-100 transition-colors duration-300">
                  {item.q}
                </span>
                <span className="oracle-icon flex h-8 w-8 shrink-0 items-center justify-center border border-gold-600/40 text-gold-400">
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M8 2v12M2 8h12" />
                  </svg>
                </span>
              </summary>
              <p className="px-6 pb-6 text-[14.5px] leading-relaxed text-parch-300/90">{item.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
