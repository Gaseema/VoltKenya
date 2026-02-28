import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { sendOtpEmail } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Generate a 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    // Expires in 10 minutes
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Delete any existing OTPs for this email to prevent spam/confusion
    await prisma.otp.deleteMany({
      where: { email },
    });

    // Save strictly one active OTP per email
    await prisma.otp.create({
      data: {
        email,
        code,
        expiresAt,
      },
    });

    // Dispatch email
    const sent = await sendOtpEmail(email, code);

    if (!sent) {
      return NextResponse.json(
        { error: "Failed to send OTP email" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("OTP Send Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
