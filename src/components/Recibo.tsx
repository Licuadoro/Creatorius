import { useMemo, useRef, useState } from "react";
import { toPng } from "html-to-image";
import RuneGlyph from "./RuneGlyph";
import { CMB_KEY, CMB_LS_KEY, RECIBO_HASH, WA_DISPLAY, WA_NUM } from "../data";
import { P, MAX, PACES, calcularPacto, fmt, type PaceId, type PactoCfg } from "./Pricing";

type DatosCliente = { n: string; e: string; wa: string; i: string };

function leerHash(): { valido: boolean; datos: (PactoCfg & DatosCliente) | null } {
  const hash = window.location.hash || "";
  const [path, query = ""] = hash.split("?");
  if (path !== `#/${RECIBO_HASH}`) return { valido: false, datos: null };
  const d = new URLSearchParams(query).get("d");
  if (!d) return { valido: true, datos: null };
  try {
    const json = decodeURIComponent(escape(atob(d.replace(/-/g, "+").replace(/_/g, "/"))));
    const o = JSON.parse(json);
    return {
      valido: true,
      datos: {
        n: String(o.n ?? ""),
        e: String(o.e ?? ""),
        wa: String(o.wa ?? ""),
        i: String(o.i ?? ""),
        base: o.b === "corp" ? "corp" : "basica",
        r: Math.min(MAX.redaccion, Math.max(0, Number(o.r) || 0)),
        g: Math.min(MAX.grande, Math.max(0, Number(o.g) || 0)),
        d: Math.max(0, Number(o.d) || 0),
        p: Math.min(MAX.pagina, Math.max(0, Number(o.p) || 0)),
        w: Boolean(o.w),
        v: (["sin", "estandar", "express"].includes(o.v) ? o.v : "sin") as PaceId,
      },
    };
  } catch {
    return { valido: true, datos: null };
  }
}

const DEFAULT_CFG: PactoCfg = { base: "basica", r: 0, g: 0, d: 0, p: 0, w: false, v: "sin" };

const LS_CUENTA = "creatorius:cuenta";

/**
 * Panel privado para configurar el bot de WhatsApp (CallMeBot).
 * Solo se muestra en la mesa de recibos, que ya es una página de acceso privado.
 */
