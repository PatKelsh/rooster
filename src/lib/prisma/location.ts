import db from "@/lib/prisma";
import { Location, Prisma } from "@client";

export const createLocation = async (data: Prisma.LocationCreateInput): Promise<Location> => {
  return await db.location.create({
    data,
  });
};

export const getAllLocations = async (): Promise<Location[]> => {
  return await db.location.findMany();
};

export const deleteLocation = async (id: string): Promise<Location | null> => {
  return await db.location.delete({
    where: { id },
  });
};