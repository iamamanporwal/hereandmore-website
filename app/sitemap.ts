import type { MetadataRoute } from 'next'
import { getAllRoutes } from '@/lib/content/source'
import { absoluteUrl } from '@/lib/site'

/** Generated from the content graph, so a new document cannot be forgotten. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = await getAllRoutes()
  return routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: new Date(route.updated),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
