import { NextResponse } from "next/server";
import { verifySession, deleteSession } from "@/lib/auth";

export async function GET() {
  const session = await verifySession();

  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user: session });
}

export async function DELETE() {
  await deleteSession();
  return NextResponse.json({ success: true });
}
