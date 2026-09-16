# Sanity integration (not yet wired up)

These schemas mirror `lib/content/types.ts` field-for-field. Nothing in the running site
imports them — they exist so the migration is a swap, not a rewrite.

## How to switch the site over

1. `npm i sanity next-sanity @sanity/image-url @portabletext/react`
2. Create the studio, and pass `schemaTypes` from `sanity/schemas` into its config.
3. Add `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` and `SANITY_API_READ_TOKEN`
   to the environment (see `.env.example`).
4. Replace the bodies of the functions in `lib/content/source.ts` with GROQ queries. Keep the
   signatures exactly as they are — they are already async for this reason.
5. Replace `components/blocks/RichText.tsx` with a `@portabletext/react` serialiser that emits
   the same elements. `components/blocks/BlockContent.tsx` already switches on `_type`, which
   is how Portable Text custom blocks arrive.
6. Add a webhook → `revalidateTag` route for on-demand ISR, or keep the build-time fetch and
   rebuild on publish. Either works; the templates do not care.

## What must not change during migration

- `path` stays the canonical route — the sitemap, canonicals and internal links derive from it.
- `answer` stays required and length-validated. It is the block AI systems quote.
- `related` keeps its minimum of two. No page is allowed to be a dead end.
- `comparison.summary.theyWin` keeps its minimum of three. Honest comparisons are the strategy.
