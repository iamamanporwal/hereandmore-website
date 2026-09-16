'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { primaryNav, site } from '@/lib/site'
import { Arrow } from './Icon'

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isCurrent = (href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`))

  return (
    <header className="site-header" data-scrolled={scrolled}>
      <div className="container site-header__inner">
        <Link href="/" className="wordmark" aria-label={`${site.name} home`}>
          HERE <span>&amp; More</span>
        </Link>

        <nav className="nav" aria-label="Primary">
          {primaryNav.map((item) => (
            <div className="nav__item" key={item.href}>
              <Link className="nav__link" href={item.href} aria-current={isCurrent(item.href) ? 'page' : undefined}>
                {item.label}
                {item.children ? (
                  <svg width="9" height="9" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
                    <path d="M2 4l3 3 3-3" strokeLinecap="round" />
                  </svg>
                ) : null}
              </Link>
              {item.children ? (
                <div className="nav__panel">
                  {item.children.map((child) => (
                    <Link key={child.href} href={child.href}>
                      <strong>{child.label}</strong>
                      {child.description ? <span>{child.description}</span> : null}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </nav>

        <div className="header-actions">
          <Link className="btn btn--secondary" href="/faq">
            FAQ
          </Link>
          <Link className="btn btn--primary" href="/demo">
            Request access <Arrow />
          </Link>

          <details className="mobile-nav">
            <summary aria-label="Open menu">
              <svg width="17" height="11" viewBox="0 0 17 11" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                <path d="M0 1h17M0 5.5h17M0 10h17" strokeLinecap="round" />
              </svg>
            </summary>
            <div className="mobile-nav__panel">
              {primaryNav.map((item) => (
                <div key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                  {item.children?.map((child) => (
                    <Link key={child.href} href={child.href} style={{ paddingLeft: '1rem', color: 'var(--fg-muted)' }}>
                      {child.label}
                    </Link>
                  ))}
                </div>
              ))}
              <p className="eyebrow">Company</p>
              <Link href="/about">About</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/demo">Request access</Link>
            </div>
          </details>
        </div>
      </div>
    </header>
  )
}
