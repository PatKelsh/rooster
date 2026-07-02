import db from "@/lib/prisma";
import { RosterItem, Prisma } from "@client";

// Create a new roster entry in the database
export const createRosterEntry = async (data: Prisma.RosterItemCreateInput): Promise<RosterItem> => {
  return await db.rosterItem.create({
    data,
  });
};

// Get a list of all roster entries
export const getAllRosterEntries = async (): Promise<RosterItem[]> => {
  return await db.rosterItem.findMany();
};

// Get roster entry by a specified roster entry id
export const getRosterEntryById = async (id: string): Promise<RosterItem | null> => {
  return await db.rosterItem.findUnique({
    where: { id },
  });
};

//Get roster entries by a specified user id
export const getRosterEntriesByUserId = async (userId: string): Promise<RosterItem[]> => {
  return await db.rosterItem.findMany({
    where: { userId },
  });
};

// Update info for a single roster entry based on a roster entry id. The roster entry id will remain the same but all other fields may be changed
export const updateRosterEntryById = async (rosterEntryId: string, data: Prisma.RosterItemUpdateInput): Promise<RosterItem> => {
  return await db.rosterItem.update({
    where: {
      id: rosterEntryId,
    },
    data,
  });
};

// Delete a roster entry by its id
export const deleteRosterEntryById = async (id: string): Promise<RosterItem> => {
  return await db.rosterItem.delete({
    where: { id },
  });
};

export const deleteRosterEntriesByUserAndClass = async (userId: string, classId: string): Promise<void> => {
  await db.rosterItem.deleteMany({
    where: {
      userId,
      classTermRosterId: classId,
    },
  });
};