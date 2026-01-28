import { Studio } from './Studio'

import { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Sanity Studio',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export function generateStaticParams() {
  return [{ tool: [] }]
}

export default function StudioPage() {
  return <Studio />
}
