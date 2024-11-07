// global.d.ts
import { PrismaClient } from "@prisma/client";

declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient | undefined;
    }
  }
}
export {};