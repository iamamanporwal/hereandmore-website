import Link from 'next/link'
import type { ReactNode } from 'react'

/**
 * A deliberately tiny inline formatter for content strings.
 *
 * Supports: [label](/path)  **bold**  *italic*  `code`
 * Produces React nodes — never HTML strings — so content can never inject markup.
 * When Sanity arrives this is replaced by a Portable Text serialiser with the same output.
 */
const TOKEN = /(\[[^\]]+\]\([^)]+\))|(\*\*[^*]+\*\*)|(\*[^*]+\*)|(`[^`]+`)/g

export function RichText({ text }: { text: string }): ReactNode {
  const nodes: ReactNode[] = []
  let last = 0
  let key = 0

  for (const match of text.matchAll(TOKEN)) {
    const index = match.index ?? 0
    if (index > last) nodes.push(text.slice(last, index))
    const token = match[0]

    if (token.startsWith('[')) {
      const split = token.indexOf('](')
      const label = token.slice(1, split)
      const href = token.slice(split + 2, -1)
      const external = href.startsWith('http') || href.startsWith('mailto:')
      nodes.push(
        external ? (
          <a key={key++} href={href} rel="noopener noreferrer" target={href.startsWith('http') ? '_blank' : undefined}>
            {label}
          </a>
        ) : (
          <Link key={key++} href={href}>
            {label}
          </Link>
        ),
      )
    } else if (token.startsWith('**')) {
      nodes.push(<strong key={key++}>{token.slice(2, -2)}</strong>)
    } else if (token.startsWith('*')) {
      nodes.push(<em key={key++}>{token.slice(1, -1)}</em>)
    } else {
      nodes.push(<code key={key++}>{token.slice(1, -1)}</code>)
    }
    last = index + token.length
  }

  if (last < text.length) nodes.push(text.slice(last))
  return <>{nodes}</>
}
