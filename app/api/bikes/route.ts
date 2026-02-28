import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifySession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await verifySession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const data = await req.json();
    // Data validation could be added here

    const newBike = await prisma.bike.create({
      data: {
        name: data.name,
        price: parseFloat(data.price),
        deposit: parseFloat(data.deposit),
        range: data.range,
        topSpeed: data.topSpeed,
        images: JSON.stringify(data.images), // Array of strings converted to JSON string
        description: data.description,
        chargeTime: data.chargeTime,
      },
    });

    return NextResponse.json({ success: true, bike: newBike });
  } catch (error) {
    console.error("Add Bike Error:", error);
    return NextResponse.json({ error: "Failed to add bike" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const bikes = await prisma.bike.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Parse the JSON string back to array before returning
    const parsedBikes = bikes.map((bike: any) => ({
      ...bike,
      images: JSON.parse(bike.images),
    }));

    return NextResponse.json(parsedBikes);
  } catch (error) {
    console.error("Fetch Bikes Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch bikes" },
      { status: 500 },
    );
  }
}
