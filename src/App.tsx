import { useEffect, useState } from "react";
import { Ambient, Header, Marquee } from "./components/Chrome";
import RuneText from "./components/RuneText";
import LicuadoroCard from "./components/LicuadoroCard";
import Poem from "./components/Poem";
import { Process } from "./components/Sections";
import { Ofrendas } from "./components/Pricing";
import Recibo from "./components/Recibo";
import { RECIBO_HASH } from "./data";
import { useReducedMotion } from "./hooks";

function ScrollHint() {
  return (
    <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
      <span className="font-digital text-[10px] tracking-[0.3em] text-parch-500">DESLIZA</span>
      <svg viewBox="0 0 24 24" className="h-5 w-5 animate-bounce text-gold-500/80" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 4v14M6 13l6 6 6-6" />
      </svg>
    </div>
  );
}

function Hero() {
  const reduced = useReducedMotion();
  return (
    <section id="inicio" className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-28 pb-20 lg:pt-24 lg:pb-28">
      {!reduced && <ScrollHint />}
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-[1.3fr_0.7fr] lg:gap-10">
          {/* mitad izquierda: la profecía rúnica */}
          <div>
            <p className="mb-7 inline-flex items-center gap-2.5 border border-gold-600/40 bg-gold-400/[0.06] px-3.5 py-1.5 font-digital text-[10px] tracking-[0.24em] text-gold-300/90">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-mint-400" />
              CREATORIUS · SERVICIO DE CREACIÓN WEB POR PEDIDO
            </p>
            <RuneText />
          </div>

          {/* mitad derecha: la tarjeta de Licuadoro */}
          <div className="justify-self-center lg:justify-self-end lg:pr-2">
            <LicuadoroCard />
          </div>
        </div>

        {/* el conjuro del encargo, en la misma sección */}
        <div className="mt-20 lg:mt-24">
          <Poem />
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // La mesa de recibos es privada: solo existe tras la runa secreta del enlace.
  if (hash.startsWith(`#/${RECIBO_HASH}`)) {
    return (
      <div className="relative min-h-screen overflow-x-clip bg-ink-900 text-parch-200 selection:bg-gold-400/30 selection:text-parch-100">
        <Ambient />
        <Recibo />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-clip bg-ink-900 text-parch-200 selection:bg-gold-400/30 selection:text-parch-100">
      <Ambient />
      <Header />
      <main className="relative z-10">
        <Hero />
        <Marquee />
        <Process />
        <Ofrendas />
      </main>
    </div>
  );
}
