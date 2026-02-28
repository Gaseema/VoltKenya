import nodemailer from "nodemailer";

// Create a reusable transporter using Brevo (Sendinblue) SMTP
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.BREVO_USER || "your-brevo-email", // Replace in .env
    pass: process.env.BREVO_KEY || "your-brevo-smtp-key", // Replace in .env
  },
});

export async function sendOtpEmail(to: string, code: string) {
  // If no API key is configured, log beautifully for local dev testing
  if (!process.env.BREVO_KEY) {
    console.log(`\n\n[DEV MODE] 📧 Fake sending OTP to ${to} ...`);
    console.log(`[DEV MODE] 🔑 Your OTP Code is: ${code}\n\n`);
    return true;
  }

  try {
    const info = await transporter.sendMail({
      from: '"VoltKenya Auth" <no-reply@voltkenya.io>', // Best to use the verified sender in Brevo
      to: to,
      subject: "Your VoltKenya Login Code",
      text: `Your login code is: ${code}. It expires in 10 minutes.`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; text-align: center;">
          <h2>VoltKenya Login</h2>
          <p>Please use the following 6-digit code to log in to your account. This code expires in 10 minutes.</p>
          <div style="margin: 30px auto; padding: 15px; background: #f4f4f4; border-radius: 8px; font-size: 24px; font-weight: bold; letter-spacing: 5px; width: fit-content;">
            ${code}
          </div>
          <p style="color: #666; font-size: 12px;">If you didn't request this email, you can safely ignore it.</p>
        </div>
      `,
    });
    console.log("Message sent: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}
