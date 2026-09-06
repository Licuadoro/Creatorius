/* ============================================================
   CREATORIUS · REPETIDOR DE PACTOS (Cloudflare Worker)
   ============================================================

   ¿QUÉ ES ESTO?
   Un programita gratuito que vive en tu cuenta de Cloudflare
   (ya tienes una: licuado.licuado.workers.dev). Recibe los
   pactos de la web de Creatorius y los entrega por WhatsApp
   usando el canal que tengas configurado. Las llaves viven
   AQUÍ (seguras), nunca en la página pública.

   CÓMO DESPLEGARLO (5 minutos, sin instalar nada):
   1. Entra en dash.cloudflare.com → Workers y Pages →
      «Crear» → pestaña «Crear Worker» → nombre: creatorius-relay.
   2. Borra el código de ejemplo y pega ESTE archivo entero.
      Pulsa «Implementar». Te dará una URL tipo:
      https://creatorius-relay.TU-USUARIO.workers.dev
   3. En tu Worker: Configuración → Variables y secretos →
      «Variables de entorno» (se añade como SECRETO):

        PACTO_SECRET   → inventa una frase cualquiera, ej.:
                         "azafran-entre-asfalto-42"
                         (la misma se pega en la mesa de recibos)
        ALLOW_ORIGIN   → la URL donde vivirá Creatorius, ej.:
                         "https://creatorius.netlify.app"
                         (así nadie más puede usar tu repetidor)
        DESTINO        → tu número con código de país: 34631427597

      Y EL CANAL QUE QUIERAS (los tres son opcionales,
      se intenta primero el que esté más arriba):

        D360_API_KEY   → tu llave de 360dialog
                         (cuando Meta apruebe tu número)
        TWILIO_SID     → SID de tu cuenta Twilio (ACxxxxxxxx)
        TWILIO_TOKEN   → token de tu cuenta Twilio
        TWILIO_FROM    → el número del sandbox, por defecto
                         whatsapp:+14155238886
        CMB_APIKEY     → tu llave de CallMeBot (cuando responda)

   4. En la mesa de recibos de Creatorius, panel
      «EL REPETIDOR»: pega la URL del Worker y el PACTO_SECRET.
      Pulsa PROBAR → te llega un WhatsApp de prueba. Listo.

   ¿QUÉ CANAL USO HOY?
   → TWILIO (10 min, funciona ya): crea cuenta gratis en
     twilio.com → Messaging → «Try it out» → WhatsApp Sandbox.
     Te muestra un número y un código; desde TU WhatsApp
     envíale «join CODIGO» a ese número. Copia el SID y el
     token del panel derecho y pégalos aquí como secretos.
     Con el crédito de prueba (~15 $) sobra para meses.
   → 360DIALOG: sirve cuando Meta apruebe tu WABA; ten en
     cuenta que WhatsApp exige plantillas aprobadas para
     mensajes iniciados por la empresa.
   → CALLMEBOT: gratis; a veces se satura (espera 24 h).
   ============================================================ */

export default {
  async fetch(request, env) {
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-Pacto-Secret",
    };

    // Preflight CORS
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }
    if (request.method !== "POST") {
      return json({ ok: false, error: "solo se acepta POST" }, 405, cors);
    }

    // ¿Viene de tu web? (si ALLOW_ORIGIN está definido)
    if (env.ALLOW_ORIGIN) {
      const origen = request.headers.get("Origin") || "";
      if (!origen.startsWith(env.ALLOW_ORIGIN)) {
        return json({ ok: false, error: "origen no permitido" }, 403, cors);
      }
    }

    // Secreto compartido contra abusos
    const secreto = request.headers.get("X-Pacto-Secret") || "";
    if (!env.PACTO_SECRET || secreto !== env.PACTO_SECRET) {
      return json({ ok: false, error: "secreto incorrecto" }, 403, cors);
    }

    let body = {};
    try {
      body = await request.json();
    } catch {
      return json({ ok: false, error: "cuerpo inválido" }, 400, cors);
    }

    const texto = String(body.text || "");
    if (!texto) return json({ ok: false, error: "falta el texto" }, 400, cors);

    let destino = String(body.to || env.DESTINO || "34631427597").replace(/[^\d+]/g, "");
    if (!destino.startsWith("+")) destino = `+${destino}`;

    /* --- CANAL 1: 360dialog (oficial, cuando esté aprobado) --- */
    if (env.D360_API_KEY) {
      const res = await fetch("https://waba.360dialog.io/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "D360-API-KEY": env.D360_API_KEY,
          Authorization: `Bearer ${env.D360_API_KEY}`,
        },
        body: JSON.stringify({
          to: destino.replace("+", ""),
          type: "text",
          text: { body: texto },
        }),
      });
      const data = await res.json().catch(() => ({}));
      return json({ ok: res.ok, canal: "360dialog", detalle: data }, res.ok ? 200 : 502, cors);
    }

    /* --- CANAL 2: Twilio (sandbox o cuenta pagada) --- */
    if (env.TWILIO_SID && env.TWILIO_TOKEN) {
      const desde = env.TWILIO_FROM || "whatsapp:+14155238886";
      const res = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${env.TWILIO_SID}/Messages.json`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${btoa(`${env.TWILIO_SID}:${env.TWILIO_TOKEN}`)}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            From: desde.startsWith("whatsapp:") ? desde : `whatsapp:${desde}`,
            To: `whatsapp:${destino}`,
            Body: texto,
          }).toString(),
        }
      );
      const data = await res.json().catch(() => ({}));
      return json({ ok: res.ok, canal: "twilio", detalle: data }, res.ok ? 200 : 502, cors);
    }

    /* --- CANAL 3: CallMeBot (gratis) --- */
    if (env.CMB_APIKEY) {
      const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(
        destino
      )}&text=${encodeURIComponent(texto)}&apikey=${encodeURIComponent(env.CMB_APIKEY)}`;
      const res = await fetch(url);
      const cuerpo = await res.text().catch(() => "");
      return json({ ok: res.ok, canal: "callmebot", detalle: cuerpo.slice(0, 200) }, 200, cors);
    }

    return json({ ok: false, error: "ningún canal configurado en el Worker" }, 500, cors);
  },
};

function json(objeto, status, headers) {
  return new Response(JSON.stringify(objeto), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}
