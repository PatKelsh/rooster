import { NextResponse, NextRequest } from "next/server";
import {
  createClassTermDetail,
  deleteClassTermDetail,
  getClassTermDetailById,
  updateClassTermDetail } from "@/lib/prisma/classTermDetail";
import { ClassInstanceProps } from "@/lib/props";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const classDetailData = await getClassTermDetailById(id);

    if (!classDetailData) {
      return NextResponse.json({ error: "Class detail not found" }, { status: 404 });
    }

    return NextResponse.json(classDetailData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal Server Error: ${error instanceof Error ? error.message : "An unexpected error occurred"}` },
      { status: 500 },
    );
  }
}