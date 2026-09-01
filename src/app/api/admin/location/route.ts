import { NextResponse, NextRequest } from "next/server";
import { createLocation, deleteLocation, updateLocation } from "@/lib/prisma/location";

export async function POST(
  request: NextRequest
) {
  try {
    const data = await request.json();

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

export async function DELETE(
  request: NextRequest
) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // Assuming you have a deleteLocation function in your Prisma client
    const deletedLocation = await deleteLocation(id);

    if (!deletedLocation) {
      return NextResponse.json({ error: "Location not found" }, { status: 404 });
    }

    return NextResponse.json(deletedLocation, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal Server Error: ${error instanceof Error ? error.message : "An unexpected error occurred"}` },
      { status: 500 },
    );
  }
};

export async function PUT(
  request: NextRequest
) {
  try {
    const data = await request.json();

    if (!data.id || !data.name || !data.type) {
      return NextResponse.json({ error: "ID, name, and type are required" }, { status: 400 });
    }

    // Assuming you have an updateLocation function in your Prisma client
    const updatedLocation = await updateLocation(data.id, data);

    if (!updatedLocation) {
      return NextResponse.json({ error: "Location not found" }, { status: 404 });
    }

    return NextResponse.json(updatedLocation, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal Server Error: ${error instanceof Error ? error.message : "An unexpected error occurred"}` },
      { status: 500 },
    );
  }
};
