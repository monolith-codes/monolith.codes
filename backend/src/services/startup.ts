import { StartDBSeeding } from "../lib/seed"

export async function Startup() {
  console.log("Monolith Services started succesfully!")

  await StartDBSeeding()
}