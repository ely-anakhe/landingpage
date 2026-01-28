export const runtime = 'edge';

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
        const formData = await request.formData()

        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const message = formData.get('message') as string
        const pieceContext = formData.get('pieceContext') as string
        const attachment = formData.get('attachment') as File | null

        // Validate basic fields
        if (!name || !email) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        const emailOptions: any = {
            from: 'Anakhe Website <onboarding@resend.dev>',
            to: ['ely@anakhe.com'],
            subject: `New Inquiry from ${name} ${pieceContext ? `regarding ${pieceContext}` : ''}`,
            html: `
        <div>
          <h1>New Inquiry</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Regarding:</strong> ${pieceContext || 'General Inquiry'}</p>
          <p><strong>Message:</strong></p>
          <p>${message || 'No message provided'}</p>
        </div>
      `,
        }

        // Handle attachment if present
        if (attachment && attachment.size > 0) {
            const arrayBuffer = await attachment.arrayBuffer()
            const uint8Array = new Uint8Array(arrayBuffer)
            emailOptions.attachments = [
                {
                    filename: attachment.name,
                    content: uint8Array,
                },
            ]
        }

        const data = await resend.emails.send(emailOptions)

        return NextResponse.json({ success: true, data })
    } catch (error) {
        console.error('Inquiry error:', error)
        return NextResponse.json(
            { error: 'Failed to send inquiry' },
            { status: 500 }
        )
    }
}
