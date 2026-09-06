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

/**
 * La inscripción que las runas significan de verdad.
 * Cada runa del titular adopta su forma de la letra correspondiente de esta
 * frase (runa 1 → "C", runa 2 → "o", runa 3 → "n"…), así que el conjuro que
 * ves en pantalla está deletreando en secreto estas palabras.
 */
export const HIDDEN_SENTENCE =
  "Construyó tú idea con el nivel de detalle de un dios creando un mundo. ...¿Acaso no lo soy?";

export const ANCIENT_MEANING = HIDDEN_SENTENCE;

export const LICUADO_URL = "https://licuado.licuado.workers.dev";

/** Ruta secreta de la mesa de recibos: solo se llega mediante el enlace que viaja en el formulario. */
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

/* ------------------------------------------------------------------ */
/* Monedas del mundo (ISO 4217)                                        */
/* ------------------------------------------------------------------ */

export type Moneda = { code: string; name: string; symbol: string };

/** [código, nombre en español, símbolo] */
const MONEDAS: [string, string, string][] = [
  ["COP", "Peso colombiano", "$"],
  ["USD", "Dólar estadounidense", "$"],
  ["EUR", "Euro", "€"],
  ["MXN", "Peso mexicano", "$"],
  ["ARS", "Peso argentino", "$"],
  ["CLP", "Peso chileno", "$"],
  ["PEN", "Sol peruano", "S/"],
  ["BOB", "Boliviano", "Bs"],
  ["PYG", "Guaraní paraguayo", "₲"],
  ["UYU", "Peso uruguayo", "$U"],
  ["VES", "Bolívar venezolano", "Bs."],
  ["BRL", "Real brasileño", "R$"],
  ["CRC", "Colón costarricense", "₡"],
  ["GTQ", "Quetzal guatemalteco", "Q"],
  ["HNL", "Lempira hondureño", "L"],
  ["NIO", "Córdoba nicaragüense", "C$"],
  ["PAB", "Balboa panameño", "B/."],
  ["SVC", "Colón salvadoreño", "₡"],
  ["DOP", "Peso dominicano", "RD$"],
  ["CUP", "Peso cubano", "$"],
  ["JMD", "Dólar jamaicano", "J$"],
  ["HTG", "Gourde haitiano", "G"],
  ["TTD", "Dólar de Trinidad y Tobago", "TT$"],
  ["BBD", "Dólar de Barbados", "Bds$"],
  ["BSD", "Dólar bahameño", "B$"],
  ["BZD", "Dólar beliceño", "BZ$"],
  ["GYD", "Dólar guyanés", "GY$"],
  ["SRD", "Dólar surinamés", "Sr$"],
  ["AWG", "Florín arubeño", "ƒ"],
  ["ANG", "Florín antillano", "ƒ"],
  ["GBP", "Libra esterlina", "£"],
  ["CHF", "Franco suizo", "Fr"],
  ["SEK", "Corona sueca", "kr"],
  ["NOK", "Corona noruega", "kr"],
  ["DKK", "Corona danesa", "kr"],
  ["ISK", "Corona islandesa", "kr"],
  ["PLN", "Esloti polaco", "zł"],
  ["CZK", "Corona checa", "Kč"],
  ["HUF", "Forinto húngaro", "Ft"],
  ["RON", "Leu rumano", "lei"],
  ["BGN", "Lev búlgaro", "лв"],
  ["RSD", "Dinar serbio", "din"],
  ["BAM", "Marco convertible bosnio", "KM"],
  ["MKD", "Denar macedonio", "ден"],
  ["ALL", "Lek albanés", "L"],
  ["MDL", "Leu moldavo", "L"],
  ["UAH", "Grivna ucraniana", "₴"],
  ["BYN", "Rublo bielorruso", "Br"],
  ["RUB", "Rublo ruso", "₽"],
  ["GEL", "Lari georgiano", "₾"],
  ["AMD", "Dram armenio", "֏"],
  ["AZN", "Manat azerbaiyano", "₼"],
  ["KZT", "Tenge kazajo", "₸"],
  ["UZS", "Som uzbeko", "so'm"],
  ["KGS", "Som kirguís", "сом"],
  ["TJS", "Somoni tayiko", "SM"],
  ["TMT", "Manat turcomano", "T"],
  ["TRY", "Lira turca", "₺"],
  ["ILS", "Nuevo séquel israelí", "₪"],
  ["JOD", "Dinar jordano", "JD"],
  ["LBP", "Libra libanesa", "LL"],
  ["SYP", "Libra siria", "£S"],
  ["IQD", "Dinar iraquí", "ع.د"],
  ["IRR", "Rial iraní", "﷼"],
  ["YER", "Rial yemení", "﷼"],
  ["AFN", "Afgani afgano", "؋"],
  ["PKR", "Rupia pakistaní", "₨"],
  ["INR", "Rupia india", "₹"],
  ["NPR", "Rupia nepalí", "₨"],
  ["LKR", "Rupia esrilanquesa", "Rs"],
  ["BDT", "Taka bangladesí", "৳"],
  ["MVR", "Rufiya maldiva", "Rf"],
  ["MMK", "Kiat birmano", "K"],
  ["THB", "Baht tailandés", "฿"],
  ["KHR", "Riel camboyano", "៛"],
  ["LAK", "Kip laosiano", "₭"],
  ["VND", "Dong vietnamita", "₫"],
  ["MYR", "Ringgit malayo", "RM"],
  ["SGD", "Dólar singapurense", "S$"],
  ["BND", "Dólar bruneano", "B$"],
  ["IDR", "Rupia indonesia", "Rp"],
  ["PHP", "Peso filipino", "₱"],
  ["JPY", "Yen japonés", "¥"],
  ["CNY", "Yuan chino", "¥"],
  ["HKD", "Dólar hongkonés", "HK$"],
  ["MOP", "Pataca de Macao", "MOP$"],
  ["TWD", "Nuevo dólar taiwanés", "NT$"],
  ["KRW", "Won surcoreano", "₩"],
  ["KPW", "Won norcoreano", "₩"],
  ["MNT", "Tugrik mongol", "₮"],
  ["SAR", "Rial saudí", "﷼"],
  ["AED", "Dírham emiratí", "د.إ"],
  ["QAR", "Rial catarí", "﷼"],
  ["KWD", "Dinar kuwaití", "KD"],
  ["BHD", "Dinar bareiní", "BD"],
  ["OMR", "Rial omaní", "﷼"],
  ["EGP", "Libra egipcia", "E£"],
  ["LYD", "Dinar libio", "LD"],
  ["TND", "Dinar tunecino", "DT"],
  ["DZD", "Dinar argelino", "DA"],
  ["MAD", "Dírham marroquí", "DH"],
  ["MRU", "Uguiya mauritana", "UM"],
  ["SDG", "Libra sudanesa", "SDG"],
  ["SSP", "Libra sursudanesa", "SS£"],
  ["ETB", "Birr etíope", "Br"],
  ["ERN", "Nakfa eritreo", "Nfk"],
  ["DJF", "Franco yibutiano", "Fdj"],
  ["SOS", "Chelín somalí", "Sh.So"],
  ["KES", "Chelín keniano", "KSh"],
  ["UGX", "Chelín ugandés", "USh"],
  ["TZS", "Chelín tanzano", "TSh"],
  ["RWF", "Franco ruandés", "FRw"],
  ["BIF", "Franco burundés", "FBu"],
  ["CDF", "Franco congoleño", "FC"],
  ["NGN", "Naira nigeriana", "₦"],
  ["GHS", "Cedi ghanés", "₵"],
  ["XOF", "Franco CFA (UEMOA)", "CFA"],
  ["XAF", "Franco CFA (CEMAC)", "FCFA"],
  ["GNF", "Franco guineano", "FG"],
  ["SLE", "Leone sierraleonés", "Le"],
  ["LRD", "Dólar liberiano", "L$"],
  ["GMD", "Dalasi gambiano", "D"],
  ["CVE", "Escudo caboverdiano", "$"],
  ["STN", "Dobra santotomense", "Db"],
  ["AOA", "Kwanza angoleño", "Kz"],
  ["MZN", "Metical mozambiqueño", "MT"],
  ["MWK", "Kwacha malauí", "MK"],
  ["ZMW", "Kwacha zambiano", "ZK"],
  ["ZWG", "Oro zimbabuense", "ZiG"],
  ["BWP", "Pula botsuano", "P"],
  ["NAD", "Dólar namibio", "N$"],
  ["ZAR", "Rand sudafricano", "R"],
  ["LSL", "Loti lesotense", "L"],
  ["SZL", "Lilangeni esuatiniense", "E"],
  ["MUR", "Rupia mauriciana", "₨"],
  ["SCR", "Rupia seychellense", "₨"],
  ["MGA", "Ariary malgache", "Ar"],
  ["KMF", "Franco comorense", "CF"],
  ["AUD", "Dólar australiano", "A$"],
  ["NZD", "Dólar neozelandés", "NZ$"],
  ["FJD", "Dólar fiyiano", "FJ$"],
  ["PGK", "Kina papú", "K"],
  ["WST", "Tala samoano", "WS$"],
  ["TOP", "Paʻanga tongano", "T$"],
  ["VUV", "Vatu vanuatuense", "VT"],
  ["SBD", "Dólar salomonense", "SI$"],
  ["XPF", "Franco CFP", "₣"],
  ["CAD", "Dólar canadiense", "C$"],
  ["BMD", "Dólar bermudeño", "BD$"],
  ["KYD", "Dólar caimanés", "CI$"],
  ["FKP", "Libra malvinense", "FK£"],
  ["GIP", "Libra gibraltareña", "£"],
  ["SHP", "Libra de Santa Elena", "£"],
];

