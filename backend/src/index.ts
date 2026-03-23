import express, { type Request, type Response } from "express";
import { prisma } from "./lib/prisma";
import { Startup } from "./services/startup";

const app = express();

async function main() {
  await Startup();
}

main().catch((e) => {
  console.error("Failed to start:", e.message);
  process.exit(1); // If seeding fails, you usually want to stop the server from running
});

app.get("/", async (req: Request, res: Response) => {
  return res.send("API ALIVE")
});

app.listen(1909, () => console.log("listening on port 1909"));

process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  await prisma.$disconnect();
  process.exit(0);
});