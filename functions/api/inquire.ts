import { Resend } from 'resend'
import * as z from 'zod'

interface Env {
    RESEND_API_KEY: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const { request, env } = context;

    try {
        const formData = await request.formData()

        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const message = formData.get('message') as string
        const pieceContext = formData.get('pieceContext') as string
        const attachment = formData.get('attachment') as File | null

        // Validate basic fields
        if (!name || !email) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (!env.RESEND_API_KEY) {
            return new Response(JSON.stringify({ error: "Configuration error" }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const resend = new Resend(env.RESEND_API_KEY)

        const emailOptions: any = {
            from: 'Anakhe Website <onboarding@resend.dev>',
            to: ['contact@anakhe.com'],
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

        // Check if data contains error (Resend sometimes returns error object in data)
        if (data.error) {
            throw new Error(data.error.message);
        }

        return new Response(JSON.stringify({ success: true, data }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error: any) {
        console.error('Inquiry error:', error)
        return new Response(JSON.stringify({
            error: 'Failed to send inquiry',
            details: error?.message || String(error)
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
