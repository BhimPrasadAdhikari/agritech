// global.d.ts
import { PrismaClient } from "@prisma/client";

declare global {
  // Extend the Window interface for client-side code
  interface Window {
    adsbygoogle: any[];
  }

  namespace NodeJS {
    interface Global {
      prisma: PrismaClient | undefined;
    }
  }
}
export {};