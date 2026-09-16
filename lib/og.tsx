import { ImageResponse } from 'next/og'
import { getLanding } from './content/source'
import { site } from './site'

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = 'image/png'
export const ogAlt = site.name

const PAPER = '#f6f4ef'
const INK = '#101a16'
const MOSS = '#2f5d4b'
const SUBTLE = '#6b7872'

/** One OG design for the whole site: paper ground, hairline rule, eyebrow, headline, wordmark. */
export function renderOg({ eyebrow, title, footer }: { eyebrow?: string; title: string; footer?: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: PAPER,
          padding: '72px 80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 6, background: MOSS }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div style={{ fontSize: 22, letterSpacing: 10, color: INK, fontWeight: 600 }}>HERE</div>
          <div style={{ fontSize: 20, letterSpacing: 2, color: SUBTLE }}>&amp; More</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {eyebrow ? (
            <div style={{ fontSize: 20, letterSpacing: 5, textTransform: 'uppercase', color: MOSS, marginBottom: 26 }}>
              {eyebrow}
            </div>
          ) : null}
          <div style={{ fontSize: title.length > 52 ? 62 : 78, lineHeight: 1.08, color: INK, letterSpacing: -1.5, maxWidth: 980 }}>
            {title}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', borderTop: `1px solid ${SUBTLE}55`, paddingTop: 26 }}>
          <div style={{ fontSize: 22, color: SUBTLE }}>{footer ?? site.shortDescription}</div>
          <div style={{ fontSize: 22, color: SUBTLE }}>hereandmore.com</div>
        </div>
      </div>
    ),
    ogSize,
  )
}

/** Reads the title straight from the content graph so an OG card can never drift from its page. */
export async function renderOgFromPath(path: string) {
  const page = await getLanding(path)
  return renderOg({ eyebrow: page.eyebrow, title: page.seo.ogImageTitle ?? page.title })
}
