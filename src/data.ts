/* ------------------------------------------------------------------ */
/* Runas de Creatorius — cada glifo está dibujado como trazos SVG      */
/* (polilíneas dentro de un lienzo de 20 × 30)                        */
/* ------------------------------------------------------------------ */

export const RUNE_STROKES: Record<string, string[]> = {
  a: ["4,2 4,28", "4,5 15,13", "4,13 15,21"],
  f: ["5,2 5,28", "5,5 15,11", "5,12 15,18"],
  "þ": ["5,2 5,28", "5,6 14,11 5,16"],
  k: ["5,2 5,28", "15,4 5,14 15,24"],
  z: ["10,4 10,27", "10,10 4,3", "10,10 16,3"],
  w: ["3,3 7,27 10,10 13,27 17,3"],
  j: ["4,3 16,3", "10,3 10,15", "4,15 16,15", "4,15 16,27", "16,15 4,27"],
  x: ["3,3 17,27", "17,3 3,27", "10,2 10,28"],
  á: ["4,8 4,28", "4,11 15,18", "4,18 15,24", "8,4 14,2"],
  b: ["5,2 5,28", "5,3 14,8 5,13", "5,15 14,20 5,25"],
  c: ["15,3 5,15 15,27"],
  d: ["3,3 3,27", "17,3 17,27", "3,3 17,27", "17,3 3,27"],
  e: ["4,2 4,28", "16,2 16,28", "4,7 16,15", "16,7 4,15"],
  g: ["3,5 17,25", "17,5 3,25"],
  h: ["4,2 4,28", "16,2 16,28", "4,10 16,18", "4,18 16,10"],
  i: ["10,3 10,27"],
  l: ["6,2 6,28", "6,3 16,12"],
  m: ["4,3 4,27", "16,3 16,27", "4,3 16,15", "16,3 4,15"],
  n: ["10,2 10,28", "4,11 16,19"],
  o: ["10,2 17,10 10,18 3,10 10,2", "6,14 3,27", "14,14 17,27"],
  p: ["5,2 5,28", "5,4 15,9 5,14", "5,14 15,19 5,24"],
  q: ["10,3 17,11 10,19 3,11 10,3", "13,15 18,27"],
  r: ["5,2 5,28", "5,3 15,9 5,14", "5,14 15,28"],
  s: ["14,2 6,12 14,18 6,28"],
  t: ["10,3 10,27", "10,3 4,9", "10,3 16,9"],
  u: ["4,28 4,2 16,10 16,28"],
  v: ["4,2 10,28 16,2"],
  y: ["4,2 10,12 16,2", "10,12 10,28"],
  "¿": ["14,27 6,27 6,21 11,21 11,11", "11,6 11,4"],
  "?": ["6,3 14,3 14,9 9,9 9,19", "9,24 9,26"],
  ".": ["8.5,24 11.5,24 11.5,27 8.5,27 8.5,24"],
};

const DEFAULT_RUNE = ["10,3 17,15 10,27 3,15 10,3", "10,9 10,21"];

export function runeFor(ch: string): string[] {
  const key = ch.toLowerCase();
  return RUNE_STROKES[key] ?? DEFAULT_RUNE;
}

/* ------------------------------------------------------------------ */
/* Textos sagrados                                                     */
/* ------------------------------------------------------------------ */

export const HEADLINE_LINES = [
  "¿Tienes una idea?",
  "Hábla conmigo",
  "y será real",
  "antes de lo que esperas.",
];

export const ANCIENT_MEANING =
  "Creo tu idea con el detalle de un dios creando un mundo. ...¿Acaso no lo soy?";

export const LICUADO_URL = "https://licuado.licuado.workers.dev";

/** Ruta secreta de la mesa de recibos: solo se llega mediante el enlace que viaja en el correo. */
export const RECIBO_HASH = "sello-x9q42";

export const LICUADORO_PHOTO =
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjbwhRnXPvUxggOGE4t5RFCC0CLWuAj7shFk4dxvgB0PHMjSg5dw-lVElDkyEGh0gN6PiFT_uDTPxnYS-j9gJcmmlmBR8FM9ohUgXRA4gHWcPNejaHUk9W3LW440ZMsBOFVS2LBsIpms5YmdnPIEUpG0YI8-EsoKxyay7XrckorCDjCbztBfDW0o3eHAss/s1600/1000068010.png";

