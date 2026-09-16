import type { Author } from '@/lib/content/types'

export const authors: Author[] = [
  {
    id: 'aman-porwal',
    name: 'Aman Porwal',
    role: 'Founder, HERE & More',
    url: '/about',
    sameAs: ['https://www.linkedin.com/company/hereandmore'],
  },
  {
    id: 'here-team',
    name: 'The HERE & More team',
    role: 'Product and research',
    url: '/about',
  },
]

export function getAuthor(id: string): Author {
  return authors.find((a) => a.id === id) ?? authors[1]
}