export const MONEDA_LISTA: Moneda[] = MONEDAS.map(([code, name, symbol]) => ({ code, name, symbol }));

/** Tasas aproximadas por 1 USD — respaldo si no hay conexión con el servicio de tasas. */
export const TASAS_RESERVA: Record<string, number> = {
  USD: 1, COP: 3950, EUR: 0.92, MXN: 20.3, ARS: 1500, CLP: 980, PEN: 3.75, BOB: 6.9, PYG: 7800, UYU: 40,
  VES: 100, BRL: 5.9, CRC: 510, GTQ: 7.7, HNL: 25.5, NIO: 36.8, PAB: 1, SVC: 8.75, DOP: 61, CUP: 24,
  JMD: 157, HTG: 131, TTD: 6.8, BBD: 2, BSD: 1, BZD: 2, GYD: 209, SRD: 35, AWG: 1.79, ANG: 1.79,
  GBP: 0.79, CHF: 0.88, SEK: 10.9, NOK: 11.2, DKK: 6.9, ISK: 140, PLN: 4.0, CZK: 23.5, HUF: 385, RON: 4.6,
  BGN: 1.8, RSD: 117, BAM: 1.8, MKD: 56.5, ALL: 93, MDL: 17.8, UAH: 41.5, BYN: 3.3, RUB: 95, GEL: 2.7,
  AMD: 395, AZN: 1.7, KZT: 505, UZS: 12900, KGS: 87, TJS: 10.9, TMT: 3.5, TRY: 41, ILS: 3.6, JOD: 0.71,
  LBP: 89500, SYP: 13000, IQD: 1310, IRR: 830000, YER: 250, AFN: 70, PKR: 278, INR: 86, NPR: 138, LKR: 300,
  BDT: 122, MVR: 15.4, MMK: 2100, THB: 34.5, KHR: 4050, LAK: 21800, VND: 25800, MYR: 4.4, SGD: 1.35,
  BND: 1.35, IDR: 16200, PHP: 58.5, JPY: 155, CNY: 7.25, HKD: 7.78, MOP: 8.01, TWD: 32.5, KRW: 1420,
  KPW: 900, MNT: 3500, SAR: 3.75, AED: 3.67, QAR: 3.64, KWD: 0.308, BHD: 0.376, OMR: 0.385, EGP: 49.5,
  LYD: 4.9, TND: 3.15, DZD: 134, MAD: 10.1, MRU: 40, SDG: 600, SSP: 130, ETB: 125, ERN: 15, DJF: 178,
  SOS: 571, KES: 129, UGX: 3700, TZS: 2600, RWF: 1380, BIF: 3000, CDF: 2850, NGN: 1550, GHS: 16, XOF: 603,
  XAF: 603, GNF: 8600, SLE: 23, LRD: 190, GMD: 70, CVE: 100, STN: 22.5, AOA: 920, MZN: 64, MWK: 1735,
  ZMW: 28, ZWG: 26, BWP: 13.7, NAD: 18.5, ZAR: 18.5, LSL: 18.5, SZL: 18.5, MUR: 46, SCR: 14, MGA: 4700,
  KMF: 452, AUD: 1.55, NZD: 1.72, FJD: 2.27, PGK: 4.05, WST: 2.85, TOP: 2.4, VUV: 120, SBD: 8.3, XPF: 110,
  CAD: 1.42, BMD: 1, KYD: 0.83, FKP: 0.79, GIP: 0.79, SHP: 0.79,
};

