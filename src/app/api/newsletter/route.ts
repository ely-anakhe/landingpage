export const runtime = 'edge';

import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import WelcomeEmail from '@/emails/WelcomeEmail';

const resend = new Resend(process.env.RESEND_API_KEY);
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email || typeof email !== 'string' || !email.includes('@')) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        if (!AUDIENCE_ID) {
            console.error("RESEND_AUDIENCE_ID is not configured");
            return NextResponse.json(
                { error: "Newsletter configuration error" },
                { status: 500 }
            );
        }

        // 1. Add to Audience (The "List")
        const contactResult = await resend.contacts.create({
            email,
            unsubscribed: false,
            audienceId: AUDIENCE_ID,
        });

        console.log("Resend contact response:", JSON.stringify(contactResult, null, 2));

        if (contactResult.error) {
            console.error("Resend API error:", contactResult.error);
            // Handle duplicate email gracefully (409 Conflict)
            // Resend SDK might return error code or we check message
            // Based on previous interaction, 409 might come as an error object.
            // But let's stick to the user's logic which is generally sending email if contact creation works.
            // Actually, if contact exists, we might still want to send welcome email? 
            // Usually we don't send welcome email again if they are already subscribed.
            // But the user said "Send a branded welcome email immediately when a user subscribes".
            // If they are already subscribed, we probably return success but don't re-send email.

            // Let's assume if error, we fail for now, unless it's a known non-fatal error.
            return NextResponse.json(
                { error: contactResult.error.message },
                { status: 500 }
            );
        }

        // 2. Send the Welcome Email (The "Message")
        const { data, error: emailError } = await resend.emails.send({
            from: 'Anakhe <onboarding@resend.dev>', // Update this if/when custom domain is ready
            to: email,
            subject: 'Welcome to the Inner Circle',
            react: WelcomeEmail(),
        });

        if (emailError) {
            console.error('Email Send Error:', emailError);
            // We don't fail the request if the email fails, as the subscription succeeded
        } else {
            console.log('Welcome email sent:', data);
        }

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error: any) {
        console.error("Newsletter subscription error:", error);
        return NextResponse.json(
            { error: "Failed to subscribe" },
            { status: 500 }
        );
    }
}
