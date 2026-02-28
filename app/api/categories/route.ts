import { NextResponse } from "next/server";

export async function GET() {
  const categories = [
    { id: "cruiser", name: "Cruiser" },
    { id: "delivery", name: "Delivery" },
    { id: "utility", name: "Utility" },
    { id: "sport", name: "Sport" },
  ];
  return NextResponse.json(categories);
}
