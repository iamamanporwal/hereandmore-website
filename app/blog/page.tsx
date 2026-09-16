import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { CtaBand } from '@/components/Cta'
import { JsonLd } from '@/components/JsonLd'
import { getArticles, getAuthor } from '@/lib/content/source'
import { formatDate } from '@/lib/date'
import { breadcrumbLd, buildMetadata, graph } from '@/lib/seo'
import { absoluteUrl, site } from '@/lib/site'

const PATH = '/blog'
const trail = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path: PATH },
]

export const metadata: Metadata = buildMetadata(
  {
    title: 'Writing — HERE & More',
    description:
      'Definitions, principles and practice: what a social layer is, why we refuse vanity scores, and how to run a project you can still explain a year later.',
    primaryKeyword: 'HERE & More blog',
    ogImageTitle: 'Writing',
  },
  PATH,
)

export default async function BlogIndex() {
  const articles = await getArticles()

  return (
    <>
      <div className="container">
        <Breadcrumbs trail={trail} />
        <div style={{ paddingBlock: 'clamp(2rem, 5vw, 3.5rem) var(--space-xl)' }}>
          <p className="eyebrow">Writing</p>
          <h1 style={{ fontSize: 'var(--step-5)', maxWidth: '15ch' }}>Thinking out loud, in public</h1>
          <p className="answer" style={{ marginTop: 'var(--space-m)' }}>
            Short essays on the problem we are working on: what a social layer is, why progress should be measured against
            an aim rather than a score, and the six habits that make a project explainable a year after it ends.
          </p>
          <p className="subtle" style={{ marginTop: 'var(--space-m)' }}>
            <a href="/rss.xml">RSS feed</a> · {articles.length} posts
          </p>
        </div>

        <div className="post-list">
          {articles.map((article) => {
            const author = getAuthor(article.authorId)
            return (
              <Link className="post-item" href={article.path} key={article.slug}>
                <span className="article-meta">
                  <span className="tag">{article.topic}</span>
                  <time dateTime={article.published}>
                    {formatDate(article.published)}
                  </time>
                  <span className="dot">{article.readingMinutes} min</span>
                </span>
                <h2>{article.title}</h2>
                <p>{article.excerpt}</p>
                <span className="subtle">{author.name}</span>
              </Link>
            )
          })}
        </div>
      </div>

      <CtaBand
        cta={{
          title: 'Read the product instead',
          text: 'If the ideas hold up, the place to test them is on one real project of your own.',
          primary: { label: 'Request access', href: '/demo' },
          secondary: { label: 'See the platform', href: '/platform' },
        }}
      />
      <JsonLd
        data={graph(breadcrumbLd(trail), {
          '@type': 'Blog',
          '@id': `${absoluteUrl(PATH)}#blog`,
          name: `${site.name} — writing`,
          url: absoluteUrl(PATH),
          publisher: { '@id': `${absoluteUrl('/')}#organization` },
          blogPost: articles.map((a) => ({
            '@type': 'BlogPosting',
            headline: a.title,
            url: absoluteUrl(a.path),
            datePublished: a.published,
            description: a.excerpt,
          })),
        })}
      />
    </>
  )
}
