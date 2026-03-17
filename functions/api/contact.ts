import { Resend } from 'resend'

interface Env {
    RESEND_API_KEY: string;
}

interface ContactBody {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const { request, env } = context;

    try {
        const body = await request.json() as ContactBody;

        const { firstName, lastName, email, subject, message } = body;

        if (!firstName || !lastName || !email || !subject || !message) {
            return new Response(JSON.stringify({ error: "All fields are required" }), {
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

        const resend = new Resend(env.RESEND_API_KEY);

        const fullName = `${firstName} ${lastName}`;

        const data = await resend.emails.send({
            from: 'Anakhe Studio <studio@anakhe.com>',
            to: ['contact@anakhe.com'],
            replyTo: email,
            subject: `Contact: ${subject} — from ${fullName}`,
            html: `
        <div style="font-family: 'Times New Roman', Times, serif; max-width: 580px; margin: 0 auto; padding: 40px 20px;">
          <div style="font-size: 24px; letter-spacing: 0.2em; text-align: center; margin-bottom: 40px; color: #1C1C1C;">
            ANAKHE<br />
            <span style="font-size: 12px; letter-spacing: 0.3em; display: block; margin-top: 8px;">
              CONTACT FORM
            </span>
          </div>

          <div style="border-top: 1px solid #eee; padding-top: 24px;">
            <p style="margin: 0 0 16px;"><strong>Name:</strong> ${fullName}</p>
            <p style="margin: 0 0 16px;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 0 0 16px;"><strong>Subject:</strong> ${subject}</p>
          </div>

          <div style="border-top: 1px solid #eee; padding-top: 24px; margin-top: 24px;">
            <p style="margin: 0 0 8px;"><strong>Message:</strong></p>
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
        });

        if (data.error) {
            throw new Error(data.error.message);
        }

        return new Response(JSON.stringify({ success: true, data }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error: any) {
        console.error('Contact form error:', error);
        return new Response(JSON.stringify({
            error: 'Failed to send message',
            details: error?.message || String(error)
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