function BotWhatsApp() {
  const [saved, setSaved] = useState<string>(() => {
    try { return localStorage.getItem(CMB_LS_KEY) ?? ""; } catch { return ""; }
  });
  const [input, setInput] = useState("");
  const [test, setTest] = useState<"idle" | "sending" | "ok">("idle");
  const [flash, setFlash] = useState(false);

  const efectiva = saved.trim() || CMB_KEY.trim();

  const guardar = () => {
    const v = input.trim();
    try {
      if (v) localStorage.setItem(CMB_LS_KEY, v);
      else localStorage.removeItem(CMB_LS_KEY);
    } catch { /* sin almacenamiento */ }
    setSaved(v);
    setInput("");
    setFlash(true);
    window.setTimeout(() => setFlash(false), 2600);
  };

  const borrar = () => {
    try { localStorage.removeItem(CMB_LS_KEY); } catch { /* sin almacenamiento */ }
    setSaved("");
  };

  const probar = () => {
    const key = input.trim() || efectiva;
    if (!key) return;
    setTest("sending");
    const img = new Image();
    img.src = `https://api.callmebot.com/whatsapp.php?phone=${WA_NUM}&text=${encodeURIComponent(
      "Prueba de Creatorius: el bot de WhatsApp funciona. Los pactos te llegarán por aquí."
    )}&apikey=${encodeURIComponent(key)}`;
    window.setTimeout(() => setTest("ok"), 1500);
  };

  return (
    <div className="border border-mint-500/30 bg-mint-500/[0.03] p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="font-digital text-[10px] tracking-[0.24em] text-mint-300">04 · BOT DE WHATSAPP (SOLO PARA TI)</p>
        <span
          className={`flex items-center gap-1.5 border px-2 py-1 font-digital text-[9px] tracking-[0.14em] transition-colors duration-300 ${
            efectiva ? "border-mint-500/50 bg-mint-500/[0.08] text-mint-300" : "border-ink-600 text-parch-500"
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${efectiva ? "bg-mint-400" : "bg-parch-600"}`} />
          {efectiva ? "BOT ACTIVO" : "SIN LLAVE"}
        </span>
      </div>

      <p className="mt-3 text-[12px] leading-relaxed text-parch-400">
        Para que los pactos por WhatsApp te lleguen solos a <span className="text-parch-200">{WA_DISPLAY}</span> (sin que el
        cliente abra ni envíe nada), activa el bot gratuito <span className="text-parch-200">CallMeBot</span> una sola vez:
      </p>
      <ol className="mt-2.5 list-decimal space-y-1.5 pl-5 text-[12px] leading-relaxed text-parch-400">
        <li>
          Guarda en tus contactos el número del bot: <span className="font-digital text-[11px] text-mint-300">+34 644 51 95 23</span>
        </li>
        <li>
          Escríbele por WhatsApp: <span className="font-digital text-[11px] text-parch-100">I allow callmebot to send me messages</span>
        </li>
        <li>Te responderá con una llave (apikey). Cópiala y pégala aquí abajo.</li>
      </ol>

      <div className="mt-3.5 flex items-stretch gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={efectiva ? `Llave actual: ····${efectiva.slice(-4)}` : "Pega aquí tu apikey de CallMeBot"}
          className="pacto-input flex-1 font-digital text-[12px]"
        />
        <button
          onClick={guardar}
          className="shrink-0 border border-mint-500/50 bg-mint-500/[0.08] px-3.5 font-digital text-[9px] tracking-[0.16em] text-mint-300 transition-all duration-300 hover:bg-mint-500/20"
        >
          {flash ? "¡GUARDADA!" : "GUARDAR"}
        </button>
        <button
          onClick={probar}
          disabled={!input.trim() && !efectiva}
          className="shrink-0 border border-ink-600 bg-ink-850/80 px-3.5 font-digital text-[9px] tracking-[0.16em] text-parch-300 transition-all duration-300 enabled:hover:border-mint-500/60 enabled:hover:text-mint-300 disabled:opacity-40"
        >
          {test === "sending" ? "ENVIANDO…" : test === "ok" ? "MIRA TU WHATSAPP" : "PROBAR"}
        </button>
      </div>
      <div className="mt-2.5 flex items-center justify-between gap-3">
        <p className="font-digital text-[8.5px] leading-relaxed tracking-[0.1em] text-parch-600">
          SE GUARDA EN ESTE NAVEGADOR · PARA TODOS LOS VISITANTES, PÉGALA TAMBIÉN EN src/data.ts → CMB_KEY
        </p>
        {saved && (
          <button onClick={borrar} className="link-underline shrink-0 font-digital text-[8.5px] tracking-[0.16em] text-red-300/80 transition-colors hover:text-red-300">
            QUITAR LLAVE
          </button>
        )}
      </div>
    </div>
  );
}

function MiniStepper({ label, value, max, onChange }: { label: string; value: number; max: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center justify-between gap-3 border border-ink-600/80 bg-ink-850/80 px-3.5 py-2.5">
      <span className="text-[13px] text-parch-300/90">{label}</span>
      <span className="flex items-center gap-2">
        <button
          aria-label={`Quitar ${label}`}
          onClick={() => onChange(Math.max(0, value - 1))}
          disabled={value <= 0}
          className="grid h-7 w-7 place-items-center border border-ink-600 text-parch-300 transition-colors enabled:hover:border-red-400/60 enabled:hover:text-red-300 disabled:opacity-30"
        >
          <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M2 6h8" /></svg>
        </button>
        <span key={value} className={`count-pop w-7 text-center font-digital text-[15px] ${value > 0 ? "text-mint-400" : "text-parch-500"}`}>{value}</span>
        <button
          aria-label={`Añadir ${label}`}
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="grid h-7 w-7 place-items-center border border-ink-600 text-parch-300 transition-colors enabled:hover:border-mint-400/70 enabled:hover:text-mint-300 disabled:opacity-30"
        >
          <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 2v8M2 6h8" /></svg>
        </button>
      </span>
    </div>
  );
}

