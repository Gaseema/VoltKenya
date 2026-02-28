import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { createSession } from "@/lib/auth";

// You might want to define the admin email explicitly via ENV, or just hardcode for your persona.
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@voltkenya.io";

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json(
        { error: "Email and code are required" },
        { status: 400 },
      );
    }

    // Validate OTP
    const otpRecord = await prisma.otp.findFirst({
      where: {
        email,
        code,
      },
      orderBy: { createdAt: "desc" },
    });

    if (!otpRecord) {
      return NextResponse.json(
        { error: "Invalid or expired OTP" },
        { status: 400 },
      );
    }

    if (new Date() > otpRecord.expiresAt) {
      return NextResponse.json({ error: "OTP has expired" }, { status: 400 });
    }

    // Determine role (for simple single-persona admin)
    const assignedRole =
      email.toLowerCase() === ADMIN_EMAIL.toLowerCase() ? "ADMIN" : "USER";

    // Upsert User
    const user = await prisma.user.upsert({
      where: { email },
      update: { isVerified: true, role: assignedRole },
      create: {
        email,
        isVerified: true,
        role: assignedRole,
      },
    });

    // Create secure HTTP-only session
    await createSession(user.id, user.role);

    // Cleanup used OTP
    await prisma.otp.deleteMany({
      where: { email },
    });

    return NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("OTP Verify Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
