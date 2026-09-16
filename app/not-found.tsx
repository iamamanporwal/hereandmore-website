import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <div className="container" style={{ paddingBlock: 'var(--space-2xl)' }}>
      <p className="eyebrow">404</p>
      <h1 style={{ fontSize: 'var(--step-5)', maxWidth: '14ch' }}>
        This page has no <span className="accent italic">provenance.</span>
      </h1>
      <p className="lead" style={{ marginTop: 'var(--space-m)' }}>
        Nothing lives at this address. It may have moved, or it may never have existed — and unlike the rest of the site, we
        cannot tell you which.
      </p>
      <div className="btn-row" style={{ marginTop: 'var(--space-l)' }}>
        <Link className="btn btn--primary" href="/">
          Back to the beginning
        </Link>
        <Link className="btn btn--secondary" href="/platform">
          See the platform
        </Link>
      </div>
    </div>
  )
}
