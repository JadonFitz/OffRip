/**
 * Newsletter signup logic, shared by the local Hono server (server.ts) and the
 * Vercel serverless function (api/subscribe.ts) so the behaviour can't drift
 * between environments.
 *
 * Requires two env vars:
 *   BEEHIIV_API_KEY          beehiiv dashboard, Settings > API
 *   BEEHIIV_PUBLICATION_ID   same page, formatted "pub_<uuid>"
 *
 * Until both are set this returns 503 rather than a fake success, since a
 * signup that silently vanishes is worse than a visible error.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const NOT_CONFIGURED = "Signups aren't live yet. Check back shortly.";
const UNAVAILABLE = "We couldn't add you right now. Please try again in a moment.";

export type SubscribeResult = {
  status: 200 | 400 | 502 | 503;
  body: { ok: true } | { error: string };
};

export async function subscribeEmail(email: unknown): Promise<SubscribeResult> {
  if (typeof email !== "string" || !EMAIL.test(email.trim())) {
    return {
      status: 400,
      body: { error: "That doesn't look like a valid email address." },
    };
  }

  const key = process.env.BEEHIIV_API_KEY;
  const pubId = process.env.BEEHIIV_PUBLICATION_ID;
  if (!key || !pubId) {
    console.warn("[subscribe] BEEHIIV_API_KEY / BEEHIIV_PUBLICATION_ID not set");
    return { status: 503, body: { error: NOT_CONFIGURED } };
  }

  try {
    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${pubId}/subscriptions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          // Someone re-subscribing should just work rather than error out.
          reactivate_existing: true,
          send_welcome_email: true,
          utm_source: "offripmovie.com",
        }),
      },
    );

    if (res.ok) return { status: 200, body: { ok: true } };

    console.error("[subscribe] beehiiv responded", res.status, await res.text());
    return { status: 502, body: { error: UNAVAILABLE } };
  } catch (err) {
    console.error("[subscribe] beehiiv request failed", err);
    return { status: 502, body: { error: UNAVAILABLE } };
  }
}
