// Explicit .js extension: package.json sets "type": "module", and Node's ESM
// resolver in the Vercel runtime will not infer it the way bundlers do.
import { subscribeEmail } from "../lib/subscribe.js";

/**
 * Vercel serverless function backing POST /api/subscribe in production.
 * The local Bun server (server.ts) calls the same subscribeEmail() directly.
 */
export default async function handler(
  req: { method?: string; body?: unknown },
  res: {
    status: (code: number) => { json: (body: unknown) => void };
    setHeader: (name: string, value: string) => void;
  },
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  // Vercel parses JSON bodies automatically, but be tolerant of a raw string.
  let payload: unknown = req.body;
  if (typeof payload === "string") {
    try {
      payload = JSON.parse(payload);
    } catch {
      res.status(400).json({ error: "Expected a JSON body." });
      return;
    }
  }

  const email = (payload as { email?: unknown } | null | undefined)?.email;
  const { status, body } = await subscribeEmail(email);
  res.status(status).json(body);
}
