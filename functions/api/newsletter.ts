import { Resend } from 'resend';

// Define the shape of our environment variables
interface Env {
    RESEND_API_KEY: string;
    RESEND_AUDIENCE_ID: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const { request, env } = context;

    try {
        const { email } = await request.json() as { email: any };

        if (!email || typeof email !== 'string' || !email.includes('@')) {
            return new Response(JSON.stringify({ error: 'Email is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (!env.RESEND_API_KEY || !env.RESEND_AUDIENCE_ID) {
            console.error("RESEND_API_KEY or RESEND_AUDIENCE_ID is not configured");
            return new Response(JSON.stringify({ error: "Newsletter configuration error" }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const resend = new Resend(env.RESEND_API_KEY);

        // 1. Add to Audience
        const contactResult = await resend.contacts.create({
            email,
            unsubscribed: false,
            audienceId: env.RESEND_AUDIENCE_ID,
        });

        if (contactResult.error) {
            console.error("Resend API error:", contactResult.error);
            return new Response(JSON.stringify({ error: contactResult.error.message }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // 2. Send Welcome Email (Using Raw HTML to avoid bundling React)
        const { data, error: emailError } = await resend.emails.send({
            from: 'Anakhe <onboarding@resend.dev>', // Update this if/when custom domain is ready
            to: email,
            subject: 'Welcome to the Inner Circle',
            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="background-color: #F9F8F6; font-family: 'Times New Roman', Times, serif; margin: 0; padding: 0;">
                <div style="margin: 0 auto; padding: 40px 20px; max-width: 580px;">
                    <!-- Logo -->
                    <div style="font-size: 24px; letter-spacing: 0.2em; text-align: center; margin-bottom: 40px; color: #1C1C1C;">
                        ANAKHE<br />
                        <span style="font-size: 12px; letter-spacing: 0.3em; display: block; margin-top: 8px;">
                            BY JORDAN ANAIS
                        </span>
                    </div>

                    <!-- Title -->
                    <div style="font-size: 20px; font-weight: bold; margin-bottom: 20px; color: #1C1C1C;">
                        A note from the studio.
                    </div>

                    <!-- Body -->
                    <div style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">
                        Welcome to the Anakhe inner circle.
                    </div>
                    <div style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">
                        I created this newsletter not to flood your inbox, but to offer a rare pause—a moment to discuss architecture, material integrity, and the aesthetics of the spaces we inhabit.
                    </div>
                    <div style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">
                        You can expect to hear from our team infrequently. We only write when we have something significant to say, whether that is the release of a new collection or a look inside a finished commission.
                    </div>
                    <div style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">
                        We do not decorate. We build. Thank you for building with us.
                    </div>

                    <hr style="border-color: #cccccc; margin: 30px 0; border-width: 0 0 1px 0; border-style: solid;" />

                    <!-- Signature -->
                    <div style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">
                        Warmly,
                    </div>
                    <div style="font-size: 18px; font-style: italic; color: #1C1C1C;">
                        Jordan Anais
                    </div>
                    <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #666; margin-top: 5px;">
                        Founder, Anakhe Ltd
                    </div>

                    <!-- Footer -->
                    <div style="margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px;">
                        <div style="font-size: 12px; color: #999; text-align: center;">
                            Anakhe Ltd • London, United Kingdom<br />
                            <a href="https://www.anakhe.com" style="color: #999; text-decoration: underline;">www.anakhe.com</a>
                        </div>
                    </div>
                </div>
            </body>
            </html>
            `
        });

        if (emailError) {
            console.error('Email Send Error:', emailError);
            // We don't fail, but log it
        }

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error: any) {
        console.error("Newsletter subscription error:", error);
        return new Response(JSON.stringify({ error: "Failed to subscribe" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
