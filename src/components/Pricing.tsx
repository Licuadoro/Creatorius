import { useMemo, useState, type ReactNode } from "react";
import { Reveal, SectionHeading } from "./Chrome";
import { LICUADO_URL } from "../data";

/* ============================================================
   PRECIOS
============================================================ */

const P = {
  basica: 190000,
  corp: 390000,
  redaccion: 20000,
  redaccionD: 17000,
  grande: 30000,
  grandeD: 25000,
  dibujo: 3000,
  dibujoD: 1500,
  pagina: 60000,
  garantia: 50000,
};

const fmt = (n: number) => n.toLocaleString("es-CO");

/* ---------- sigilos dibujados a mano ---------- */

function Sigil({ d, className = "h-6 w-6" }: { d: ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} pc-sigil text-gold-500`} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {d}
    </svg>
  );
}

const SIGILS = {
  base: <><path d="M4 9.5 12 4l8 5.5V20H4z" /><path d="M9 20v-6h6v6" /></>,
  quill: <><path d="M19 4c-6 0-11 5-12.5 11L5 19.5" /><path d="M19 4c0 6-5 11-11 12.5" /><path d="M8.5 15.5 5 19.5" /></>,
  brush: <><path d="M18.5 3.5 9 13l2 2 9.5-9.5z" /><path d="M9 13c-2.5.5-3.5 2-4 5 3-.5 4.5-1.5 5-4" /></>,
  pages: <><path d="M7 3h10v14H7z" /><path d="M4.5 6v14h10" /><path d="M10 7.5h4M10 10.5h4" /></>,
  knot: <><path d="M8 4v10a4 4 0 0 0 8 0" /><path d="M16 20V10a4 4 0 0 0-8 0" /></>,
  shield: <><path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z" /><path d="m9 12 2.2 2.2L15.5 10" /></>,
  tower: <><path d="M5 20h14M7 20V8l5-4 5 4v12" /><path d="M10 20v-4h4v4M10 11h4" /></>,
  plus: <><path d="M12 5v14M5 12h14" /><path d="M4 4h3M17 4h3M4 20h3M17 20h3" opacity=".5" /></>,
};

/* ---------- tarjeta base ---------- */

function Card({
  children,
  className = "",
  delay = 0,
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  wide?: boolean;
}) {
  return (
    <Reveal delay={delay} className={wide ? "lg:col-span-12" : ""}>
      <article className={`price-card group h-full ${className}`}>
        <span className="pc-corner pc-tl" aria-hidden="true" />
        <span className="pc-corner pc-tr" aria-hidden="true" />
        <span className="pc-corner pc-bl" aria-hidden="true" />
        <span className="pc-corner pc-br" aria-hidden="true" />
        {children}
      </article>
    </Reveal>
  );
}

function CardHead({ sigil, title, tag, tone = "gold" }: { sigil: ReactNode; title: string; tag?: string; tone?: "gold" | "mint" | "red" }) {
  const toneCls = tone === "mint" ? "border-mint-500/40 bg-mint-500/10 text-mint-300" : tone === "red" ? "border-red-400/40 bg-red-400/10 text-red-300" : "border-gold-500/40 bg-gold-500/10 text-gold-300";
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center border border-ink-600 bg-ink-900/70">{sigil}</span>
        <h3 className="font-display text-[17px] font-bold leading-snug text-parch-100">{title}</h3>
      </div>
      {tag && (
        <span className={`shrink-0 border px-2 py-1 font-digital text-[9px] tracking-[0.16em] ${toneCls}`}>
          {tag}
        </span>
      )}
    </div>
  );
}

function PriceBlock({ amount, unit, note, accent = "text-gold-400" }: { amount: string; unit?: string; note?: string; accent?: string }) {
  return (
    <div className="mt-auto pt-5">
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className={`pc-price font-digital text-[26px] leading-none ${accent}`}>{amount}</span>
        <span className="font-digital text-[11px] tracking-[0.14em] text-parch-400">$ COP</span>
        {unit && <span className="font-digital text-[11px] tracking-[0.14em] text-parch-500">{unit}</span>}
      </div>
      {note && <p className="mt-2 font-digital text-[10px] tracking-[0.12em] text-parch-500">{note}</p>}
    </div>
  );
}

/* ---------- la sección completa ---------- */

export function Ofrendas() {
  return (
    <section id="ofrendas" className="relative mx-auto w-full max-w-7xl px-6 py-24 lg:py-32">
      <SectionHeading
        kicker="OFRENDAS"
        title={<>La tabla de <span className="text-gold-400">ofrendas</span></>}
        accent="Todo pacto empieza por un número honesto. Estas son las tarifas de la casa: la base, sus añadidos y los descuentos que la propia forja concede."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12">
        {/* Web básica */}
        <Card className="lg:col-span-5" delay={0}>
          <CardHead sigil={<Sigil d={SIGILS.base} />} title="Web básica" />
          <p className="mt-4 text-[15px] leading-relaxed text-parch-300/90">Una web simple de una sola página.</p>
          <PriceBlock amount="190.000" />
        </Card>

        {/* + Redacción */}
        <Card className="lg:col-span-7" delay={80}>
          <CardHead sigil={<Sigil d={SIGILS.quill} />} title="+ Redacción" />
          <p className="mt-4 text-[15px] leading-relaxed text-parch-300/90">
            Se añaden textos llamativos y deliciosamente redactados por un escritor con experiencia. Si no se incluye, se usarán los textos que proporcione el cliente, o textos simples / generados por IA.
          </p>
          <PriceBlock amount="+20.000" unit="/párrafo" />
        </Card>

        {/* + Ilustración */}
        <Card className="lg:col-span-7" delay={160}>
          <CardHead sigil={<Sigil d={SIGILS.brush} />} title="+ Ilustración" />
          <p className="mt-4 text-[15px] leading-relaxed text-parch-300/90">
            Ilustración hecha a mano por un gran dibujante: un toque original, cercano y orgánico que atrae usuarios.{" "}
            <a href={LICUADO_URL} target="_blank" rel="noreferrer" className="link-underline text-mint-400 transition-colors hover:text-mint-300">
              Ver ejemplo.
            </a>{" "}
            Si no se incluye, se usará tu material o imágenes generadas por IA.
          </p>
          <PriceBlock amount="+30.000" unit="/grande" note="DIBUJO PEQUEÑO +3000 $ COP" />
        </Card>

        {/* + Páginas adicionales (básica) */}
        <Card className="lg:col-span-5" delay={0}>
          <CardHead sigil={<Sigil d={SIGILS.pages} />} title="+ Páginas adicionales" />
          <p className="mt-4 text-[15px] leading-relaxed text-parch-300/90">
            ¡Puedes añadir una página a la web por solo 60.000 $ COP! Ojo: las páginas adicionales no entran en el descuento «¡Ambos!».
          </p>
          <PriceBlock amount="+60.000" unit="/página" />
        </Card>

        {/* «¡Ambos!» */}
        <Card className="price-card-ambos lg:col-span-12" delay={100}>
          <CardHead sigil={<Sigil d={SIGILS.knot} />} title="«¡Ambos!»" />
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-parch-300/90">
            Si pides 2 o más añadidos entre redacción e ilustración grande, todo lo adicional sale con descuento:
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              { old: "20.000", neo: "17.000", unit: "/párrafo", off: "−14,29%" },
              { old: "30.000", neo: "25.000", unit: "/grande", off: "−12,5%" },
              { old: "3000", neo: "1500", unit: "/dibujo", off: "−50%" },
            ].map((r) => (
              <div key={r.unit} className="border border-gold-500/25 bg-ink-900/70 p-4 transition-all duration-500 group-hover:border-gold-500/50">
                <p className="font-digital text-[12px] text-parch-500 line-through decoration-red-400/70">{r.old} $ COP</p>
                <p className="mt-1 font-digital text-[22px] leading-none text-mint-400">
                  {r.neo} <span className="text-[11px] text-parch-400">$ COP{r.unit}</span>
                </p>
                <span className="mt-3 inline-block border border-mint-500/40 bg-mint-500/10 px-2 py-0.5 font-digital text-[10px] tracking-[0.12em] text-mint-300">
                  {r.off}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Garantía */}
        <Card className="lg:col-span-5" delay={0}>
          <CardHead sigil={<Sigil d={SIGILS.shield} />} title="Garantía de cambios · 1 año" tag="TRANQUILIDAD BARATA" tone="mint" />
          <p className="mt-4 text-[15px] leading-relaxed text-parch-300/90">
            Por +50.000 $ COP, durante los 12 meses tras la entrega los cambios y retoques van incluidos. Siempre va incluída una garantía gratis de 1 mes.
          </p>
          <PriceBlock amount="+50.000" accent="text-mint-400" />
        </Card>

        {/* Corporativa */}
        <Card className="price-card-corp lg:col-span-7" delay={100}>
          <CardHead sigil={<Sigil d={SIGILS.tower} />} title="¿Necesitas 5 páginas? Empieza por la corporativa" tag="SALE MÁS BARATA" />
          <p className="mt-4 max-w-none text-[15px] leading-relaxed text-parch-300/90">
            La web corporativa incluye 5 páginas por 390.000 $ COP. Haz cuentas: básica + 4 páginas adicionales serían 430.000 $ COP — te ahorras 40.000 $ COP.
          </p>
          <div className="mt-5 flex flex-wrap items-end gap-x-8 gap-y-2">
            <PriceBlock amount="390.000" />
            <div className="pb-1">
              <p className="font-digital text-[11px] tracking-[0.14em] text-parch-500">AHORRO FRENTE A BÁSICA + 4 PÁGINAS</p>
              <p className="mt-1 font-digital text-[18px] leading-none text-mint-400">−40.000 $ COP</p>
            </div>
          </div>
        </Card>

        {/* + Páginas adicionales (corporativa) */}
        <Card wide delay={0}>
          <div className="grid gap-6 lg:grid-cols-[1.1fr_1.4fr_auto] lg:items-center">
            <div>
              <CardHead sigil={<Sigil d={SIGILS.plus} />} title="+ Páginas adicionales" tag="NO ENTRA EN EL DESCUENTO «¡AMBOS!»" tone="red" />
            </div>
            <p className="text-[15px] leading-relaxed text-parch-300/90">
              ¡Puedes añadir una página a la web por solo esto! Cada página extra mantiene el mismo mimo que la primera. Eso sí: las páginas van siempre a tarifa, sin descuento «¡Ambos!».
            </p>
            <div className="lg:text-right">
              <p className="pc-price font-digital text-[26px] leading-none text-gold-400">+60.000 <span className="text-[11px] tracking-[0.14em] text-parch-400">$ COP</span></p>
              <p className="mt-1 font-digital text-[11px] tracking-[0.14em] text-parch-500">POR PÁGINA</p>
            </div>
          </div>
        </Card>
      </div>

      <Calculator />
    </section>
  );
}

/* ============================================================
   CALCULADORA DEL PACTO
============================================================ */

const MAX = { redaccion: 10, grande: 5, dibujo: 99, pagina: 10 };

const PACES = [
  {
    id: "sin",
    title: "Sin prisa",
    desc: "¡Dame un respiro! ¿No es tranquilizante?",
    sub: "Tu web perfecta en hasta 8 semanas.",
    weeks: "8 semanas",
    feePct: 0,
  },
  {
    id: "estandar",
    title: "Estandar",
    desc: "",
    sub: "Tu web lista en hasta 4 semanas.",
    weeks: "4 semanas",
    feePct: 0,
  },
  {
    id: "express",
    title: "Express",
    desc: "",
    sub: "Tu web volando en hasta 2 semanas.",
    weeks: "2 semanas",
    feePct: 10,
  },
] as const;

type PaceId = (typeof PACES)[number]["id"];

function Stepper({
  label,
  hint,
  value,
  max,
  unitPrice,
  discountPrice,
  discounted,
  onChange,
}: {
  label: string;
  hint: string;
  value: number;
  max: number;
  unitPrice: number;
  discountPrice?: number;
  discounted?: boolean;
  onChange: (v: number) => void;
}) {
  const active = discounted && discountPrice !== undefined;
  return (
    <div className="flex items-center justify-between gap-4 border border-ink-600 bg-ink-850/80 px-4 py-3.5 transition-colors duration-300 hover:border-gold-600/50">
      <div className="min-w-0">
        <p className="font-display text-[14px] font-bold text-parch-100">{label}</p>
        <p className="mt-0.5 font-digital text-[10px] tracking-[0.12em] text-parch-500">
          {active ? (
            <>
              <span className="text-mint-400">{fmt(discountPrice!)} $ COP</span>{" "}
              <span className="text-parch-500 line-through">{fmt(unitPrice)}</span> · «¡AMBOS!»
            </>
          ) : (
            <>{fmt(unitPrice)} $ COP</>
          )}{" "}
          · {hint}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2.5">
        <button
          aria-label={`Quitar ${label}`}
          onClick={() => onChange(Math.max(0, value - 1))}
          disabled={value <= 0}
          className="grid h-9 w-9 place-items-center border border-ink-600 text-parch-300 transition-all duration-200 enabled:hover:border-red-400/60 enabled:hover:text-red-300 enabled:active:scale-90 disabled:opacity-30"
        >
          <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M2 7h10" /></svg>
        </button>
        <span key={value} className={`count-pop w-9 text-center font-digital text-lg ${value > 0 ? "text-mint-400" : "text-parch-500"}`}>
          {value}
        </span>
        <button
          aria-label={`Añadir ${label}`}
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="grid h-9 w-9 place-items-center border border-ink-600 text-parch-300 transition-all duration-200 enabled:hover:border-mint-400/70 enabled:hover:text-mint-300 enabled:active:scale-90 disabled:opacity-30"
        >
          <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M7 2v10M2 7h10" /></svg>
        </button>
      </div>
    </div>
  );
}

const DESTINO = "licuadorodelicuado@gmail.com";

type EnvioStatus = "idle" | "sending" | "sent" | "fallback";
type Errores = { nombre?: string; email?: string; idea?: string };

function Calculator() {
  const [base, setBase] = useState<"basica" | "corp">("basica");
  const [redaccion, setRedaccion] = useState(0);
  const [grande, setGrande] = useState(0);
  const [dibujo, setDibujo] = useState(0);
  const [paginas, setPaginas] = useState(0);
  const [garantia, setGarantia] = useState(false);
  const [pace, setPace] = useState<PaceId>("sin");

  /* ---- sello del pacto: datos del cliente ---- */
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [idea, setIdea] = useState("");
  const [errores, setErrores] = useState<Errores>({});
  const [envio, setEnvio] = useState<EnvioStatus>("idle");

  const ambos = redaccion + grande >= 2;

  const calc = useMemo(() => {
    const baseCost = base === "basica" ? P.basica : P.corp;
    const rCost = redaccion * (ambos ? P.redaccionD : P.redaccion);
    const gCost = grande * (ambos ? P.grandeD : P.grande);
    const dCost = dibujo * (ambos ? P.dibujoD : P.dibujo);
    const pCost = paginas * P.pagina;
    const gar = garantia ? P.garantia : 0;
    const subtotal = baseCost + rCost + gCost + dCost + pCost + gar;
    const ahorro = ambos ? redaccion * (P.redaccion - P.redaccionD) + grande * (P.grande - P.grandeD) + dibujo * (P.dibujo - P.dibujoD) : 0;
    const expressFee = pace === "express" ? Math.round(subtotal * 0.1) : 0;
    const total = subtotal + expressFee;
    return { baseCost, rCost, gCost, dCost, pCost, gar, subtotal, ahorro, expressFee, total };
  }, [base, redaccion, grande, dibujo, paginas, garantia, pace, ambos]);

  const paceData = PACES.find((p) => p.id === pace)!;

  const rows: { label: string; value: string; mint?: boolean }[] = [
    { label: base === "basica" ? "Web básica" : "Web corporativa", value: fmt(calc.baseCost) },
  ];
  if (redaccion > 0) rows.push({ label: `Redacción ×${redaccion}`, value: fmt(calc.rCost), mint: ambos });
  if (grande > 0) rows.push({ label: `Ilustración grande ×${grande}`, value: fmt(calc.gCost), mint: ambos });
  if (dibujo > 0) rows.push({ label: `Dibujo pequeño ×${dibujo}`, value: fmt(calc.dCost), mint: ambos });
  if (paginas > 0) rows.push({ label: `Páginas adicionales ×${paginas}`, value: fmt(calc.pCost) });
  if (garantia) rows.push({ label: "Garantía de cambios · 1 año", value: fmt(calc.gar) });

  /* ---- el envío del pacto ---- */

  const detalles: Record<string, string> = {
    "Web base":
      base === "basica"
        ? `Web básica — ${fmt(P.basica)} $ COP`
        : `Web corporativa (incluye 5 páginas) — ${fmt(P.corp)} $ COP`,
    "Redacción": redaccion > 0 ? `${redaccion} párrafo(s) — ${fmt(calc.rCost)} $ COP` : "No incluida",
    "Ilustración grande": grande > 0 ? `${grande} — ${fmt(calc.gCost)} $ COP` : "No incluida",
    "Dibujo pequeño": dibujo > 0 ? `${dibujo} — ${fmt(calc.dCost)} $ COP` : "No incluido",
    "Páginas adicionales": paginas > 0 ? `${paginas} — ${fmt(calc.pCost)} $ COP` : "Ninguna",
    "Garantía de cambios (1 año)": garantia ? `Sí — ${fmt(P.garantia)} $ COP` : "No (va incluida la gratis de 1 mes)",
    "Descuento «¡Ambos!»": ambos ? `Activo — ahorro de ${fmt(calc.ahorro)} $ COP` : "No activo",
    "Ritmo de entrega": `${paceData.title} — ${paceData.sub}`,
    ...(calc.expressFee > 0 ? { "Recargo Exprés (+10%)": `${fmt(calc.expressFee)} $ COP` } : {}),
    "TOTAL DEL PACTO": `${fmt(calc.total)} $ COP`,
  };

  const enviar = async () => {
    const e: Errores = {};
    if (!nombre.trim()) e.nombre = "Falta tu nombre o cómo quieres que te llame.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) e.email = "Escribe un correo válido para poder responderte.";
    if (idea.trim().length < 10) e.idea = "Cuéntame un poco más de tu idea (unas 10 letras al menos).";
    setErrores(e);
    if (e.nombre || e.email || e.idea) return;

    setEnvio("sending");
    const asunto = `Nuevo pacto en Creatorius — ${nombre.trim()}`;
    const payload = {
      _subject: asunto,
      _template: "table",
      _captcha: "false",
      Nombre: nombre.trim(),
      "Su correo": email.trim(),
      "Descripción de la idea": idea.trim(),
      ...detalles,
    };
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${DESTINO}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("envío fallido");
      setEnvio("sent");
    } catch {
      // respaldo: componer el correo en el gestor del visitante
      const cuerpo = [
        `Nombre: ${nombre.trim()}`,
        `Correo: ${email.trim()}`,
        "",
        "Descripción de la idea:",
        idea.trim(),
        "",
        "— Elementos del pacto —",
        ...Object.entries(detalles).map(([k, v]) => `${k}: ${v}`),
      ].join("\n");
      window.location.href = `mailto:${DESTINO}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
      setEnvio("fallback");
    }
  };

  return (
    <div id="calculadora" className="mt-24 scroll-mt-28">
      <Reveal>
        <p className="font-digital text-[11px] tracking-[0.3em] text-gold-500">
          <span className="text-mint-400">//</span> LA CALCULADORA DEL PACTO
        </p>
        <h3 className="mt-3 font-display text-2xl font-bold tracking-wide text-parch-100 lg:text-4xl">
          Forja tu propio <span className="text-gold-400">presupuesto</span>
        </h3>
      </Reveal>

      <Reveal delay={120}>
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          {/* -------- controles -------- */}
          <div className="space-y-8">
            {/* base */}
            <div>
              <p className="mb-3 font-digital text-[10px] tracking-[0.24em] text-parch-500">01 · ¿DE QUÉ WEB PARTIMOS?</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {(
                  [
                    { id: "basica", name: "Web básica", price: P.basica, note: "Una sola página" },
                    { id: "corp", name: "Web corporativa", price: P.corp, note: "Incluye 5 páginas" },
                  ] as const
                ).map((b) => {
                  const on = base === b.id;
                  return (
                    <button
                      key={b.id}
                      onClick={() => setBase(b.id)}
                      aria-pressed={on}
                      className={`relative border px-5 py-4 text-left transition-all duration-300 active:scale-[0.98] ${
                        on
                          ? "border-gold-500/70 bg-gold-500/[0.08] shadow-[0_0_30px_-8px_rgba(227,179,65,0.4)]"
                          : "border-ink-600 bg-ink-850/80 hover:border-gold-600/50"
                      }`}
                    >
                      <span className="flex items-center justify-between gap-2">
                        <span className="font-display text-[15px] font-bold text-parch-100">{b.name}</span>
                        <span className={`grid h-4 w-4 place-items-center border transition-colors ${on ? "border-gold-400 bg-gold-400" : "border-ink-500"}`}>
                          {on && (
                            <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 text-ink-900" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 5.2 2.2 2.3L8 3" /></svg>
                          )}
                        </span>
                      </span>
                      <span className="mt-1.5 block font-digital text-[12px] text-gold-400">{fmt(b.price)} $ COP</span>
                      <span className="mt-0.5 block font-digital text-[10px] tracking-[0.12em] text-parch-500">{b.note.toUpperCase()}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* añadidos */}
            <div>
              <p className="mb-3 font-digital text-[10px] tracking-[0.24em] text-parch-500">02 · AÑADIDOS AL CONJURO</p>
              <div className="grid gap-3">
                <Stepper label="Redacción" hint="máx. 10" value={redaccion} max={MAX.redaccion} unitPrice={P.redaccion} discountPrice={P.redaccionD} discounted={ambos} onChange={setRedaccion} />
                <Stepper label="Ilustración grande" hint="máx. 5" value={grande} max={MAX.grande} unitPrice={P.grande} discountPrice={P.grandeD} discounted={ambos} onChange={setGrande} />
                <Stepper label="Dibujo pequeño" hint="sin límite" value={dibujo} max={MAX.dibujo} unitPrice={P.dibujo} discountPrice={P.dibujoD} discounted={ambos} onChange={setDibujo} />
                <Stepper label="Páginas adicionales" hint="máx. 10 · sin descuento" value={paginas} max={MAX.pagina} unitPrice={P.pagina} onChange={setPaginas} />
              </div>

              {/* estado «¡Ambos!» */}
              <div
                className={`mt-3 flex items-center justify-between gap-3 border px-4 py-3 transition-all duration-500 ${
                  ambos ? "ambos-on border-mint-500/60 bg-mint-500/[0.08]" : "border-ink-600 bg-ink-850/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Sigil d={SIGILS.knot} className={`h-5 w-5 transition-colors duration-500 ${ambos ? "text-mint-400" : "text-parch-500"}`} />
                  <p className={`font-digital text-[11px] tracking-[0.18em] ${ambos ? "text-mint-300" : "text-parch-500"}`}>
                    {ambos ? "¡DESCUENTO «¡AMBOS!» ACTIVO!" : "DESCUENTO «¡AMBOS!» INACTIVO"}
                  </p>
                </div>
                <p className="hidden font-digital text-[10px] tracking-[0.1em] text-parch-500 sm:block">
                  {ambos ? "TODO LO ADICIONAL CON DESCUENTO" : "PIDE 2 O MÁS ENTRE REDACCIÓN E ILUSTRACIÓN GRANDE"}
                </p>
              </div>
            </div>

            {/* garantía */}
            <div>
              <p className="mb-3 font-digital text-[10px] tracking-[0.24em] text-parch-500">03 · TRANQUILIDAD</p>
              <button
                onClick={() => setGarantia(!garantia)}
                aria-pressed={garantia}
                className={`flex w-full items-center justify-between gap-4 border px-5 py-4 text-left transition-all duration-300 active:scale-[0.99] ${
                  garantia ? "border-mint-500/70 bg-mint-500/[0.07]" : "border-ink-600 bg-ink-850/80 hover:border-mint-600/50"
                }`}
              >
                <span>
                  <span className="flex items-center gap-3">
                    <Sigil d={SIGILS.shield} className={`h-5 w-5 ${garantia ? "text-mint-400" : "text-parch-500"}`} />
                    <span className="font-display text-[15px] font-bold text-parch-100">Garantía de cambios · 1 año</span>
                  </span>
                  <span className="mt-1 block font-digital text-[10px] tracking-[0.12em] text-parch-500">
                    +50.000 $ COP · LA DE 1 MES SIEMPRE VA INCLUÍDA GRATIS
                  </span>
                </span>
                <span className={`relative h-6 w-11 shrink-0 rounded-full border transition-colors duration-300 ${garantia ? "border-mint-400 bg-mint-500/30" : "border-ink-500 bg-ink-800"}`}>
                  <span className={`absolute top-0.5 h-[18px] w-[18px] rounded-full transition-all duration-300 ${garantia ? "left-[22px] bg-mint-400 shadow-[0_0_12px_rgba(94,234,212,0.6)]" : "left-0.5 bg-parch-500"}`} />
                </span>
              </button>
            </div>

            {/* ritmo */}
            <div>
              <p className="mb-3 font-digital text-[10px] tracking-[0.24em] text-parch-500">04 · ¿A QUÉ RITMO FORJAMOS?</p>
              <div className="grid gap-3 sm:grid-cols-3">
                {PACES.map((p) => {
                  const on = pace === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setPace(p.id)}
                      aria-pressed={on}
                      className={`relative border px-4 py-4 text-left transition-all duration-300 active:scale-[0.98] ${
                        on
                          ? "border-gold-500/70 bg-gold-500/[0.08] shadow-[0_0_26px_-8px_rgba(227,179,65,0.45)]"
                          : "border-ink-600 bg-ink-850/80 hover:border-gold-600/50"
                      }`}
                    >
                      <span className="flex items-center justify-between gap-2">
                        <span className="font-display text-[15px] font-bold text-parch-100">{p.title}</span>
                        {p.feePct > 0 && (
                          <span className="border border-gold-500/50 bg-gold-500/10 px-1.5 py-0.5 font-digital text-[9px] tracking-[0.1em] text-gold-300">
                            +{p.feePct}%
                          </span>
                        )}
                      </span>
                      {p.desc && <span className="mt-1.5 block text-[13px] italic leading-snug text-parch-300/85">{p.desc}</span>}
                      <span className={`mt-1.5 block font-digital text-[10px] tracking-[0.12em] ${on ? "text-gold-300" : "text-parch-500"}`}>
                        {p.sub.toUpperCase()}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* -------- resumen + sello del pacto -------- */}
          <aside className="border border-gold-600/30 bg-ink-850/90">
            <div className="border-b border-ink-700 px-6 py-4">
              <p className="font-digital text-[10px] tracking-[0.26em] text-parch-500">PERGAMINO DEL PACTO</p>
            </div>
            <div className="px-6 py-5">
              <ul className="space-y-2.5">
                {rows.map((r) => (
                  <li key={r.label} className="flex items-baseline justify-between gap-3">
                    <span className="text-[13px] text-parch-300/90">{r.label}</span>
                    <span className={`font-digital text-[13px] ${r.mint ? "text-mint-400" : "text-parch-100"}`}>{r.value}</span>
                  </li>
                ))}
                {calc.ahorro > 0 && (
                  <li className="flex items-baseline justify-between gap-3 border-t border-dashed border-mint-500/30 pt-2.5">
                    <span className="font-digital text-[11px] tracking-[0.14em] text-mint-300">AHORRO «¡AMBOS!»</span>
                    <span className="font-digital text-[13px] text-mint-400">−{fmt(calc.ahorro)}</span>
                  </li>
                )}
                {calc.expressFee > 0 && (
                  <li className="flex items-baseline justify-between gap-3">
                    <span className="font-digital text-[11px] tracking-[0.14em] text-gold-300">EXPRÉS +10%</span>
                    <span className="font-digital text-[13px] text-gold-300">+{fmt(calc.expressFee)}</span>
                  </li>
                )}
              </ul>

              <div className="mt-6 border-t border-ink-700 pt-5">
                <p className="font-digital text-[10px] tracking-[0.26em] text-parch-500">TOTAL DEL PACTO</p>
                <p key={calc.total} className="count-pop mt-2 font-digital text-[40px] leading-none text-gold-400" style={{ textShadow: "0 0 26px rgba(227,179,65,0.3)" }}>
                  {fmt(calc.total)}
                </p>
                <p className="mt-1 font-digital text-[11px] tracking-[0.18em] text-parch-500">$ COP · ENTREGA EN HASTA {paceData.weeks.toUpperCase()}</p>
              </div>

              {/* sello del pacto: datos del cliente */}
              <div className="mt-6 border-t border-ink-700 pt-5">
                <p className="font-digital text-[10px] tracking-[0.26em] text-gold-500">TU PARTE DEL PACTO</p>

                <label className="mt-4 block">
                  <span className="font-digital text-[9px] tracking-[0.18em] text-parch-500">
                    TU NOMBRE O CÓMO QUIERES QUE TE LLAME
                  </span>
                  <input
                    type="text"
                    value={nombre}
                    maxLength={60}
                    onChange={(ev) => setNombre(ev.target.value)}
                    placeholder="Ej.: Luna"
                    className={`pacto-input mt-1.5 ${errores.nombre ? "err" : ""}`}
                  />
                  {errores.nombre && <span className="campo-err">{errores.nombre}</span>}
                </label>

                <label className="mt-3.5 block">
                  <span className="font-digital text-[9px] tracking-[0.18em] text-parch-500">
                    TU CORREO PARA RESPONDERTE
                  </span>
                  <input
                    type="email"
                    value={email}
                    maxLength={80}
                    onChange={(ev) => setEmail(ev.target.value)}
                    placeholder="tucorreo@ejemplo.com"
                    className={`pacto-input mt-1.5 ${errores.email ? "err" : ""}`}
                  />
                  {errores.email && <span className="campo-err">{errores.email}</span>}
                </label>

                <label className="mt-3.5 block">
                  <span className="font-digital text-[9px] tracking-[0.18em] text-parch-500">
                    DESCRIBE TU IDEA
                  </span>
                  <textarea
                    value={idea}
                    rows={4}
                    maxLength={2000}
                    onChange={(ev) => setIdea(ev.target.value)}
                    placeholder="¿Qué mundo quieres que exista? Cuéntamelo como se lo contarías a un amigo…"
                    className={`pacto-input mt-1.5 ${errores.idea ? "err" : ""}`}
                  />
                  {errores.idea && <span className="campo-err">{errores.idea}</span>}
                </label>
              </div>

              {/* cierre del pacto */}
              {envio === "sent" ? (
                <div className="mt-6 border border-mint-500/50 bg-mint-500/[0.08] px-5 py-4 text-center">
                  <p className="font-display text-[15px] font-bold tracking-wide text-mint-300">¡PACTO SELLADO!</p>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-parch-300/90">
                    Tu pacto voló hacia {DESTINO}. Te responderé a tu correo muy pronto.
                  </p>
                  <button
                    onClick={() => { setEnvio("idle"); setNombre(""); setEmail(""); setIdea(""); setErrores({}); }}
                    className="link-underline mt-3 font-digital text-[10px] tracking-[0.18em] text-mint-400"
                  >
                    FORJAR OTRO PACTO
                  </button>
                </div>
              ) : envio === "fallback" ? (
                <div className="mt-6 border border-gold-500/50 bg-gold-500/[0.07] px-5 py-4 text-center">
                  <p className="font-display text-[14px] font-bold tracking-wide text-gold-300">CASI LO TENEMOS</p>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-parch-300/90">
                    Se abrió tu gestor de correo con el pacto ya escrito, listo para enviarse a {DESTINO}.
                  </p>
                  <button
                    onClick={() => setEnvio("idle")}
                    className="link-underline mt-3 font-digital text-[10px] tracking-[0.18em] text-gold-400"
                  >
                    INTENTAR EL ENVÍO DIRECTO
                  </button>
                </div>
              ) : (
                <button
                  onClick={enviar}
                  disabled={envio === "sending"}
                  className="group mt-6 flex w-full items-center justify-center gap-3 bg-gold-400 px-5 py-3.5 font-digital text-[11px] tracking-[0.2em] text-ink-900 transition-all duration-300 enabled:hover:shadow-[0_0_36px_rgba(227,179,65,0.45)] enabled:hover:brightness-110 enabled:active:scale-[0.98] disabled:opacity-70"
                >
                  {envio === "sending" ? (
                    <>
                      <svg viewBox="0 0 20 20" className="h-4 w-4 animate-spin" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                        <path d="M10 2a8 8 0 1 1-8 8" />
                      </svg>
                      FORJANDO EL MENSAJE…
                    </>
                  ) : (
                    <>
                      CERRAR EL PACTO
                      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2.5 8h11M9.5 4l4 4-4 4" />
                      </svg>
                    </>
                  )}
                </button>
              )}
              <p className="mt-4 text-center font-digital text-[9px] tracking-[0.14em] text-parch-600">
                EL PRECIO FINAL SE NEGOCIA · NADA SE COBRA SIN ACUERDO
              </p>
            </div>
          </aside>
        </div>
      </Reveal>
    </div>
  );
}
