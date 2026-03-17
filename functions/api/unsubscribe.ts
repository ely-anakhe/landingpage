import { Resend } from 'resend';

interface Env {
    RESEND_API_KEY: string;
    RESEND_AUDIENCE_ID: string;
}

// Handle GET requests (user clicks the link in email)
export const onRequestGet: PagesFunction<Env> = async (context) => {
    const { request, env } = context;

    const url = new URL(request.url);
    const email = url.searchParams.get('email');

    if (!email) {
        return new Response(unsubscribePage('Missing email address.', false), {
            status: 400,
            headers: { 'Content-Type': 'text/html; charset=utf-8' },
        });
    }

    if (!env.RESEND_API_KEY || !env.RESEND_AUDIENCE_ID) {
        return new Response(unsubscribePage('Configuration error. Please contact us directly.', false), {
            status: 500,
            headers: { 'Content-Type': 'text/html; charset=utf-8' },
        });
    }

    try {
        const resend = new Resend(env.RESEND_API_KEY);

        // Mark contact as unsubscribed in Resend
        await resend.contacts.remove({
            email,
            audienceId: env.RESEND_AUDIENCE_ID,
        });

        return new Response(unsubscribePage('You have been successfully unsubscribed.', true), {
            status: 200,
            headers: { 'Content-Type': 'text/html; charset=utf-8' },
        });
    } catch (error: any) {
        console.error('Unsubscribe error:', error);
        return new Response(unsubscribePage('Something went wrong. Please email contact@anakhe.com to unsubscribe.', false), {
            status: 500,
            headers: { 'Content-Type': 'text/html; charset=utf-8' },
        });
    }
};

// Also handle POST for RFC 8058 one-click unsubscribe (email clients)
export const onRequestPost: PagesFunction<Env> = async (context) => {
    const { request, env } = context;

    try {
        const formData = await request.formData();
        const email = formData.get('email') as string;

        if (!email || !env.RESEND_API_KEY || !env.RESEND_AUDIENCE_ID) {
            return new Response('Bad request', { status: 400 });
        }

        const resend = new Resend(env.RESEND_API_KEY);

        await resend.contacts.remove({
            email,
            audienceId: env.RESEND_AUDIENCE_ID,
        });

        return new Response('Unsubscribed', { status: 200 });
    } catch (error: any) {
        console.error('One-click unsubscribe error:', error);
        return new Response('Error', { status: 500 });
    }
};

// Branded unsubscribe confirmation page
function unsubscribePage(message: string, success: boolean): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Unsubscribe | Anakhe</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Times New Roman', Times, serif;
            background-color: #F9F8F6;
            color: #1C1C1C;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            text-align: center;
            max-width: 480px;
        }
        .logo {
            font-size: 24px;
            letter-spacing: 0.2em;
            margin-bottom: 48px;
        }
        .logo span {
            font-size: 12px;
            letter-spacing: 0.3em;
            display: block;
            margin-top: 8px;
        }
        .icon {
            font-size: 48px;
            margin-bottom: 24px;
        }
        .message {
            font-size: 18px;
            line-height: 1.6;
            color: #555;
            margin-bottom: 32px;
        }
        .home-link {
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.2em;
            color: #999;
            text-decoration: none;
            border-bottom: 1px solid #ccc;
            padding-bottom: 2px;
            transition: color 0.3s, border-color 0.3s;
        }
        .home-link:hover {
            color: #1C1C1C;
            border-color: #1C1C1C;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">
            ANAKHE
            <span>BY JORDAN ANAIS</span>
        </div>
        <div class="icon">${success ? '✓' : '⚠'}</div>
        <p class="message">${message}</p>
        <a href="https://www.anakhe.com" class="home-link">Return to Anakhe</a>
    </div>
</body>
</html>`;
}
