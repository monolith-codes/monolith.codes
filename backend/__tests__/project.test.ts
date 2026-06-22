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

describe("Project CRUD API", () => {
  let seedUserId: number;
  let createdProjectId: number;

  beforeAll(async () => {
    // Find or create a user to act as author
    let user = await prisma.user.findFirst();
    if (!user) {
      user = await prisma.user.create({
        data: {
          name: "ProjectAuthor",
          email: "project_author@example.com",
        },
      });
    }
    seedUserId = user.id;
  });

  it("GET /projects - should return list of projects", async () => {
    const res = await request(app).get("/projects");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /projects/all - should return list of projects (compatibility alias)", async () => {
    const res = await request(app).get("/projects/all");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /projects - should create a new project", async () => {
    const newProject = {
      title: "My Portfolio Website",
      content: "A beautiful showcase of my creative coding work.",
      imageUrl: "https://example.com/thumbnail.png",
      authorId: seedUserId,
      imageUrls: ["https://example.com/slide1.png", "https://example.com/slide2.png"],
      videoUrls: ["https://example.com/demo.mp4"],
      githubUrl: "https://github.com/myusername/portfolio",
      websiteUrl: "https://myportfolio.example.com",
    };

    const res = await request(app)
      .post("/projects")
      .send(newProject);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.title).toBe(newProject.title);
    expect(res.body.content).toBe(newProject.content);
    expect(res.body.imageUrl).toBe(newProject.imageUrl);
    expect(res.body.authorId).toBe(newProject.authorId);
    expect(res.body.imageUrls).toEqual(newProject.imageUrls);
    expect(res.body.videoUrls).toEqual(newProject.videoUrls);
    expect(res.body.githubUrl).toBe(newProject.githubUrl);
    expect(res.body.websiteUrl).toBe(newProject.websiteUrl);

    createdProjectId = res.body.id;
  });

  it("GET /projects/:id - should return specific project by id", async () => {
    const res = await request(app).get(`/projects/${createdProjectId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(createdProjectId);
    expect(res.body.title).toBe("My Portfolio Website");
    expect(res.body.author).toBeDefined();
    expect(res.body.author.id).toBe(seedUserId);
  });

  it("GET /projects/:id - should return 404 for non-existent project", async () => {
    const res = await request(app).get("/projects/99999");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error", "Project not found");
  });

  it("GET /projects/:id - should return 400 for invalid ID parameter", async () => {
    const res = await request(app).get("/projects/notaninteger");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error", "Invalid ID");
  });

  it("POST /projects - should return 400 when author does not exist", async () => {
    const invalidProject = {
      title: "Orphaned Project",
      content: "Content",
      imageUrl: "https://example.com/img.png",
      authorId: 99999, // non-existent user
    };

    const res = await request(app)
      .post("/projects")
      .send(invalidProject);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error", "Author user not found");
  });

  it("POST /projects - should return 400 for missing required fields", async () => {
    const invalidProject = {
      title: "Incomplete Project",
      // content and imageUrl missing
      authorId: seedUserId,
    };

    const res = await request(app)
      .post("/projects")
      .send(invalidProject);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error", "All required fields (title, content, imageUrl, authorId) are required");
  });

  it("PUT /projects/:id - should update project details", async () => {
    const updates = {
      title: "My Portfolio Website v2",
      githubUrl: "https://github.com/myusername/portfolio-v2",
    };

    const res = await request(app)
      .put(`/projects/${createdProjectId}`)
      .send(updates);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(createdProjectId);
    expect(res.body.title).toBe(updates.title);
    expect(res.body.githubUrl).toBe(updates.githubUrl);
  });

  it("PUT /projects/:id - should return 404 for updating non-existent project", async () => {
    const updates = {
      title: "Updated Title",
    };

    const res = await request(app)
      .put("/projects/99999")
      .send(updates);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error", "Project not found");
  });

  it("DELETE /projects/:id - should delete project", async () => {
    const res = await request(app).delete(`/projects/${createdProjectId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Project deleted successfully");

    // Verify project is deleted
    const getRes = await request(app).get(`/projects/${createdProjectId}`);
    expect(getRes.status).toBe(404);
  });

  it("DELETE /projects/:id - should return 404 for deleting non-existent project", async () => {
    const res = await request(app).delete("/projects/99999");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error", "Project not found");
  });
});
