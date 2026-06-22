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
});
