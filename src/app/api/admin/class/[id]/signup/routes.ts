import { NextResponse, NextRequest } from "next/server";
import { getSession } from '@/lib/get-session';
import { unauthorized } from 'next/navigation';
import { createRosterEntry, deleteRosterEntriesByUserAndClass } from "@/lib/prisma/rosterItem";
import { getUserById } from "@/lib/prisma/user";
import { sendNotificationEmail } from "@/helpers/email/notification";

export async function POST(request: NextRequest) {
    const session = await getSession();
    const user = session?.user;

    if (!user) unauthorized();

    try {
        const { id } = await request.json();
        if (!id) {
            return NextResponse.json(
                { error: "Class ID is required" },
                { status: 400 },
            );
        }
         const existingUser = await getUserById(user.id);
        if (!existingUser) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 },
            );
        }
        await createRosterEntry({ user: { connect: { id: existingUser.id } }, classTermRosterId: id });

        await sendNotificationEmail([existingUser.id], "Class Signup Confirmation", `You have successfully signed up for the class with ID: ${id}.`);
        return NextResponse.json({ message: `Successfully signed up for class with ID: ${id}` });
    } catch (error) {
        return NextResponse.json(
            { error: `Internal Server Error: ${error instanceof Error ? error.message : "An unexpected error occurred"}` },
            { status: 500 },
        );
    }
}

export async function DELETE(request: NextRequest) {
    const session = await getSession();
    const user = session?.user;

    if (!user) unauthorized();

    try{
        const { id } = await request.json();
        if (!id) {
            return NextResponse.json(
                { error: "Class ID is required" },
                { status: 400 },
            );
        }
        const existingUser = await getUserById(user.id);
        if (!existingUser) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 },
            );
        }
        await deleteRosterEntriesByUserAndClass(user.id, id);

        return NextResponse.json({ message: `Successfully removed from class with ID: ${id}` });
    } catch (error) {
        return NextResponse.json(
            { error: `Internal Server Error: ${error instanceof Error ? error.message : "An unexpected error occurred"}` },
            { status: 500 },
        );
    }
}