export default function Recibo() {
  const lectura = useMemo(leerHash, []);
  const [cfg, setCfg] = useState<PactoCfg>(lectura.datos ?? DEFAULT_CFG);
  const [cliente, setCliente] = useState(lectura.datos?.n ?? "");
  const [precio, setPrecio] = useState<string>(() => {
    const c = lectura.datos;
    return c ? String(calcularPacto({ base: c.base, r: c.r, g: c.g, d: c.d, p: c.p, w: c.w, v: c.v }).total) : "";
  });
  const [cuenta, setCuenta] = useState(() => {
    try { return localStorage.getItem(LS_CUENTA) ?? ""; } catch { return ""; }
  });
  const [estado, setEstado] = useState<"idle" | "generando" | "ok" | "error">("idle");

  const reciboRef = useRef<HTMLDivElement | null>(null);
  const calc = useMemo(() => calcularPacto(cfg), [cfg]);
  const paceData = PACES.find((p) => p.id === cfg.v)!;

  const folio = useMemo(() => `R-${Math.random().toString(36).slice(2, 7).toUpperCase()}`, []);
  const fecha = useMemo(
    () => new Date().toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" }),
    []
  );

  if (!lectura.valido) {
    return (
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <RuneGlyph ch="x" strokeWidth={1.4} className="h-16 w-16 text-gold-500/50" />
        <h1 className="mt-6 font-display text-2xl font-bold tracking-wide text-parch-100">Esta runa no lleva a ninguna parte</h1>
        <p className="mt-3 max-w-md text-[14.5px] leading-relaxed text-parch-500">
          La mesa de recibos es privada. Solo se entra con el enlace que llega al correo del forjador.
        </p>
        <a href="#/" onClick={() => { window.location.hash = ""; }} className="link-underline mt-8 font-digital text-[11px] tracking-[0.2em] text-gold-400">
          VOLVER AL TEMPLO
        </a>
      </div>
    );
  }

  const set = (patch: Partial<PactoCfg>) => setCfg((c) => ({ ...c, ...patch }));

  const guardarCuenta = (v: string) => {
    setCuenta(v);
    try { localStorage.setItem(LS_CUENTA, v); } catch { /* sin almacenamiento */ }
  };

  const filas: { label: string; valor: string; mint?: boolean }[] = [
    { label: cfg.base === "basica" ? "Web básica" : "Web corporativa (incluye 5 páginas)", valor: fmt(calc.baseCost) },
  ];
  if (cfg.r > 0) filas.push({ label: `Redacción ×${cfg.r}`, valor: fmt(calc.rCost), mint: calc.ambos });
  if (cfg.g > 0) filas.push({ label: `Ilustración grande ×${cfg.g}`, valor: fmt(calc.gCost), mint: calc.ambos });
  if (cfg.d > 0) filas.push({ label: `Dibujo pequeño ×${cfg.d}`, valor: fmt(calc.dCost), mint: calc.ambos });
  if (cfg.p > 0) filas.push({ label: `Páginas adicionales ×${cfg.p}`, valor: fmt(calc.pCost) });
  if (cfg.w) filas.push({ label: "Garantía de cambios · 1 año", valor: fmt(calc.gar) });

  const precioNum = Number(precio);
  const precioValido = precio.trim() !== "" && !Number.isNaN(precioNum) && precioNum >= 0;

  const exportar = async () => {
    if (!reciboRef.current) return;
    setEstado("generando");
    try {
      const dataUrl = await toPng(reciboRef.current, { pixelRatio: 2, backgroundColor: "#0d131d", cacheBust: true });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `recibo-creatorius-${folio}.png`;
      a.click();
      setEstado("ok");
      window.setTimeout(() => setEstado("idle"), 3500);
    } catch {
      setEstado("error");
    }
  };

  return (
    <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 pt-14">
      {/* cabecera de la mesa */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gold-600/25 pb-6">
        <div className="flex items-center gap-3.5">
          <svg viewBox="0 0 34 34" className="h-8 w-8 text-gold-400" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 5 L11 17 L22 29" />
            <path d="M11 17 H26" />
          </svg>
          <div>
            <p className="font-display text-[15px] font-bold tracking-[0.3em] text-parch-100">CREATORIUS</p>
            <p className="font-digital text-[10px] tracking-[0.26em] text-gold-500">MESA DE SELLOS · RECIBOS</p>
          </div>
        </div>
        <span className="flex items-center gap-2 border border-gold-500/40 bg-gold-400/[0.07] px-3 py-1.5 font-digital text-[10px] tracking-[0.2em] text-gold-300">
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="7" width="10" height="6.5" />
            <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
          </svg>
          PÁGINA PRIVADA · SOLO CON EL ENLACE
        </span>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        {/* ------- controles ------- */}
        <div className="space-y-8">
          <div>
            <p className="font-digital text-[10px] tracking-[0.24em] text-parch-500">01 · LO QUE PIDIÓ</p>
            {lectura.datos ? (
              <p className="mt-2.5 border border-mint-500/30 bg-mint-500/[0.06] px-4 py-3 text-[13px] leading-relaxed text-parch-300/90">
                El pacto de <span className="font-semibold text-mint-300">{lectura.datos.n || "tu cliente"}</span> llegó
                precargado desde su correo. Puedes ajustarlo si la negociación cambió algo.
              </p>
            ) : (
              <p className="mt-2.5 border border-ink-600 bg-ink-850/70 px-4 py-3 text-[13px] leading-relaxed text-parch-500">
                Entraste sin un pacto adjunto: arma el recibo a mano.
              </p>
            )}
            {lectura.datos?.i && (
              <details className="group mt-3 border border-ink-600 bg-ink-850/60">
                <summary className="cursor-pointer list-none px-4 py-3 font-digital text-[10px] tracking-[0.2em] text-gold-400 transition-colors hover:text-gold-300">
                  LEER SU IDEA ▾
                </summary>
                <p className="border-t border-ink-700 px-4 py-3.5 text-[13.5px] italic leading-relaxed text-parch-300/90">
                  «{lectura.datos.i}»
                </p>
                {(lectura.datos.e || lectura.datos.wa) && (
                  <p className="px-4 pb-3.5 font-digital text-[10px] tracking-[0.14em] text-parch-500">
                    {lectura.datos.wa
                      ? `RESPONDER POR WHATSAPP: ${lectura.datos.wa.toUpperCase()}`
                      : `RESPONDER A: ${lectura.datos.e.toUpperCase()}`}
                  </p>
                )}
              </details>
            )}
            <div className="mt-4 grid gap-2.5">
              <div className="grid grid-cols-2 gap-2.5">
                {(["basica", "corp"] as const).map((b) => (
                  <button
                    key={b}
                    onClick={() => set({ base: b })}
                    aria-pressed={cfg.base === b}
                    className={`border px-3 py-2.5 text-left font-digital text-[11px] tracking-[0.12em] transition-all duration-300 ${
                      cfg.base === b
                        ? "border-gold-500/70 bg-gold-500/[0.09] text-gold-300"
                        : "border-ink-600 bg-ink-850/80 text-parch-500 hover:border-gold-600/50"
                    }`}
                  >
                    {b === "basica" ? "WEB BÁSICA · 190.000" : "CORPORATIVA · 390.000"}
                  </button>
                ))}
              </div>
              <MiniStepper label="Redacción" value={cfg.r} max={MAX.redaccion} onChange={(v) => set({ r: v })} />
              <MiniStepper label="Ilustración grande" value={cfg.g} max={MAX.grande} onChange={(v) => set({ g: v })} />
              <MiniStepper label="Dibujo pequeño" value={cfg.d} max={MAX.dibujo} onChange={(v) => set({ d: v })} />
              <MiniStepper label="Páginas adicionales" value={cfg.p} max={MAX.pagina} onChange={(v) => set({ p: v })} />
              <button
                onClick={() => set({ w: !cfg.w })}
                aria-pressed={cfg.w}
                className={`flex items-center justify-between border px-3.5 py-2.5 font-digital text-[11px] tracking-[0.12em] transition-all duration-300 ${
                  cfg.w ? "border-mint-500/60 bg-mint-500/[0.07] text-mint-300" : "border-ink-600 bg-ink-850/80 text-parch-500 hover:border-mint-600/50"
                }`}
              >
                GARANTÍA DE CAMBIOS · 1 AÑO (+50.000)
                <span className={`h-2 w-2 rounded-full ${cfg.w ? "bg-mint-400" : "bg-ink-600"}`} />
              </button>
              <div className="grid grid-cols-3 gap-2.5">
                {PACES.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => set({ v: p.id })}
                    aria-pressed={cfg.v === p.id}
                    className={`border px-2 py-2.5 font-digital text-[10px] tracking-[0.1em] transition-all duration-300 ${
                      cfg.v === p.id
                        ? "border-gold-500/70 bg-gold-500/[0.09] text-gold-300"
                        : "border-ink-600 bg-ink-850/80 text-parch-500 hover:border-gold-600/50"
                    }`}
                  >
                    {p.title.toUpperCase()}
                    {p.feePct > 0 ? ` +${p.feePct}%` : ""}
                  </button>
                ))}
              </div>
              <p className={`border px-3.5 py-2.5 font-digital text-[10px] tracking-[0.16em] transition-all duration-500 ${calc.ambos ? "ambos-on border-mint-500/50 bg-mint-500/[0.07] text-mint-300" : "border-ink-600 bg-ink-850/50 text-parch-500"}`}>
                {calc.ambos ? "«¡AMBOS!» ACTIVO — TODO LO ADICIONAL CON DESCUENTO" : "«¡AMBOS!» INACTIVO — FALTAN AÑADIDOS"}
              </p>
            </div>
          </div>

          <div>
            <p className="font-digital text-[10px] tracking-[0.24em] text-parch-500">02 · PRECIO FINAL TRAS NEGOCIAR</p>
            <div className="mt-3 flex items-stretch gap-2.5">
              <div className={`flex flex-1 items-center gap-2 border px-4 ${precioValido ? "border-gold-500/60 bg-ink-850" : "border-ink-600 bg-ink-850/80"}`}>
                <input
                  type="number"
                  min={0}
                  step={1000}
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  placeholder="Escribe el precio pactado"
                  className="w-full bg-transparent py-3.5 font-digital text-[18px] text-gold-300 outline-none placeholder:text-parch-600"
                />
                <span className="shrink-0 font-digital text-[11px] tracking-[0.14em] text-parch-500">$ COP</span>
              </div>
              <button
                onClick={() => setPrecio(String(calc.total))}
                title="Usar el total que calcula la configuración"
                className="shrink-0 border border-ink-600 bg-ink-850/80 px-4 font-digital text-[10px] tracking-[0.14em] text-parch-300 transition-all duration-300 hover:border-gold-500/60 hover:text-gold-300"
              >
                USAR CALCULADO
                <span className="mt-0.5 block text-[10px] text-gold-500">{fmt(calc.total)}</span>
              </button>
            </div>
          </div>

          <div>
            <p className="font-digital text-[10px] tracking-[0.24em] text-parch-500">03 · CUENTA PARA LA TRANSFERENCIA</p>
            <input
              type="text"
              value={cuenta}
              onChange={(e) => guardarCuenta(e.target.value)}
              placeholder="Ej.: Nequi 300 123 4567 · Daviplata · Bancolombia…"
              className="pacto-input mt-3"
            />
            <p className="mt-2 font-digital text-[9px] tracking-[0.16em] text-parch-600">SE GUARDA EN ESTE NAVEGADOR PARA PRÓXIMOS RECIBOS</p>
          </div>

          <BotWhatsApp />

          <button
            onClick={exportar}
            disabled={estado === "generando" || !precioValido}
            className="group flex w-full items-center justify-center gap-3 bg-gold-400 px-5 py-4 font-digital text-[12px] tracking-[0.22em] text-ink-900 transition-all duration-300 enabled:hover:shadow-[0_0_40px_rgba(227,179,65,0.45)] enabled:hover:brightness-110 enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {estado === "generando" ? (
              <>
                <svg viewBox="0 0 20 20" className="h-4 w-4 animate-spin" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M10 2a8 8 0 1 1-8 8" />
                </svg>
                ESTAMPANDO LA IMAGEN…
              </>
            ) : (
              <>
                <svg viewBox="0 0 18 18" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2.5" y="2.5" width="13" height="13" />
                  <circle cx="7" cy="7" r="1.4" />
                  <path d="m15.5 11.5-3.5-3.5-6.5 6.5" />
                </svg>
                GUARDAR RECIBO COMO IMAGEN
              </>
            )}
          </button>
          {!precioValido && (
            <p className="-mt-5 text-center font-digital text-[10px] tracking-[0.16em] text-red-300/90">
              ESCRIBE EL PRECIO FINAL PARA PODER SELLAR EL RECIBO
            </p>
          )}
          {estado === "ok" && (
            <p className="-mt-5 text-center font-digital text-[10px] tracking-[0.16em] text-mint-300">
              ¡RECIBO SELLADO! REVISA TUS DESCARGAS PARA ENVIÁRSELO.
            </p>
          )}
          {estado === "error" && (
            <p className="-mt-5 text-center font-digital text-[10px] tracking-[0.16em] text-red-300/90">
              LA FORJA FALLÓ AL ESTAMPAR. INTÉNTALO DE NUEVO.
            </p>
          )}
        </div>

        {/* ------- el recibo ------- */}
        <div>
          <p className="mb-3 font-digital text-[10px] tracking-[0.24em] text-parch-500">ASÍ SE VERÁ LO QUE LE ENVÍES</p>
          <div className="overflow-x-auto pb-2">
            <div
              ref={reciboRef}
              className="w-[620px] shrink-0 border border-gold-600/50 bg-[linear-gradient(165deg,#141c2a_0%,#0d131d_70%)] shadow-[0_36px_90px_-30px_rgba(0,0,0,0.9)]"
            >
              {/* marco interior */}
              <div className="m-3 border border-dashed border-gold-600/35 p-8">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex items-center gap-3.5">
                    <RuneGlyph ch="c" strokeWidth={1.5} className="h-11 w-11 text-gold-400" />
                    <div>
                      <p className="font-display text-[22px] font-bold leading-none tracking-[0.22em] text-parch-100">CREATORIUS</p>
                      <p className="mt-1.5 font-digital text-[10px] tracking-[0.3em] text-gold-500">RECIBO DE PAGO</p>
                    </div>
                  </div>
                  <div className="text-right font-digital text-[10px] leading-relaxed tracking-[0.18em] text-parch-500">
                    <p className="text-parch-300">FOLIO {folio}</p>
                    <p>{fecha.toUpperCase()}</p>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-3" aria-hidden="true">
                  <span className="h-px flex-1 bg-gold-600/40" />
                  <span className="h-1.5 w-1.5 rotate-45 bg-gold-500" />
                  <span className="h-px flex-1 bg-gold-600/40" />
                </div>

                <p className="mt-6 text-[14px] text-parch-300/90">
                  A nombre de{" "}
                  <span className="font-display text-[17px] font-bold text-gold-300">
                    {cliente.trim() || "________________"}
                  </span>
                </p>
                <p className="mt-1 font-digital text-[10px] tracking-[0.22em] text-parch-500">
                  POR LA FORJA DE SU WEB · RITMO: {paceData.title.toUpperCase()} · HASTA {paceData.weeks.toUpperCase()}
                </p>

                <ul className="mt-6 space-y-2.5">
                  {filas.map((f) => (
                    <li key={f.label} className="flex items-baseline gap-3">
                      <span className="shrink-0 text-[13.5px] text-parch-300/95">{f.label}</span>
                      <span className="mx-1 flex-1 border-b border-dotted border-parch-700/70" aria-hidden="true" />
                      <span className={`shrink-0 font-digital text-[13.5px] ${f.mint ? "text-mint-400" : "text-parch-100"}`}>{f.valor}</span>
                    </li>
                  ))}
                  {calc.ambos && (
                    <li className="flex items-baseline gap-3">
                      <span className="shrink-0 font-digital text-[11px] tracking-[0.16em] text-mint-300">DESCUENTO «¡AMBOS!» APLICADO</span>
                      <span className="mx-1 flex-1 border-b border-dotted border-mint-600/50" aria-hidden="true" />
                      <span className="shrink-0 font-digital text-[13.5px] text-mint-400">−{fmt(calc.ahorro)}</span>
                    </li>
                  )}
                  {calc.expressFee > 0 && (
                    <li className="flex items-baseline gap-3">
                      <span className="shrink-0 font-digital text-[11px] tracking-[0.16em] text-gold-300">RECARGO EXPRÉS (+10%)</span>
                      <span className="mx-1 flex-1 border-b border-dotted border-gold-600/50" aria-hidden="true" />
                      <span className="shrink-0 font-digital text-[13.5px] text-gold-300">+{fmt(calc.expressFee)}</span>
                    </li>
                  )}
                </ul>

                <div className="mt-7 flex items-center justify-between gap-6 border-t-2 border-gold-500/60 pt-5">
                  <div>
                    <p className="font-digital text-[10px] tracking-[0.28em] text-parch-500">PRECIO FINAL</p>
                    <p className="font-digital text-[9px] tracking-[0.2em] text-parch-600">TRAS NEGOCIACIÓN</p>
                  </div>
                  <p className="font-digital text-[38px] leading-none text-gold-300">
                    {precioValido ? fmt(precioNum) : "—————"} <span className="text-[15px] text-parch-400">$ COP</span>
                  </p>
                </div>

                <div className="mt-7 border border-mint-600/40 bg-mint-500/[0.06] p-5">
                  <p className="font-digital text-[10px] tracking-[0.28em] text-mint-300">REALIZA LA TRANSFERENCIA A</p>
                  <p className="mt-2.5 font-digital text-[19px] tracking-[0.08em] text-parch-100">
                    {cuenta.trim() || "· · · pendiente de indicar · · ·"}
                  </p>
                  <p className="mt-2.5 text-[12px] leading-relaxed text-parch-500">
                    Al transferir, escribe en el concepto tu nombre y el folio {folio}. La forja comienza en cuanto se confirma el pago.
                  </p>
                </div>

                <div className="mt-7 flex items-end justify-between gap-6">
                  <p className="max-w-[330px] text-[12px] italic leading-relaxed text-parch-500">
                    «Tu idea será real en poco tiempo, como un azafrán que germina entre el asfalto.»
                  </p>
                  <div className="text-right">
                    <p className="font-display text-[15px] font-bold tracking-[0.18em] text-gold-400">LICUADORO</p>
                    <p className="font-digital text-[9px] tracking-[0.26em] text-parch-500">CREATORIUS · LICUADO</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <label className="mt-5 block max-w-[620px]">
            <span className="font-digital text-[10px] tracking-[0.22em] text-parch-500">NOMBRE DEL CLIENTE EN EL RECIBO</span>
            <input
              type="text"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              placeholder="Cómo quieres que aparezca en el recibo"
              className="pacto-input mt-2"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
