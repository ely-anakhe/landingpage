import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
    width: 32,
    height: 32,
}
export const contentType = 'image/png'

export default async function Icon() {
    // For edge runtime, we'll generate a simple branded icon
    // using the same style as the opengraph image
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#4A3728', // Aubergine/brown brand color
                }}
            >
                <div
                    style={{
                        fontSize: 18,
                        fontFamily: 'Times New Roman, serif',
                        color: '#EBE9E4', // Paper color
                        lineHeight: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    AK
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
