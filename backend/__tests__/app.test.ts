import request from "supertest";
import app from "../src/app";
import { prisma } from "../src/lib/prisma";
import { Startup } from "../src/services/startup.service";

beforeAll(async () => {
  await Startup();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("GET /", () => {
  it("should return API ALIVE", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toBe("API ALIVE");
  });
});
