'use client'

export default function sanityImageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
    const prj = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

    // If it's already a full URL, we might need to parse it to add params
    // But usually src is passed from sanity image builder url()
    // If str starts with https://cdn.sanity.io, we can append params

    if (src.includes('cdn.sanity.io')) {
        const url = new URL(src)
        url.searchParams.set('w', width.toString())
        if (quality) {
            url.searchParams.set('q', quality.toString())
        }
        url.searchParams.set('auto', 'format')
        return url.href
    }

    return src
}
