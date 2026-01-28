import { Resend } from 'resend';
import WelcomeEmail from '../../src/emails/WelcomeEmail';

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

        // 2. Send Welcome Email
        const { data, error: emailError } = await resend.emails.send({
            from: 'Anakhe <onboarding@resend.dev>', // Update this if/when custom domain is ready
            to: email,
            subject: 'Welcome to the Inner Circle',
            react: WelcomeEmail(),
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
