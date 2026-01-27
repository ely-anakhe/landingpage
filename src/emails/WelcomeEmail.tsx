import * as React from 'react';
import {
    Html,
    Head,
    Body,
    Container,
    Text,
    Section,
    Hr,
    Preview,
} from '@react-email/components';

export default function WelcomeEmail() {
    return (
        <Html>
            <Head />
            <Preview>A note from the studio.</Preview>
            <Body style={main}>
                <Container style={container}>
                    {/* Header / Logo Area */}
                    <Section>
                        <Text style={logo}>
                            ANAKHE<br />
                            <span style={{ fontSize: '12px', letterSpacing: '0.3em', display: 'block', marginTop: '8px' }}>
                                BY JORDAN ANAIS
                            </span>
                        </Text>
                    </Section>

                    {/* Title */}
                    <Text style={heading}>A note from the studio.</Text>

                    {/* Body Copy */}
                    <Text style={paragraph}>
                        Welcome to the Anakhe inner circle.
                    </Text>
                    <Text style={paragraph}>
                        I created this newsletter not to flood your inbox, but to offer a rare pause—a moment to discuss architecture, material integrity, and the aesthetics of the spaces we inhabit.
                    </Text>
                    <Text style={paragraph}>
                        You can expect to hear from our team infrequently. We only write when we have something significant to say, whether that is the release of a new collection or a look inside a finished commission.
                    </Text>
                    <Text style={paragraph}>
                        We do not decorate. We build. Thank you for building with us.
                    </Text>

                    <Hr style={hr} />

                    {/* Signature */}
                    <Text style={paragraph}>
                        Warmly,
                    </Text>
                    <Text style={signature}>
                        Jordan Anais
                    </Text>
                    <Text style={title}>
                        Founder, Anakhe Ltd
                    </Text>

                    {/* Footer */}
                    <Section style={footer}>
                        <Text style={footerText}>
                            Anakhe Ltd • London, United Kingdom<br />
                            <a href="https://www.anakhe.com" style={link}>www.anakhe.com</a>
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
}

// Styles
const main = {
    backgroundColor: '#F9F8F6', // Your brand background
    fontFamily: '"Times New Roman", Times, serif',
};

const container = {
    margin: '0 auto',
    padding: '40px 20px',
    maxWidth: '580px',
};

const logo = {
    fontSize: '24px',
    letterSpacing: '0.2em',
    textAlign: 'center' as const,
    marginBottom: '40px',
    color: '#1C1C1C',
};

const heading = {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#1C1C1C',
};

const paragraph = {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#333',
    marginBottom: '20px',
};

const hr = {
    borderColor: '#cccccc',
    margin: '30px 0',
};

const signature = {
    fontSize: '18px',
    fontStyle: 'italic', // Mimicking the handwriting vibe
    color: '#1C1C1C',
};

const title = {
    fontSize: '12px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    color: '#666',
    marginTop: '5px',
};

const footer = {
    marginTop: '40px',
    borderTop: '1px solid #eee',
    paddingTop: '20px',
};

const footerText = {
    fontSize: '12px',
    color: '#999',
    textAlign: 'center' as const,
};

const link = {
    color: '#999',
    textDecoration: 'underline',
};
