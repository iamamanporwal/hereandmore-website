import { getUseCase, getUseCases } from '@/lib/content/source'
import { ogAlt, ogContentType, ogSize, renderOg } from '@/lib/og'

export const alt = ogAlt
export const size = ogSize
export const contentType = ogContentType

export async function generateStaticParams() {
  const useCases = await getUseCases()
  return useCases.map((useCase) => ({ slug: useCase.slug }))
}

export default async function Image({ params }: { params: { slug: string } }) {
  const useCase = await getUseCase(params.slug)
  return renderOg({
    eyebrow: useCase?.audience ?? 'Use case',
    title: useCase?.seo.ogImageTitle ?? useCase?.title ?? 'Use case',
  })
}
