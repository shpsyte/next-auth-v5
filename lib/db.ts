import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

// If we're in development, let's make sure we're not creating a new connection every time we import the db
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}
