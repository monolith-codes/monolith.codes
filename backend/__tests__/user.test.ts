import { jest } from "@jest/globals";
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

describe("User CRUD API", () => {
  let createdUserId: number;
  const uniqueName = `TestUser_${Date.now()}`;
  const uniqueEmail = `testuser_${Date.now()}@example.com`;

  it("GET /users - should return list of users", async () => {
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /users/all - should return list of users (compatibility alias)", async () => {
    const res = await request(app).get("/users/all");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /users - should create a new user", async () => {
    const newUser = {
      name: uniqueName,
      email: uniqueEmail,
    };

    const res = await request(app)
      .post("/users")
      .send(newUser);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe(newUser.name);
    expect(res.body.email).toBe(newUser.email);

    createdUserId = res.body.id;
  });

  it("GET /users/:id - should return specific user by id", async () => {
    const res = await request(app).get(`/users/${createdUserId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(createdUserId);
    expect(res.body.name).toBe(uniqueName);
    expect(res.body.email).toBe(uniqueEmail);
  });

  it("GET /users/:id - should return 404 for non-existent user", async () => {
    const res = await request(app).get("/users/99999");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error", "User not found");
  });

  it("GET /users/:id - should return 400 for invalid ID parameter", async () => {
    const res = await request(app).get("/users/notaninteger");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error", "Invalid ID");
  });

  it("POST /users - should return 400 when creating duplicate name or email", async () => {
    const duplicateUser = {
      name: uniqueName,
      email: uniqueEmail,
    };

    const res = await request(app)
      .post("/users")
      .send(duplicateUser);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error", "User with this name or email already exists");
  });

  it("POST /users - should return 400 for missing fields", async () => {
    const invalidUser = {
      name: "MissingEmailUser",
      // email is missing
    };

    const res = await request(app)
      .post("/users")
      .send(invalidUser);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error", "All fields (name, email) are required");
  });

  it("PUT /users/:id - should update user details", async () => {
    const updates = {
      name: `${uniqueName}_updated`,
    };

    const res = await request(app)
      .put(`/users/${createdUserId}`)
      .send(updates);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(createdUserId);
    expect(res.body.name).toBe(updates.name);
    expect(res.body.email).toBe(uniqueEmail); // email remains unchanged
  });

  it("PUT /users/:id - should return 404 for updating non-existent user", async () => {
    const updates = {
      name: "NonExistentUser",
    };

    const res = await request(app)
      .put("/users/99999")
      .send(updates);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error", "User not found");
  });

  it("DELETE /users/:id - should delete user", async () => {
    const res = await request(app).delete(`/users/${createdUserId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "User deleted successfully");

    // Verify user is deleted
    const getRes = await request(app).get(`/users/${createdUserId}`);
    expect(getRes.status).toBe(404);
  });

  it("DELETE /users/:id - should return 404 for deleting non-existent user", async () => {
    const res = await request(app).delete("/users/99999");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error", "User not found");
  });

  describe("Edge Cases and Error Handling (Additional Coverage)", () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    // --- Service failures (500 errors) ---
    it("GET /users - should return 500 when service fails", async () => {
      jest.spyOn(prisma.user, "findMany").mockRejectedValue(new Error("DB error"));
      const res = await request(app).get("/users");
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("error", "Failed to fetch users");
    });

    it("GET /users/:id - should return 500 when service fails", async () => {
      jest.spyOn(prisma.user, "findUnique").mockRejectedValue(new Error("DB error"));
      const res = await request(app).get(`/users/${createdUserId || 1}`);
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("error", "Failed to fetch user");
    });

    it("POST /users - should return 500 when service fails", async () => {
      jest.spyOn(prisma.user, "create").mockRejectedValue(new Error("DB error"));
      const res = await request(app)
        .post("/users")
        .send({ name: "FailUser", email: "failuser@example.com" });
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("error", "Failed to create user");
    });

    it("PUT /users/:id - should return 500 when service fails", async () => {
      jest.spyOn(prisma.user, "update").mockRejectedValue(new Error("DB error"));
      const res = await request(app)
        .put(`/users/${createdUserId || 1}`)
        .send({ name: "FailUpdate" });
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("error", "Failed to update user");
    });

    it("DELETE /users/:id - should return 500 when service fails", async () => {
      jest.spyOn(prisma.user, "delete").mockRejectedValue(new Error("DB error"));
      const res = await request(app).delete(`/users/${createdUserId || 1}`);
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("error", "Failed to delete user");
    });

    // --- Validation and Input type checks ---
    it("POST /users - should return 400 when fields are not strings", async () => {
      const res = await request(app)
        .post("/users")
        .send({ name: 123, email: "string@example.com" });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "All fields must be strings");

      const res2 = await request(app)
        .post("/users")
        .send({ name: "string", email: true });
      expect(res2.status).toBe(400);
      expect(res2.body).toHaveProperty("error", "All fields must be strings");
    });

    it("PUT /users/:id - should return 400 when name or email is not a string", async () => {
      const res = await request(app)
        .put(`/users/${createdUserId || 1}`)
        .send({ name: 123 });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "Name must be a string");

      const res2 = await request(app)
        .put(`/users/${createdUserId || 1}`)
        .send({ email: true });
      expect(res2.status).toBe(400);
      expect(res2.body).toHaveProperty("error", "Email must be a string");
    });

    it("PUT /users/:id - should return 400 when no fields to update are provided", async () => {
      const res = await request(app)
        .put(`/users/${createdUserId || 1}`)
        .send({});
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "At least one field to update is required");
    });

    it("PUT /users/:id - should return 400 when update fails with duplicate (P2002)", async () => {
      const prismaError = new Error("Duplicate key");
      (prismaError as any).code = "P2002";
      jest.spyOn(prisma.user, "update").mockRejectedValue(prismaError);

      const res = await request(app)
        .put(`/users/${createdUserId || 1}`)
        .send({ name: "DuplicateName" });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "User with this name or email already exists");
    });

    it("PUT /users/:id - should return 400 for invalid ID parameter (isNaN)", async () => {
      const res = await request(app)
        .put("/users/notaninteger")
        .send({ name: "ValidName" });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "Invalid ID");
    });

    it("DELETE /users/:id - should return 400 for invalid ID parameter (isNaN)", async () => {
      const res = await request(app).delete("/users/notaninteger");
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "Invalid ID");
    });

    // --- Direct invocation for non-string idParam ---
    it("should return 400 for non-string ID param on getUserById, updateUser, deleteUser (direct invocation)", async () => {
      const { getUserById, updateUser, deleteUser } = await import("../src/controllers/user.controller");

      const mockRes = () => {
        const res: any = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
      };

      // test getUserById
      const reqGet = { params: { id: 123 } } as any; // number instead of string
      const resGet = mockRes();
      await getUserById(reqGet, resGet);
      expect(resGet.status).toHaveBeenCalledWith(400);
      expect(resGet.json).toHaveBeenCalledWith({ error: "Invalid ID" });

      // test updateUser
      const reqUpdate = { params: { id: 123 }, body: { name: "Update" } } as any;
      const resUpdate = mockRes();
      await updateUser(reqUpdate, resUpdate);
      expect(resUpdate.status).toHaveBeenCalledWith(400);
      expect(resUpdate.json).toHaveBeenCalledWith({ error: "Invalid ID" });

      // test deleteUser
      const reqDelete = { params: { id: 123 } } as any;
      const resDelete = mockRes();
      await deleteUser(reqDelete, resDelete);
      expect(resDelete.status).toHaveBeenCalledWith(400);
      expect(resDelete.json).toHaveBeenCalledWith({ error: "Invalid ID" });
    });
  });
});
