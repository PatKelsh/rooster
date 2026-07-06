import { PrismaClient } from '@client';
import { PrismaPg } from '@prisma/adapter-pg';

import { logger } from "@/helpers/logger";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter});


async function main() {
  await prisma.user.upsert({
    where: { email: 'alice@test.test' },
    update: {},
    create: {
      email: 'alice@test.test',
      firstName: 'Alice',
      lastName: 'Wonderland',
      name: 'Alice Wonderland',
      emailVerified: true,
      role: 'USER',
    },
  });
  await prisma.user.upsert({
    where: { email: 'parvati@test.test' },
    update: {},
    create: {
      email: 'parvati@test.test',
      firstName: 'Parvati',
      lastName: 'Shallow',
      name: 'Parvati Shallow',
      emailVerified: true,
      role: 'USER'
    },
  });
  await prisma.user.upsert({
    where: { email: 'rob@test.test' },
    update: {},
    create: {
      email: 'rob@test.io',
      firstName: 'Rob',
      lastName: 'Mariano',
      name: 'Rob Mariano',
      emailVerified: true,
      role: 'USER'
    },
  });
  await prisma.user.upsert({
    where: { email: 'sandra@prisma.test' },
    update: {},
    create: {
      email: 'sandra@test.test',
      firstName: 'Sandra',
      lastName: 'Diaz-Twine',
      name: 'Sandra Diaz-Twine',
      emailVerified: true,
      role: 'ADMIN'
    },
  });
  await prisma.class.upsert({
    where: { name: 'test silks' },
    update: {},
    create: {
      name: 'test silks',
      description: 'description of test silkls',
    },
  });
  await prisma.class.upsert({
    where: { name: 'test trapeze' },
    update: {},
    create: {
      name: 'test trapeze',
      description: 'description of test trapeze',
    },
  });
  await prisma.user.upsert({
    where: { email: 'rob.c@prisma.io' },
    update: {},
    create: {
      email: 'rob.c@prisma.io',
      firstName: 'Rob',
      lastName: 'Cesternino',
      name: 'Rob Cesternino',
      emailVerified: true,
    },
  });
  await prisma.user.upsert({
    where: { email: 'cirie@prisma.io' },
    update: {},
    create: {
      email: 'cirie@prisma.io',
      firstName: 'Cirie',
      lastName: 'Fields',
      name: 'Cirie Fields',
      emailVerified: true,
    },
  });
  await prisma.user.upsert({
    where: { email: 'todd@prisma.io' },
    update: {},
    create: {
      email: 'todd@prisma.io',
      firstName: 'Todd',
      lastName: 'Herzog',
      name: 'Todd Herzog',
      emailVerified: true,
    },
  });
  await prisma.user.upsert({
    where: { email: 'yul@prisma.io' },
    update: {},
    create: {
      email: 'yul@prisma.io',
      firstName: 'Yul',
      lastName: 'Kwon',
      name: 'Yul Kwon',
      emailVerified: true,
    },
  });
  await prisma.user.upsert({
    where: { email: 'tony@prisma.io' },
    update: {},
    create: {
      email: 'tony@prisma.io',
      firstName: 'Tony',
      lastName: 'Vlachos',
      name: 'Tony Vlachos',
      emailVerified: true,
    },
  });
  await prisma.user.upsert({
    where: { email: 'tom@prisma.io' },
    update: {},
    create: {
      email: 'tom@prisma.io',
      firstName: 'Tom',
      lastName: 'Westman',
      name: 'Tom Westman',
      emailVerified: true,
    },
  });
  await prisma.user.upsert({
    where: { email: 'russell@prisma.io' },
    update: {},
    create: {
      email: 'russell@prisma.io',
      firstName: 'Russell',
      lastName: 'Hantz',
      name: 'Russell Hantz',
      emailVerified: true,
    },
  });
  await prisma.user.upsert({
    where: { email: 'brian@prisma.io' },
    update: {},
    create: {
      email: 'brian@prisma.io',
      firstName: 'Brian',
      lastName: 'Heidik',
      name: 'Brian Heidik',
      emailVerified: true,
    },
  });
  await prisma.user.upsert({
    where: { email: 'tyson@prisma.io' },
    update: {},
    create: {
      email: 'tyson@prisma.io',
      firstName: 'Tyson',
      lastName: 'Apostol',
      name: 'Tyson Apostol',
      emailVerified: true,
    },
  });
  await prisma.user.upsert({
    where: { email: 'ozzy@prisma.io' },
    update: {},
    create: {
      email: 'ozzy@prisma.io',
      firstName: 'Ozzy',
      lastName: 'Lusth',
      name: 'Ozzy Lusth',
      emailVerified: true,
    },
  });
};

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    logger.error(`Error during seeding: ${e instanceof Error ? e.message : "An unexpected error occurred"}`);
    await prisma.$disconnect()
    process.exit(1)
  })