import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Anakhe'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: '#EBE9E4',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div
                    style={{
                        fontSize: 300,
                        fontFamily: 'Times New Roman, serif',
                        color: '#1A1A1A',
                        lineHeight: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%',
                        paddingBottom: '24px', // slight visual adjustment for serif descenders/ascenders centering if needed
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
