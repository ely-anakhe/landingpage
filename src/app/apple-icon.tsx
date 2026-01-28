import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
    width: 180,
    height: 180,
}
export const contentType = 'image/png'

export default async function AppleIcon() {
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
                    borderRadius: '22%', // iOS icon rounding
                    background: '#4A3728', // Aubergine/brown brand color
                }}
            >
                <div
                    style={{
                        fontSize: 100,
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
