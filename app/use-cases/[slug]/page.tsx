import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/JsonLd'
import { UseCaseTemplate } from '@/components/templates/UseCaseTemplate'
import { getUseCase, getUseCases } from '@/lib/content/source'
import { breadcrumbLd, buildMetadata, faqLd, graph } from '@/lib/seo'

export async function generateStaticParams() {
  const useCases = await getUseCases()
  return useCases.map((useCase) => ({ slug: useCase.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const useCase = await getUseCase(slug)
  if (!useCase) return {}
  return buildMetadata(useCase.seo, useCase.path)
}

export default async function UseCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const useCase = await getUseCase(slug)
  if (!useCase) notFound()

  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Use cases', path: '/use-cases' },
    { name: useCase.audience, path: useCase.path },
  ]

  return (
    <>
      <UseCaseTemplate useCase={useCase} trail={trail} />
      <JsonLd data={graph(breadcrumbLd(trail), faqLd(useCase.faqs ?? []))} />
    </>
  )
}
