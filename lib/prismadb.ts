import { PrismaClient } from "@prisma/client";
// Create a new PrismaClient instance
const globalForPrisma = global as typeof globalThis & { prisma?: PrismaClient };

const createPrismaClient = () => {
  const client = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "info", "warn", "error"] : ["error"],
  });

  // Handle connection errors
  client.$connect().catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit the process with an error code
  });

  return client;
};

// Reuse the existing PrismaClient instance or create a new one
const prismadb = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prismadb;
}

// Gracefully close the database connection on exit
process.on("SIGINT", async () => {
  await prismadb.$disconnect();
  console.log("Disconnected from the database");
  process.exit(0);
});

export default prismadb;
