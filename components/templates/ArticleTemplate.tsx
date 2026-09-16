import Link from 'next/link'
import type { Article, Author, Block } from '@/lib/content/types'
import { formatDate, formatDateShort } from '@/lib/date'
import { BlockContent } from '../blocks/BlockContent'
import { Breadcrumbs, type Crumb } from '../Breadcrumbs'
import { CtaBand } from '../Cta'
import { Faq } from '../Faq'
import { Related } from '../Related'

/**
 * ARTICLE / BLOG TEMPLATE
 * A single <article> with an explicit answer block, a generated table of contents from
 * h2 blocks, dateline with machine-readable <time>, author attribution, and a link up to
 * the pillar the article supports — which is what makes the cluster legible to a crawler.
 */
export function ArticleTemplate({ article, author, trail }: { article: Article; author: Author; trail: Crumb[] }) {
  const headings = article.body.filter((b): b is Extract<Block, { _type: 'heading' }> => b._type === 'heading' && b.level === 2 && Boolean(b.id))

  return (
    <>
      <div className="container">
        <Breadcrumbs trail={trail} />
      </div>

      <article>
        <header className="container" style={{ paddingBlock: 'clamp(2rem, 5vw, 3.5rem) var(--space-l)' }}>
          <p className="eyebrow">{article.eyebrow ?? article.topic}</p>
          <h1 style={{ fontSize: 'var(--step-5)', maxWidth: '20ch' }}>{article.title}</h1>
          <p className="lead" style={{ marginTop: 'var(--space-m)', maxWidth: '52ch' }}>
            {article.excerpt}
          </p>
          <div className="article-meta" style={{ marginTop: 'var(--space-l)' }}>
            <span>{author.name}</span>
            <span className="dot">
              <time dateTime={article.published}>
                {formatDate(article.published)}
              </time>
            </span>
            <span className="dot">{article.readingMinutes} min read</span>
            {article.updated !== article.published ? (
              <span className="dot">
                Updated <time dateTime={article.updated}>{formatDateShort(article.updated)}</time>
              </span>
            ) : null}
          </div>
        </header>

        <div className="container split split--sticky" style={{ paddingBottom: 'var(--space-xl)' }}>
          <aside>
            <p className="answer" style={{ fontSize: 'var(--step-0)' }}>
              {article.answer}
            </p>
            {headings.length > 1 ? (
              <nav className="toc" aria-label="On this page" style={{ marginTop: 'var(--space-l)' }}>
                <p className="eyebrow">On this page</p>
                <ol>
                  {headings.map((heading) => (
                    <li key={heading.id}>
                      <a href={`#${heading.id}`}>{heading.text}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            ) : null}
          </aside>

          <div>
            <BlockContent blocks={article.body} />

            <footer style={{ marginTop: 'var(--space-xl)', paddingTop: 'var(--space-m)', borderTop: '1px solid var(--line)' }}>
              <p className="subtle">
                Written by {author.name}, {author.role}. Part of{' '}
                <Link href={article.pillar.href}>{article.pillar.label}</Link>.
              </p>
            </footer>
          </div>
        </div>
      </article>

      {article.faqs?.length ? (
        <section className="section--tight">
          <div className="container">
            <Faq items={article.faqs} />
          </div>
        </section>
      ) : null}

      <div className="container">
        <Related items={[article.pillar, ...(article.related ?? [])]} />
      </div>

      <CtaBand
        cta={
          article.cta ?? {
            title: 'See it in the product',
            text: 'HERE is in private access. Bring one live project and we will map it into a chapter with you.',
            primary: { label: 'Request access', href: '/demo' },
            secondary: { label: 'Read the platform', href: '/platform' },
          }
        }
      />
    </>
  )
}
