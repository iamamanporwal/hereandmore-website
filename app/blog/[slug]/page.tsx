import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/JsonLd'
import { ArticleTemplate } from '@/components/templates/ArticleTemplate'
import { getArticle, getArticles, getAuthor } from '@/lib/content/source'
import { articleLd, breadcrumbLd, buildMetadata, faqLd, graph } from '@/lib/seo'

export async function generateStaticParams() {
  const articles = await getArticles()
  return articles.map((article) => ({ slug: article.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) return {}

  return buildMetadata(article.seo, article.path, {
    openGraph: {
      type: 'article',
      publishedTime: article.published,
      modifiedTime: article.updated,
      authors: [getAuthor(article.authorId).name],
      tags: [article.topic],
      title: article.seo.title,
      description: article.seo.description,
      url: article.path,
    },
  })
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) notFound()

  const author = getAuthor(article.authorId)
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: article.title, path: article.path },
  ]

  return (
    <>
      <ArticleTemplate article={article} author={author} trail={trail} />
      <JsonLd data={graph(breadcrumbLd(trail), articleLd(article, author.name), faqLd(article.faqs ?? []))} />
    </>
  )
}
