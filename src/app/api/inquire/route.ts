import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import * as z from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

const formSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    message: z.string().optional(),
    pieceContext: z.string().optional(),
})

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, email, message, pieceContext } = formSchema.parse(body)

        const data = await resend.emails.send({
            from: 'Anakhe Website <onboarding@resend.dev>',
            to: ['jordan@anakhe.com'],
            subject: `New Inquiry from ${name} ${pieceContext ? `regarding ${pieceContext}` : ''}`,
            html: `
        <div>
          <h1>New Inquiry</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Regarding:</strong> ${pieceContext || 'General Inquiry'}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `,
        })

        return NextResponse.json({ success: true, data })
    } catch (error) {
        console.error('Inquiry error:', error)
        return NextResponse.json(
            { error: 'Failed to send inquiry' },
            { status: 500 }
        )
    }
}
