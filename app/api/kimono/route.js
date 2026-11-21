// Fotoğraftaki kişinin yüzünü/kimliğini/pozunu koruyarak sadece kıyafetini değiştirir.
// OpenRouter üzerinden google/gemini-2.5-flash-image kullanır.
export const runtime = 'nodejs';
export const maxDuration = 60;

const MODEL = process.env.OPENROUTER_IMAGE_MODEL || 'google/gemini-2.5-flash-image';

const DEFAULT_PROMPT =
  'Keep her face, identity and pose exactly the same. Only change her outfit to a traditional Japanese kimono with an obi. Keep the Kyoto background and lighting.';

// Yüzün değişmemesi için modele her istekte eklenen kesin kurallar
const GUARD =
  'STRICT RULES: This is an image EDIT, not a new image. Preserve the person\'s face pixel-for-pixel: same facial features, ' +
  'face shape, eyes, nose, lips, skin tone, expression, makeup, hairstyle and hair color. Do not beautify, retouch, ' +
  'age, slim or re-render the face. Keep the same body pose, hands, camera angle, framing, composition, background and ' +
  'lighting. Change ONLY the clothing. Output a single photorealistic image at the same aspect ratio.';

export async function POST(req) {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) return Response.json({ error: 'OPENROUTER_API_KEY tanımlı değil (Vercel → Settings → Environment Variables).' }, { status: 500 });

  const pass = process.env.KIMONO_PASSWORD;
  if (pass && req.headers.get('x-kimono-password') !== pass) {
    return Response.json({ error: 'Şifre hatalı.' }, { status: 401 });
  }

  let body;
  try { body = await req.json(); } catch { return Response.json({ error: 'Geçersiz istek.' }, { status: 400 }); }
  const image = body?.image;
  if (typeof image !== 'string' || !/^data:image\/(png|jpe?g|webp);base64,/.test(image)) {
    return Response.json({ error: 'Fotoğraf eksik veya desteklenmeyen format.' }, { status: 400 });
  }
  const userPrompt = (typeof body.prompt === 'string' && body.prompt.trim()) ? body.prompt.trim().slice(0, 1500) : DEFAULT_PROMPT;

  const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://oludeniztours.vercel.app',
      'X-Title': 'Kimono Editor',
    },
    body: JSON.stringify({
      model: MODEL,
      modalities: ['image', 'text'],
      messages: [{
        role: 'user',
        content: [
          { type: 'image_url', image_url: { url: image } },
          { type: 'text', text: `${userPrompt}\n\n${GUARD}` },
        ],
      }],
    }),
  });

  const data = await r.json().catch(() => null);
  if (!r.ok) {
    return Response.json({ error: data?.error?.message || `OpenRouter hatası (${r.status})` }, { status: 502 });
  }
  const msg = data?.choices?.[0]?.message;
  const out = msg?.images?.[0]?.image_url?.url;
  if (!out) {
    return Response.json({ error: 'Model görsel döndürmedi. ' + (typeof msg?.content === 'string' ? msg.content.slice(0, 300) : '') }, { status: 502 });
  }
  return Response.json({ image: out });
}
