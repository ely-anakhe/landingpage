import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'
export const alt = 'Anakhe by Jordan Anais'
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
                    background: '#f9f9f7',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        fontSize: 140,
                        fontFamily: 'serif',
                        color: '#2a2a2a',
                        letterSpacing: '0.1em',
                        marginBottom: 20,
                    }}
                >
                    AK
                </div>
                <div
                    style={{
                        display: 'flex',
                        fontSize: 24,
                        fontFamily: 'serif',
                        color: '#666',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                    }}
                >
                    Anakhe by Jordan Anais
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
