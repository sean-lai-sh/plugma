import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"], // Helps with debugging
  });
  

export default prisma;
