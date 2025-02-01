import { PrismaClient } from '@prisma/client';

declare global {
  let prisma: PrismaClient | undefined;
}

// Prevent TypeScript from treating this file as a script
export {};
