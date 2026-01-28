import * as dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

// Load environment variables *before* importing Sanity client
dotenv.config({ path: '.env.local' })

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://anakhe.com'

async function generateSitemap() {
    console.log('Generating sitemap...')
    // Dynamic import to satisfy import hoisting rules
    const { defineQuery } = await import('next-sanity')
    const { client } = await import('../src/sanity/lib/client')

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
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
    }))

    const projectRoutes = projects.map((project: { slug: string; _updatedAt: string }) => ({
        url: `${BASE_URL}/interiors/${project.slug}`,
        lastModified: new Date(project._updatedAt),
        changeFrequency: 'monthly',
        priority: 0.6,
    }))

    const pieceRoutes = pieces.map((piece: { slug: string; _updatedAt: string }) => ({
        url: `${BASE_URL}/atelier/${piece.slug}`,
        lastModified: new Date(piece._updatedAt),
        changeFrequency: 'weekly',
        priority: 0.7,
    }))

    const allRoutes = [...staticRoutes, ...projectRoutes, ...pieceRoutes]

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes
            .map((route) => {
                return `
    <url>
      <loc>${route.url}</loc>
      <lastmod>${route.lastModified.toISOString()}</lastmod>
      <changefreq>${route.changeFrequency}</changefreq>
      <priority>${route.priority}</priority>
    </url>
  `
            })
            .join('')}
</urlset>`

    // Write to public directory
    const publicDir = path.join(process.cwd(), 'public')
    // Ensure public dir exists
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir)
    }

    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap)
    console.log('Sitemap generated successfully!')
}

generateSitemap().catch(console.error)
