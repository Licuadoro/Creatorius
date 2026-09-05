import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { MONEDA_LISTA, TASAS_RESERVA } from "./data";

type CurrencyState = {
  code: string;
  setCode: (c: string) => void;
  /** Convierte un valor en COP a la moneda elegida y lo formatea listo para mostrar. */
  formatMoney: (cop: number) => string;
  /** true si las tasas vienen del servicio en vivo; false si son las de respaldo. */
  enVivo: boolean;
};

const CurrencyContext = createContext<CurrencyState | null>(null);

const LS_KEY = "creatorius:moneda";
const fmtCOP = (n: number) => n.toLocaleString("es-CO");

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [code, setCodeState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved && MONEDA_LISTA.some((m) => m.code === saved)) return saved;
    } catch { /* sin almacenamiento */ }
    return "COP";
  });
  const [tasas, setTasas] = useState<Record<string, number>>(TASAS_RESERVA);
  const [enVivo, setEnVivo] = useState(false);

  useEffect(() => {
    let cancelado = false;
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("sin tasas"))))
      .then((data) => {
        if (cancelado || !data?.rates) return;
        setTasas((prev) => ({ ...prev, ...data.rates }));
        setEnVivo(true);
      })
      .catch(() => setEnVivo(false));
    return () => { cancelado = true; };
  }, []);

  const setCode = (c: string) => {
    setCodeState(c);
    try { localStorage.setItem(LS_KEY, c); } catch { /* sin almacenamiento */ }
  };

  const state = useMemo<CurrencyState>(() => {
    const copPorUsd = tasas.COP ?? TASAS_RESERVA.COP;
    const formatMoney = (cop: number) => {
      if (code === "COP") return `${fmtCOP(Math.round(cop))} $ COP`;
      const porUsd = tasas[code] ?? TASAS_RESERVA[code];
      if (!porUsd) return `${fmtCOP(Math.round(cop))} $ COP`;
      const valor = (cop / copPorUsd) * porUsd;
      try {
        return new Intl.NumberFormat("es", {
          style: "currency",
          currency: code,
          maximumFractionDigits: valor < 100 ? 2 : 0,
          minimumFractionDigits: 0,
        }).format(valor);
      } catch {
        return `${fmtCOP(Math.round(valor))} ${code}`;
      }
    };
    return { code, setCode, formatMoney, enVivo };
  }, [code, tasas, enVivo]);

  return <CurrencyContext.Provider value={state}>{children}</CurrencyContext.Provider>;
}

export function useCurrency(): CurrencyState {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency debe usarse dentro de <CurrencyProvider>");
  return ctx;
}

/** Precio convertido a la moneda elegida, con signo opcional (+ / −). */
export function Money({
  v,
  sign,
  className,
}: {
  v: number;
  sign?: "plus" | "minus";
  className?: string;
}) {
  const { formatMoney } = useCurrency();
  const prefix = sign === "plus" ? "+" : sign === "minus" ? "−" : "";
  return (
    <span className={className}>
      {prefix}
      {formatMoney(v)}
    </span>
  );
}
