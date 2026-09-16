import Link from 'next/link'
import { footerNav, site } from '@/lib/site'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link href="/" className="wordmark">
              HERE <span>&amp; More</span>
            </Link>
            <p>{site.shortDescription} Directing a life. Building a world.</p>
          </div>

          {footerNav.map((col) => (
            <nav className="footer__col" key={col.title} aria-label={col.title}>
              <h3>{col.title}</h3>
              <ul>
                {col.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="footer__base">
          <p>
            © {new Date().getFullYear()} {site.name}. Part of {site.parentOrganization}.
          </p>
          <p>
            <Link href="/legal/privacy">Privacy</Link> · <Link href="/legal/terms">Terms</Link> ·{' '}
            <a href={`mailto:${site.email}`}>{site.email}</a> · <Link href="/blog">Blog</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