/* ------------------------------------------------------------------ */
/* Portafolio: mundos ya forjados                                      */
/* ------------------------------------------------------------------ */

export type Obra = {
  nombre: string;
  dominio: string;
  url: string;
  desc: string;
  img: string;
  tono: "gold" | "mint" | "ember";
};

/** Añade aquí cada web terminada y aparecerá como tarjeta cuadrada clicable. */
export const PORTAFOLIO: Obra[] = [
  {
    nombre: "LICUADO",
    dominio: "licuado.licuado.workers.dev",
    url: "https://licuado.licuado.workers.dev",
    desc: "¡La web de mi estudio de videojuegos!",
    img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjtCporqiLlQ39TGwXp3jm6CvXyVZosqKPhI7WRshUEq32shEr31llLvlmwbu4jVuBMf03uunYIjzXKp9Uhgt1T-dbEwB8JznIpto8NRwILcn9gzbw5jIhPHY63UG3ZHP_tlaVhytiD4xjP3MlxmhBHCjS06Jckcx3TbYWdUl-8SKy8R-xYrEKmrnadHAo/s1600/Captura%20de%20pantalla%20(21).png",
    tono: "gold",
  },
  {
    nombre: "Kronos",
    dominio: "kronostl.netlify.app",
    url: "https://kronostl.netlify.app",
    desc: "Un editor visual para hacer líneas temporales con bifurcaciones, muy útil si estas escribiendo una historia que puede variar dependiendo de una desición.",
    img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjTjHRp3YUYTiVxDB6yNZAvqEMrv5Ht-hyUTMqCfG7KQJ3HC5oyCtiloE_qo-fDGSXSwMVr5hjVyNXlbn05sIHN99SiacpWBljHzJgrs-22T0vLYXdoWnWou0DRF5m32pOJaL7Mc4lN4n7u2F22Q_p4APGVTz3Ei0fpwCHIk6D5diKD4xzZVLE1mnI5GTY/s1600/Captura%20de%20pantalla%20(25).png",
    tono: "mint",
  },
  {
    nombre: "Teia",
    dominio: "teia-licuado.netlify.app",
    url: "https://teia-licuado.netlify.app/",
    desc: "Un panel visual donde puedes subir una carpeta de archivos y te devolverá una vista previa, muy útil.",
    img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh1HTjLrLjwRquEIVZ7e4xCYlRn-zPMM84niIgAAu9A9SmGkv00ggMFSOsIhARQKK0EbdxTl-jqu92HlXKAHIEBjUk7F8VTIXSwhP8yb5NXK03KNfzWXitfPAMia3DcrMBWZg67HPFYs3RoFKg71Cj_3iJhqCyFPRPwNdJHSmanLq4x4GaEutWzBye84Kw/s1600/Captura%20de%20pantalla%20(23).png",
    tono: "ember",
  },
];

