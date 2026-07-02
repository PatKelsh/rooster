import { NextResponse, NextRequest } from "next/server";
import { createLocation } from "@/lib/prisma/location";

export async function POST(
  request: NextRequest
) {
  try {
    const data = await request.json();
    console.log("Received data:", data);

    if (!data.name || !data.type) {
      return NextResponse.json({ error: "Name and type are required" }, { status: 400 });
    }

    const newLocation = await createLocation(data);

    return NextResponse.json(newLocation, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal Server Error: ${error instanceof Error ? error.message : "An unexpected error occurred"}` },
      { status: 500 },
    );
  }
};
