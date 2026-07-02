import { NextResponse } from "next/server";
import { getAllLocations } from "@/lib/prisma/location";

export async function GET() {
  try {
    const locations = await getAllLocations();

    return NextResponse.json(locations, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal Server Error: ${error instanceof Error ? error.message : "An unexpected error occurred"}` },
      { status: 500 },
    );
  }
};