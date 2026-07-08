import { NextResponse, NextRequest } from "next/server";
import { createTerm, deleteTerm, getTermById, updateTermById } from "@/lib/prisma/term";

export async function DELETE(
  request: NextRequest
) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await deleteTerm(id);

    return NextResponse.json({ message: "Term deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal Server Error: ${error instanceof Error ? error.message : "An unexpected error occurred"}` },
      { status: 500 },
    );
  }
}

export async function POST(
  request: NextRequest
) {
  try {
    const data = await request.json();
    const { weeks } = data;

    if (typeof weeks === "string") {
      data.weeks = parseInt(weeks, 10);
    }

    if (!data) {
      return NextResponse.json({ error: "Data is required" }, { status: 400 });
    }

    const createdTerm = await createTerm(data);

    return NextResponse.json(createdTerm, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal Server Error: ${error instanceof Error ? error.message : "An unexpected error occurred"}` },
      { status: 500 },
    );
  }
};

export async function GET(
  request: NextRequest
) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // Here you would typically fetch the term based on the provided ID
    // For demonstration, let's assume we have a function `getTermById`
    const term = await getTermById(id);

    if (!term) {
      return NextResponse.json({ error: "Term not found" }, { status: 404 });
    }

    return NextResponse.json(term, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal Server Error: ${error instanceof Error ? error.message : "An unexpected error occurred"}` },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest
) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const data = await request.json();
    const { weeks } = data;

    if (typeof weeks === "string") {
      data.weeks = parseInt(weeks, 10);
    }

    const updatedTerm = await updateTermById(id, data);

    if (!updatedTerm) {
      return NextResponse.json({ error: "Term not found or update failed" }, { status: 404 });
    }

    return NextResponse.json(updatedTerm, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal Server Error: ${error instanceof Error ? error.message : "An unexpected error occurred"}` },
      { status: 500 },
    );
  }
};