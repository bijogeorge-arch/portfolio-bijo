import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
    try {
        // ── Guard: ensure environment variables are set ─────
        const apiKey = process.env.RESEND_API_KEY;
        const recipientEmail = process.env.MY_EMAIL_ADDRESS;

        if (!apiKey) {
            console.error("[Contact API] RESEND_API_KEY is not configured.");
            return NextResponse.json(
                { error: "Email service is not configured. Please contact the site owner." },
                { status: 500 }
            );
        }

        if (!recipientEmail) {
            console.error("[Contact API] MY_EMAIL_ADDRESS is not configured.");
            return NextResponse.json(
                { error: "Email service is not configured. Please contact the site owner." },
                { status: 500 }
            );
        }

        const resend = new Resend(apiKey);

        const body = await request.json();
        const { name, email, message } = body as {
            name?: string;
            email?: string;
            message?: string;
        };

        // ── Validation ─────────────────────────────────────
        if (!name?.trim() || !email?.trim() || !message?.trim()) {
            return NextResponse.json(
                { error: "Name, email, and message are required." },
                { status: 400 }
            );
        }

        // ── Send email via Resend ──────────────────────────
        const { data, error } = await resend.emails.send({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: recipientEmail,
            replyTo: email.trim(),
            subject: `Portfolio Inquiry from ${name.trim()}`,
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
                    <h2 style="color: #1a1a1a; border-bottom: 2px solid #6c63ff; padding-bottom: 12px; margin-bottom: 20px;">
                        📩 New Portfolio Message
                    </h2>
                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                        <tr>
                            <td style="padding: 8px 12px; font-weight: 600; color: #555; width: 80px; vertical-align: top;">From</td>
                            <td style="padding: 8px 12px; color: #1a1a1a;">${name.trim()}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 12px; font-weight: 600; color: #555; vertical-align: top;">Email</td>
                            <td style="padding: 8px 12px;">
                                <a href="mailto:${email.trim()}" style="color: #6c63ff; text-decoration: none;">${email.trim()}</a>
                            </td>
                        </tr>
                    </table>
                    <div style="background: #f8f9fa; border-left: 4px solid #6c63ff; padding: 16px 20px; border-radius: 0 8px 8px 0; margin-bottom: 20px;">
                        <p style="margin: 0 0 8px 0; font-weight: 600; color: #555; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">
                            Message
                        </p>
                        <p style="margin: 0; color: #1a1a1a; line-height: 1.6; white-space: pre-wrap;">${message.trim()}</p>
                    </div>
                    <p style="font-size: 12px; color: #999; margin-top: 24px; border-top: 1px solid #eee; padding-top: 12px;">
                        Sent via your portfolio contact form. You can reply directly to this email to respond to ${name.trim()}.
                    </p>
                </div>
            `,
        });

        if (error) {
            console.error("[Contact API] Resend error:", error);
            return NextResponse.json(
                { error: "Failed to send email. Please try again later." },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: true, messageId: data?.id },
            { status: 200 }
        );
    } catch (err) {
        console.error("[Contact API] Unexpected error:", err);
        return NextResponse.json(
            { error: "An unexpected error occurred." },
            { status: 500 }
        );
    }
}
