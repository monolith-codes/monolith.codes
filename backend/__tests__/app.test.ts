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

describe("TechStack CRUD API", () => {
  let createdId: number;

  it("GET /techstack - should return seeded tech stack items", async () => {
    const res = await request(app).get("/techstack");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(7);

    // Verify some default items exist
    const names = res.body.map((item: any) => item.name);
    expect(names).toContain("Nuxt.js");
    expect(names).toContain("TypeScript");
    expect(names).toContain("Docker");
  });

  it("GET /techstack/:id - should return specific tech stack item", async () => {
    const listRes = await request(app).get("/techstack");
    const firstItem = listRes.body[0];

    const res = await request(app).get(`/techstack/${firstItem.id}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(firstItem);
  });

  it("GET /techstack/:id - should return 404 for non-existent item", async () => {
    const res = await request(app).get("/techstack/99999");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error", "Tech stack item not found");
  });

  it("POST /techstack - should create a new tech stack item", async () => {
    const newItem = {
      name: "Rust",
      imageUrl: "https://www.rust-lang.org/static/images/rust-logo-blk.svg",
      companyUrl: "https://www.rust-lang.org/",
      description: "A language empowering everyone to build reliable and efficient software."
    };

    const res = await request(app)
      .post("/techstack")
      .send(newItem);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe(newItem.name);
    expect(res.body.imageUrl).toBe(newItem.imageUrl);
    expect(res.body.companyUrl).toBe(newItem.companyUrl);
    expect(res.body.description).toBe(newItem.description);

    createdId = res.body.id;
  });

  it("POST /techstack - should return 400 when creating duplicate name", async () => {
    const duplicateItem = {
      name: "Rust",
      imageUrl: "https://example.com/logo.png",
      companyUrl: "https://example.com",
      description: "Duplicate"
    };

    const res = await request(app)
      .post("/techstack")
      .send(duplicateItem);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error", "Tech stack item with this name already exists");
  });

  it("POST /techstack - should return 400 for missing fields", async () => {
    const invalidItem = {
      name: "Go",
      imageUrl: "https://go.dev/logo.png",
      companyUrl: "https://go.dev"
      // description is missing
    };

    const res = await request(app)
      .post("/techstack")
      .send(invalidItem);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  it("PUT /techstack/:id - should update the tech stack item details", async () => {
    const updates = {
      description: "Rust is a multi-paradigm, general-purpose, compiled programming language."
    };

    const res = await request(app)
      .put(`/techstack/${createdId}`)
      .send(updates);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(createdId);
    expect(res.body.description).toBe(updates.description);
    expect(res.body.name).toBe("Rust"); // name remains unchanged
  });

  it("PUT /techstack/:id - should return 404 for updating non-existent item", async () => {
    const updates = {
      description: "Updated description"
    };

    const res = await request(app)
      .put("/techstack/99999")
      .send(updates);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error", "Tech stack item not found");
  });

  it("DELETE /techstack/:id - should delete the tech stack item", async () => {
    const res = await request(app).delete(`/techstack/${createdId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Tech stack item deleted successfully");

    // Verify it is deleted
    const getRes = await request(app).get(`/techstack/${createdId}`);
    expect(getRes.status).toBe(404);
  });

  it("DELETE /techstack/:id - should return 404 for deleting non-existent item", async () => {
    const res = await request(app).delete("/techstack/99999");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error", "Tech stack item not found");
  });
});

