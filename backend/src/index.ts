import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Startup } from "./services/startup";

const prisma = new PrismaClient();
const app = express();

async function main() {
  await Startup();
}

main()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

app.get("/", async (req: Request, res: Response) => {
  return res.send("API ALIVE")
});

app.listen(1909, () => console.log("listening on port 1909"));