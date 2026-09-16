import { getArticles, getAuthor } from '@/lib/content/source'
import { absoluteUrl, site } from '@/lib/site'

export const dynamic = 'force-static'

const escape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export async function GET() {
  const articles = await getArticles()

  const items = articles
    .map((article) => {
      const author = getAuthor(article.authorId)
      return `    <item>
      <title>${escape(article.title)}</title>
      <link>${absoluteUrl(article.path)}</link>
      <guid isPermaLink="true">${absoluteUrl(article.path)}</guid>
      <description>${escape(article.excerpt)}</description>
      <pubDate>${new Date(article.published).toUTCString()}</pubDate>
      <category>${escape(article.topic)}</category>
      <dc:creator>${escape(author.name)}</dc:creator>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escape(site.name)} — writing</title>
    <link>${absoluteUrl('/blog')}</link>
    <description>${escape(site.description)}</description>
    <language>en-GB</language>
    <lastBuildDate>${new Date(articles[0]?.updated ?? Date.now()).toUTCString()}</lastBuildDate>
    <atom:link href="${absoluteUrl('/rss.xml')}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  })
}
