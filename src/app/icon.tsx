import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

// Use Node.js runtime to access the filesystem
export const runtime = 'nodejs'

export const size = {
    width: 32,
    height: 32,
}
export const contentType = 'image/png'

export default async function Icon() {
    // Read the image file from the public directory
    const filePath = join(process.cwd(), 'public/anakhe-icon-aubergine.jpg')
    const fileBuffer = await readFile(filePath)
    const imageSrc = `data:image/jpeg;base64,${fileBuffer.toString('base64')}`

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    background: 'transparent',
                }}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={imageSrc}
                    alt="Anakhe Favicon"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            </div>
        ),
        {
            ...size,
        }
    )
}
