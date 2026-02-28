import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifySession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await verifySession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { bikeId, amount, nationalId, mpesaCode } = body;

    if (!bikeId || !amount || !nationalId || !mpesaCode) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Check if mpesaCode already exists
    const existing = await prisma.transaction.findUnique({
      where: { mpesaCode },
    });

    if (existing) {
      return NextResponse.json(
        { error: "This transaction code has already been used" },
        { status: 400 },
      );
    }

    const transaction = await prisma.transaction.create({
      data: {
        userId: session.userId,
        bikeId,
        amount: parseFloat(amount),
        nationalId,
        mpesaCode,
        status: "PENDING",
      },
    });

    return NextResponse.json(transaction);
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
