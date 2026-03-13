import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
// Remove "/client" from the end of this path
import { PrismaClient } from "../generated/prisma/client"; 

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = new PrismaClient({ adapter });