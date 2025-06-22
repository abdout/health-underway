import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

type PrismaError = {
  code?: string;
  message: string;
  meta?: Record<string, unknown>;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export const handlePrismaError = (error: PrismaError) => {
  console.error("Database Error:", error);
  throw new Error(error.message);
};

export default prisma;

// For debugging Prisma issues
export function debugPrismaEngine() {
  try {
    const enginePath = (prisma as any)._engine?.binaryPath ?? "Unknown binary path";
    console.log("Prisma binary path:", enginePath);
    
    const engines = (prisma as any)._getActiveEngineInstances?.() ?? [];
    console.log("Active engine instances:", engines.length);
    
    console.log("Prisma connection URL:", process.env.DATABASE_URL?.substring(0, 20) + "...");
    console.log("NODE_ENV:", process.env.NODE_ENV);
    
    return { enginePath, engines: engines.length };
  } catch (error) {
    console.error("Failed to debug Prisma engine:", error);
    return { error: error?.toString() };
  }
}
