import { Ambient, Header, Marquee, Footer } from "./components/Chrome";
import RuneText from "./components/RuneText";
import LicuadoroCard from "./components/LicuadoroCard";
import Poem from "./components/Poem";
import { Process, Offerings, Oracle } from "./components/Sections";
import RuneGlyph from "./components/RuneGlyph";

function Hero() {
  return (
    <section id="inicio" className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 pb-20 pt-32 lg:pt-36">
      <div className="grid items-center gap-16 lg:grid-cols-[1.12fr_0.88fr] lg:gap-12">
        {/* mitad izquierda: la profecía rúnica */}
        <div className="relative">
          <div className="mb-8 flex items-center gap-4">
            <RuneGlyph ch="k" className="h-8 w-8 text-gold-500/70" strokeWidth={1.8} />
            <div>
              <p className="font-digital text-[11px] tracking-[0.3em] text-gold-500">
                <span className="text-mint-400">//</span> SERVICIO DE CREACIÓN WEB POR PEDIDO
              </p>
              <p className="mt-1 font-digital text-[10px] tracking-[0.22em] text-parch-500">
                PROFECÍA Nº 001 · GRABADA EN RUNA VIVA
              </p>
            </div>
          </div>

          <RuneText />

          <div className="mt-9 flex flex-wrap gap-2.5">
            {["1 ARTESANO", "∞ IDEAS POSIBLES", "PRECIO NEGOCIABLE", "ALTA CALIDAD"].map((chip) => (
              <span
                key={chip}
                className="border border-ink-600/80 bg-ink-850/70 px-3 py-1.5 font-digital text-[10px] tracking-[0.2em] text-parch-300/85 transition-all duration-300 hover:border-gold-500/50 hover:text-gold-300"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        {/* mitad derecha: la tarjeta del artesano */}
        <div className="flex justify-center lg:justify-end lg:pr-4">
          <LicuadoroCard />
        </div>
      </div>

      {/* invitación a seguir bajando */}
      <div className="pointer-events-none absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="font-digital text-[9px] tracking-[0.34em] text-parch-500">DESLIZA · EL CONJURO SIGUE</span>
        <svg viewBox="0 0 16 22" className="float-y h-5 w-5 text-gold-500" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="4.5" y="1.5" width="7" height="12" rx="3.5" />
          <path d="M8 5v3" />
          <path d="M4 17l4 4 4-4" />
        </svg>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <Ambient />
      <Header />
      <main className="relative z-10">
        <Hero />
        <Poem />
        <Marquee />
        <Process />
        <Offerings />
        <Oracle />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
