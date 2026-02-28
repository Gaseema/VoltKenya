import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const prismaClientSingleton = () => {
  const adapter = new PrismaBetterSqlite3({ url: "file:prisma/dev.db" });
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
