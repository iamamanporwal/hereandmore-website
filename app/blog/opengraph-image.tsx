import { ogAlt, ogContentType, ogSize, renderOg } from '@/lib/og'

export const alt = ogAlt
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOg({ eyebrow: 'Writing', title: 'Thinking out loud, in public' })
}
