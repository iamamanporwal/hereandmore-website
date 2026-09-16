import Link from 'next/link'

export type Crumb = { name: string; path: string }

export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  if (trail.length < 2) return null
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {trail.map((crumb, i) => {
          const isLast = i === trail.length - 1
          return (
            <li key={crumb.path}>
              {isLast ? <span aria-current="page">{crumb.name}</span> : <Link href={crumb.path}>{crumb.name}</Link>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
