import { defineConfig } from "prisma/config";

// @ts-ignore - Temporarily bypass TS complaining about Node types
const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error("CRITICAL: DATABASE_URL is completely missing inside the Docker container!");
}

export default defineConfig({
  schema: "prisma/schema.prisma", 
  datasource: {
    url: dbUrl as string,
  },
});