/* ------------------------------------------------------------------ */
/* Ilustraciones de la casa                                            */
/* ------------------------------------------------------------------ */

export type Ilustracion = { src: string; titulo: string };

export const ILUSTRACIONES: Ilustracion[] = [
  {
    src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgq8xIVIeLa27j0NOcCwHdrSuB4m-Exed2ZdKwvyxWfndYiOPk5L_0_4wnPERG69GNvXfPTomYeUExKsO4ENHIywdjdxw-4GbMPwlssVLzdjvWDISJLc4p_F3GmTo-o9CQGJQ5rQD4UoYoBF4tQQhC-qkwhssg1PwrxDKoZElB_2Ux6188txkWphUe45VA/s1600/EPSON002.JPG",
    titulo: "Tinta y trazo · lámina I",
  },
  {
    src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhVEkN5pcGWKN2bCONVfqykht_E2uKyD9ldv6nOLErbFNVjDEoUpRW4ew9rOY9IiNer8BDfXqb9FZzJczjPCVRoYh8w4XI6ZbmRqRGtXvP7Xds9Cp5s0af98aezkLw-2HXFjPVaaPFUZdFY_eQxCy1nntPSsYxjcl9uQhmaw_KZ7MZ0rUsFQN5hKeJKlR8/s1600/si.png",
    titulo: "Tinta y trazo · lámina II",
  },
  {
    src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi3I7qjXeBTziyGW7c_4YjHbvlTQvt6_DqST71l3LTYImjxfi7LkKb_f9bTI0DJ_T7aRC2ld39X5L2GL-oIcGj9d7eLvsEgOequ5mqlfpfLCSpBxls9VfnViwBxByWHLF-rxu0wdJM81rO_d4dbpEsgdtMLSpZQ_5f8Vvgbr41taFywwZrLLFZ2-915FjA/s16000/L%C3%BAmen%20Ecos%20bajo%20la%20corteza%20+%20logotipo%20de%20LICUADO.png",
    titulo: "Lúmen Ecos bajo la corteza",
  },
];
