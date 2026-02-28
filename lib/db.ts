import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const prismaClientSingleton = () => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const getPrisma = () => {
  if (process.env.NODE_ENV === "production") {
    return prismaClientSingleton();
  }

  if (
    !globalThis.prismaGlobal ||
    !(globalThis.prismaGlobal as any).transaction
  ) {
    if (globalThis.prismaGlobal) {
      console.log("Prisma client stale or missing models, refreshing...");
    }
    globalThis.prismaGlobal = prismaClientSingleton();
  }
  return globalThis.prismaGlobal;
};

const prisma = getPrisma();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
