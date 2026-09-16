import { getArticle, getArticles, getAuthor } from '@/lib/content/source'
import { ogAlt, ogContentType, ogSize, renderOg } from '@/lib/og'

export const alt = ogAlt
export const size = ogSize
export const contentType = ogContentType

export async function generateStaticParams() {
  const articles = await getArticles()
  return articles.map((article) => ({ slug: article.slug }))
}

export default async function Image({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug)
  return renderOg({
    eyebrow: article?.topic ?? 'Writing',
    title: article?.seo.ogImageTitle ?? article?.title ?? 'Writing',
    footer: article ? `${getAuthor(article.authorId).name} · ${article.readingMinutes} min read` : undefined,
  })
}
