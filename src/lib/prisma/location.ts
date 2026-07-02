import db from "@/lib/prisma";
import { Location, Prisma } from "@client";

export const createLocation = async (data: Prisma.LocationCreateInput): Promise<Location> => {
  return await db.location.create({
    data,
  });
};