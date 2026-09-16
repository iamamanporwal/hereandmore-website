# Deploying

Next.js 16 App Router. Every content route is prerendered; one route (`/api/access`) needs a
Node runtime, so this needs a **Node host, not a static CDN**.

Node **>= 20.9** (pinned in `package.json` and `.nvmrc`).

---

## ⚠️ The one thing that will bite you

**`NEXT_PUBLIC_SITE_URL` is baked in at build time, not read at runtime.**

Verified: a build run without it, then started *with* it, still emitted
`<link rel="canonical" href="https://hereandmore.com">`. Setting it only in the host's runtime
environment silently produces wrong canonicals, a wrong sitemap, wrong OpenGraph URLs and wrong
JSON-LD — on every page, with no error.

Set it as a **build-time** environment variable, then rebuild. On Vercel and Netlify that means
adding it in project settings *before* the first deploy, not after.

Quick check after any deploy:

```bash
curl -s https://YOUR-DOMAIN/ | grep canonical
curl -s https://YOUR-DOMAIN/robots.txt | grep -i host
```

Both must show your real domain.

---

## Host options

| Host | Works | Notes |
|---|---|---|
| **Vercel** | Yes, zero config | Detects Next 16. Set env vars before first build |
| **Netlify** | Yes | Needs the Next runtime plugin |
| **Cloudflare Workers / Pages** | Yes | Use the Next adapter; `/api/access` runs at the edge |
| **Any Node host** (Fly, Render, Railway, a VPS) | Yes | `npm ci && npm run build && npm start`. Put a reverse proxy in front for TLS |
| **Static CDN** (S3, GitHub Pages) | **No** | `/api/access` needs a server. Either drop the form to a third-party endpoint or use a Node host |

### Docker

Not configured. If you need it, set `output: 'standalone'` in `next.config.ts` first — that
emits a minimal server bundle designed for containers.

---

## Environment variables

Build-time (must be present when `npm run build` runs):

| Variable | Required | Effect if unset |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | **Yes** | Canonicals, sitemap, OG and JSON-LD all point at `hereandmore.com` |
| `NEXT_PUBLIC_SAME_AS` | No | `sameAs` omitted from Organization data — correct until you own the profiles |
| `NEXT_PUBLIC_TWITTER_HANDLE` | No | Twitter card handle omitted |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | No | Verification tag omitted |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | No | Verification tag omitted |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` / `_DATASET` | No | Site reads typed content in `/content` |

Runtime only (can be changed without rebuilding):

| Variable | Effect if unset |
|---|---|
| `ACCESS_WEBHOOK_URL` or `RESEND_API_KEY` | Access requests are accepted and logged, and the form tells the person to email instead |
| `ACCESS_TO_EMAIL` / `ACCESS_FROM_EMAIL` | Defaults to the address in `lib/site.ts` |
| `SANITY_API_READ_TOKEN` | Public dataset only |

---

## Deploy checklist

1. `git init`, commit, push to a remote. *(Not done for you — version control is your call.)*
2. Point the host at the repo. Build command `npm run build`, output handled by the adapter.
3. Set `NEXT_PUBLIC_SITE_URL` **before the first build**.
4. Set `ACCESS_WEBHOOK_URL` or `RESEND_API_KEY` so `/demo` delivers.
5. Deploy, then run the canonical check above.
6. Point DNS; confirm HTTPS and that HSTS is being sent (`curl -sI` → `strict-transport-security`).
7. Verify Google Search Console and Bing, add the tokens, rebuild, submit `/sitemap.xml`.
8. Run `npm run audit:all` against the deployed URL — set `AUDIT_BASE=https://YOUR-DOMAIN`.

## Verified in a clean production build

- 25 content routes prerendered; 58 outputs including per-page OG images
- Real `404` status on unknown paths
- All five security headers emitted (CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)
- Redirects working (`/features` → `308` → `/platform`)
- Home page **13.8 KB** gzipped; no images; 60 fps on both artworks
- No secrets in the tree, no stray `console.log`, no TODOs
