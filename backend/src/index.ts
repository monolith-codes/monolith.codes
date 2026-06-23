import app from "./app";
import { prisma } from "./lib/prisma";
import { Startup } from "./services/startup.service";

async function main() {
  await Startup();
}

main().catch((e) => {
  console.error("Failed to start:", e.message);
  process.exit(1);
});

app.listen(1909, () => console.log("listening on port 1909"));

process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  await prisma.$disconnect();
  process.exit(0);
});