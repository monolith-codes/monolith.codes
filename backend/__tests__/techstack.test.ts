import { jest } from "@jest/globals";
import request from "supertest";
import app from "../src/app";
import { prisma } from "../src/lib/prisma";

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

  describe("Edge Cases and Error Handling (Additional Coverage)", () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    // --- Service failures (500 errors) ---
    it("GET /techstack - should return 500 when service fails", async () => {
      jest.spyOn(prisma.techStackItem, "findMany").mockRejectedValue(new Error("DB error"));
      const res = await request(app).get("/techstack");
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("error", "Failed to fetch tech stack items");
    });

    it("GET /techstack/:id - should return 500 when service fails", async () => {
      jest.spyOn(prisma.techStackItem, "findUnique").mockRejectedValue(new Error("DB error"));
      const res = await request(app).get(`/techstack/${createdId || 1}`);
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("error", "Failed to fetch tech stack item");
    });

    it("POST /techstack - should return 500 when service fails", async () => {
      jest.spyOn(prisma.techStackItem, "create").mockRejectedValue(new Error("DB error"));
      const res = await request(app)
        .post("/techstack")
        .send({
          name: "Rust500",
          imageUrl: "https://example.com/logo.png",
          companyUrl: "https://example.com",
          description: "Description"
        });
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("error", "Failed to create tech stack item");
    });

    it("PUT /techstack/:id - should return 500 when service fails", async () => {
      jest.spyOn(prisma.techStackItem, "update").mockRejectedValue(new Error("DB error"));
      const res = await request(app)
        .put(`/techstack/${createdId || 1}`)
        .send({ name: "UpdateFail" });
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("error", "Failed to update tech stack item");
    });

    it("DELETE /techstack/:id - should return 500 when service fails", async () => {
      jest.spyOn(prisma.techStackItem, "delete").mockRejectedValue(new Error("DB error"));
      const res = await request(app).delete(`/techstack/${createdId || 1}`);
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("error", "Failed to delete tech stack item");
    });

    // --- Validation and Input type checks ---
    it("POST /techstack - should return 400 when fields are not strings", async () => {
      const res = await request(app)
        .post("/techstack")
        .send({
          name: 123,
          imageUrl: "https://example.com/logo.png",
          companyUrl: "https://example.com",
          description: "Description"
        });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "All fields must be strings");
    });

    it("PUT /techstack/:id - should return 400 when no fields to update are provided", async () => {
      const res = await request(app)
        .put(`/techstack/${createdId || 1}`)
        .send({});
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "At least one field to update is required");
    });

    it("PUT /techstack/:id - should return 400 when update fails with duplicate (P2002)", async () => {
      const prismaError = new Error("Duplicate key");
      (prismaError as any).code = "P2002";
      jest.spyOn(prisma.techStackItem, "update").mockRejectedValue(prismaError);

      const res = await request(app)
        .put(`/techstack/${createdId || 1}`)
        .send({ name: "DuplicateName" });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "Tech stack item with this name already exists");
    });

    it("GET /techstack/:id - should return 400 for invalid ID parameter (isNaN)", async () => {
      const res = await request(app).get("/techstack/notaninteger");
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "Invalid ID");
    });

    it("PUT /techstack/:id - should return 400 for invalid ID parameter (isNaN)", async () => {
      const res = await request(app)
        .put("/techstack/notaninteger")
        .send({ name: "ValidName" });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "Invalid ID");
    });

    it("DELETE /techstack/:id - should return 400 for invalid ID parameter (isNaN)", async () => {
      const res = await request(app).delete("/techstack/notaninteger");
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "Invalid ID");
    });

    // --- Direct invocation for non-string idParam ---
    it("should return 400 for non-string ID param on getTechStackItemById, updateTechStackItem, deleteTechStackItem (direct invocation)", async () => {
      const { getTechStackItemById, updateTechStackItem, deleteTechStackItem } = await import("../src/controllers/techstack.controller");

      const mockRes = () => {
        const res: any = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
      };

      // test getTechStackItemById
      const reqGet = { params: { id: 123 } } as any;
      const resGet = mockRes();
      await getTechStackItemById(reqGet, resGet);
      expect(resGet.status).toHaveBeenCalledWith(400);
      expect(resGet.json).toHaveBeenCalledWith({ error: "Invalid ID" });

      // test updateTechStackItem
      const reqUpdate = { params: { id: 123 }, body: { name: "Update" } } as any;
      const resUpdate = mockRes();
      await updateTechStackItem(reqUpdate, resUpdate);
      expect(resUpdate.status).toHaveBeenCalledWith(400);
      expect(resUpdate.json).toHaveBeenCalledWith({ error: "Invalid ID" });

      // test deleteTechStackItem
      const reqDelete = { params: { id: 123 } } as any;
      const resDelete = mockRes();
      await deleteTechStackItem(reqDelete, resDelete);
      expect(resDelete.status).toHaveBeenCalledWith(400);
      expect(resDelete.json).toHaveBeenCalledWith({ error: "Invalid ID" });
    });
  });
});
