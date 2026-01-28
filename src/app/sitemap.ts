export const runtime = 'edge';

import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { defineQuery } from 'next-sanity'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://anakhe.com'

export const dynamic = 'force-dynamic'

const SITEMAP_QUERY = defineQuery(`{
  "projects": *[_type == "project"] {
    "slug": slug.current,
    _updatedAt
  },
  "pieces": *[_type == "piece"] {
    "slug": slug.current,
    _updatedAt
  }
}`)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { projects, pieces } = await client.fetch(SITEMAP_QUERY)

  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/interiors',
    '/atelier',
    '/materials',
    '/common-questions',
    '/press',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const projectRoutes = projects.map((project: { slug: string; _updatedAt: string }) => ({
    url: `${BASE_URL}/interiors/${project.slug}`,
    lastModified: new Date(project._updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const pieceRoutes = pieces.map((piece: { slug: string; _updatedAt: string }) => ({
    url: `${BASE_URL}/atelier/${piece.slug}`,
    lastModified: new Date(piece._updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...projectRoutes, ...pieceRoutes]
}
