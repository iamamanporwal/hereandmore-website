/**
 * Emits one JSON-LD script per page. The payload is serialised server-side and
 * escaped so a closing tag inside content can never break out of the script element.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c')
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
