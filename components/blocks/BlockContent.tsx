import type { Block } from '@/lib/content/types'
import { RichText } from './RichText'

/** Walks the Block[] content contract. One case per `_type`; unknown types are skipped, never crash a page. */
export function BlockContent({ blocks, className = 'prose' }: { blocks: Block[]; className?: string }) {
  if (!blocks.length) return null
  return (
    <div className={className}>
      {blocks.map((block, i) => (
        <BlockNode key={i} block={block} />
      ))}
    </div>
  )
}

function BlockNode({ block }: { block: Block }) {
  switch (block._type) {
    case 'heading': {
      const Tag = `h${block.level}` as 'h2' | 'h3' | 'h4'
      return <Tag id={block.id}>{block.text}</Tag>
    }

    case 'paragraph':
      return (
        <p className={block.lead ? 'is-lead' : undefined}>
          <RichText text={block.text} />
        </p>
      )

    case 'list':
      return block.style === 'number' ? (
        <ol>
          {block.items.map((item, i) => (
            <li key={i}>
              <RichText text={item} />
            </li>
          ))}
        </ol>
      ) : (
        <ul>
          {block.items.map((item, i) => (
            <li key={i}>
              <RichText text={item} />
            </li>
          ))}
        </ul>
      )

    case 'quote':
      return (
        <blockquote>
          <p>{block.text}</p>
          {block.attribution ? <cite>{block.attribution}</cite> : null}
        </blockquote>
      )

    case 'table':
      return (
        <div className="table-wrap">
          <table>
            {block.caption ? <caption>{block.caption}</caption> : null}
            <thead>
              <tr>
                {block.columns.map((col) => (
                  <th key={col} scope="col">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) =>
                    j === 0 ? (
                      <th key={j} scope="row">
                        <RichText text={cell} />
                      </th>
                    ) : (
                      <td key={j}>
                        <RichText text={cell} />
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    case 'definitionList':
      return (
        <dl>
          {block.items.map((item, i) => (
            <div key={i}>
              <dt>{item.term}</dt>
              <dd>
                <RichText text={item.definition} />
              </dd>
            </div>
          ))}
        </dl>
      )

    case 'callout':
      return (
        <aside className={`callout callout--${block.tone}`}>
          {block.title ? <p className="callout__title">{block.title}</p> : null}
          <p>
            <RichText text={block.text} />
          </p>
        </aside>
      )

    case 'steps':
      return (
        <ol className="steps" style={{ listStyle: 'none', padding: 0 }}>
          {block.items.map((item, i) => (
            <li className="step" key={i}>
              <div>
                <h3>{item.title}</h3>
                <p>
                  <RichText text={item.text} />
                </p>
              </div>
            </li>
          ))}
        </ol>
      )

    case 'code':
      return (
        <pre>
          <code>{block.code}</code>
        </pre>
      )

    case 'figure':
      return (
        <figure className="figure">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={block.src} alt={block.alt} width={block.width} height={block.height} loading="lazy" decoding="async" />
          {block.caption ? <figcaption>{block.caption}</figcaption> : null}
        </figure>
      )

    default:
      return null
  }
}