export const LICUADO_LOGO =
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEig4A61ubaXudlMBf9SCPqveobOArRzeOSa6fRRhyphenhyphenC5XGYQ5hrRTpgGwaHqF1v6BjcV1SgqI4llf1S_Q5cODBbVJfAHlURs1FQpQPRkrU8RypzgS6K6FYtFFBnuDsMYHyyrFS9oMAQMGxhWrCxkSXY55QcUuvsEnsQ5BIj-YY4pxMm6bboNtuGZNgaoa9M/s1600/1000068819.png";

export const CARD_PARAGRAPH =
  "Soy por ahora, el único miembro de LICUADO, un estudio de videojuegos con más ambición que personal, y esa frase es literal. La cosa es que necesito fondos para hacer despegar este proyecto, ya que mi cuenta bancaria en este momento en que escribo esto está literalmente en 0. Pero no pienso esperar, ni dejar que esta llama se apague, así que por eso te ofrezco este servicio, en el que por dinero te hago una web como tú la quieras, con alta calidad y todo eso.";

export const POEM = `Describe tu proyecto,
yo lo formo sin pretextos,
si me lo pides,
redactaré los textos,
ilustraré los elementos,
y tu idea será real en poco tiempo.

Estoy abierto a negociar los precios,
pero ten en cuenta que se hace el trabajo con esfuerzo,
y es el sustento de un sueño,
y de un estudio de videojuegos
que germina como un azafrán entre el asfalto,
como tu idea entre mis manos y el teclado.`;

/* ------------------------------------------------------------------ */
/* Runas flotantes del fondo (configuración determinista)              */
/* ------------------------------------------------------------------ */

export type Floater = {
  ch: string;
  top: string;
  left: string;
  size: number;
  dur: number;
  del: number;
  dx: number;
  dy: number;
  rot: number;
  tone: "gold" | "mint";
  opacity: number;
};

export const FLOATERS: Floater[] = [
  { ch: "f", top: "12%", left: "6%", size: 34, dur: 15, del: 0, dx: 14, dy: -30, rot: -8, tone: "gold", opacity: 0.1 },
  { ch: "u", top: "26%", left: "44%", size: 22, dur: 12, del: 1.2, dx: -12, dy: -22, rot: 12, tone: "mint", opacity: 0.08 },
  { ch: "þ", top: "64%", left: "8%", size: 28, dur: 17, del: 0.6, dx: 18, dy: -26, rot: 6, tone: "mint", opacity: 0.07 },
  { ch: "k", top: "80%", left: "30%", size: 40, dur: 19, del: 2, dx: -16, dy: -34, rot: -14, tone: "gold", opacity: 0.09 },
  { ch: "s", top: "10%", left: "70%", size: 30, dur: 14, del: 0.3, dx: 12, dy: -24, rot: 10, tone: "gold", opacity: 0.09 },
  { ch: "z", top: "38%", left: "90%", size: 24, dur: 16, del: 1.8, dx: -14, dy: -20, rot: -6, tone: "mint", opacity: 0.08 },
  { ch: "o", top: "72%", left: "66%", size: 36, dur: 18, del: 0.9, dx: 16, dy: -30, rot: 8, tone: "gold", opacity: 0.08 },
  { ch: "t", top: "88%", left: "86%", size: 26, dur: 13, del: 2.4, dx: -10, dy: -26, rot: 15, tone: "mint", opacity: 0.07 },
  { ch: "m", top: "6%", left: "32%", size: 20, dur: 11, del: 1.5, dx: 10, dy: -18, rot: -10, tone: "mint", opacity: 0.06 },
  { ch: "d", top: "50%", left: "52%", size: 26, dur: 20, del: 0.2, dx: -18, dy: -28, rot: 4, tone: "gold", opacity: 0.07 },
  { ch: "n", top: "58%", left: "24%", size: 20, dur: 15, del: 2.8, dx: 12, dy: -20, rot: -12, tone: "gold", opacity: 0.06 },
  { ch: "e", top: "32%", left: "78%", size: 18, dur: 12, del: 0.7, dx: -8, dy: -22, rot: 9, tone: "gold", opacity: 0.07 },
  { ch: "q", top: "92%", left: "12%", size: 22, dur: 16, del: 1.1, dx: 14, dy: -24, rot: -5, tone: "mint", opacity: 0.07 },
  { ch: "r", top: "18%", left: "94%", size: 32, dur: 21, del: 0.4, dx: -12, dy: -30, rot: 7, tone: "gold", opacity: 0.08 },
];

export const MARQUEE_ITEMS = [
  "CREO TU IDEA",
  "WEB POR ENCARGO",
  "CREATORIUS",
  "ALTA CALIDAD",
  "PRECIO A NEGOCIAR",
  "TEXTOS E ILUSTRACIÓN",
  "ENTREGA CON ALMA",
];
