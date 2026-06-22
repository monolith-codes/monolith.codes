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

  describe("Edge Cases and Error Handling (Additional Coverage)", () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    // --- Service failures (500 errors) ---
    it("GET /projects - should return 500 when service fails", async () => {
      jest.spyOn(prisma.project, "findMany").mockRejectedValue(new Error("DB error"));
      const res = await request(app).get("/projects");
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("error", "Failed to fetch projects");
    });

    it("GET /projects/:id - should return 500 when service fails", async () => {
      jest.spyOn(prisma.project, "findUnique").mockRejectedValue(new Error("DB error"));
      const res = await request(app).get(`/projects/${createdProjectId || 1}`);
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("error", "Failed to fetch project");
    });

    it("POST /projects - should return 500 when service fails", async () => {
      jest.spyOn(prisma.project, "create").mockRejectedValue(new Error("DB error"));
      const res = await request(app)
        .post("/projects")
        .send({
          title: "Fail Project",
          content: "Content",
          imageUrl: "https://example.com/img.png",
          authorId: seedUserId,
        });
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("error", "Failed to create project");
    });

    it("PUT /projects/:id - should return 500 when service fails", async () => {
      jest.spyOn(prisma.project, "update").mockRejectedValue(new Error("DB error"));
      const res = await request(app)
        .put(`/projects/${createdProjectId || 1}`)
        .send({ title: "FailUpdate" });
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("error", "Failed to update project");
    });

    it("DELETE /projects/:id - should return 500 when service fails", async () => {
      jest.spyOn(prisma.project, "delete").mockRejectedValue(new Error("DB error"));
      const res = await request(app).delete(`/projects/${createdProjectId || 1}`);
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("error", "Failed to delete project");
    });

    // --- Validation: invalid field types on POST ---
    it("POST /projects - should return 400 for invalid field types", async () => {
      const res = await request(app)
        .post("/projects")
        .send({
          title: 123,
          content: "Content",
          imageUrl: "https://example.com/img.png",
          authorId: seedUserId,
        });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "Invalid field types");
    });

    it("POST /projects - should return 400 for non-number authorId", async () => {
      const res = await request(app)
        .post("/projects")
        .send({
          title: "Title",
          content: "Content",
          imageUrl: "https://example.com/img.png",
          authorId: "notanumber",
        });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "Invalid field types");
    });

    it("POST /projects - should return 400 for invalid imageUrls (not an array)", async () => {
      const res = await request(app)
        .post("/projects")
        .send({
          title: "Title",
          content: "Content",
          imageUrl: "https://example.com/img.png",
          authorId: seedUserId,
          imageUrls: "not-an-array",
        });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "imageUrls must be an array of strings");
    });

    it("POST /projects - should return 400 for invalid videoUrls (not an array)", async () => {
      const res = await request(app)
        .post("/projects")
        .send({
          title: "Title",
          content: "Content",
          imageUrl: "https://example.com/img.png",
          authorId: seedUserId,
          videoUrls: "not-an-array",
        });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "videoUrls must be an array of strings");
    });

    // --- Validation on PUT ---
    it("PUT /projects/:id - should return 400 for non-number authorId", async () => {
      const res = await request(app)
        .put(`/projects/${createdProjectId || 1}`)
        .send({ authorId: "notanumber" });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "authorId must be a number");
    });

    it("PUT /projects/:id - should return 400 for non-existent authorId", async () => {
      const res = await request(app)
        .put(`/projects/${createdProjectId || 1}`)
        .send({ authorId: 99999 });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "Author user not found");
    });

    it("PUT /projects/:id - should return 400 for invalid imageUrls (not an array)", async () => {
      const res = await request(app)
        .put(`/projects/${createdProjectId || 1}`)
        .send({ imageUrls: "not-an-array" });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "imageUrls must be an array of strings");
    });

    it("PUT /projects/:id - should return 400 for invalid videoUrls (not an array)", async () => {
      const res = await request(app)
        .put(`/projects/${createdProjectId || 1}`)
        .send({ videoUrls: "not-an-array" });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "videoUrls must be an array of strings");
    });

    // --- Invalid ID (isNaN) ---
    it("PUT /projects/:id - should return 400 for invalid ID parameter (isNaN)", async () => {
      const res = await request(app)
        .put("/projects/notaninteger")
        .send({ title: "ValidTitle" });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "Invalid ID");
    });

    it("DELETE /projects/:id - should return 400 for invalid ID parameter (isNaN)", async () => {
      const res = await request(app).delete("/projects/notaninteger");
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "Invalid ID");
    });

    // --- Direct invocation for non-string idParam ---
    it("should return 400 for non-string ID param on getProjectById, updateProject, deleteProject (direct invocation)", async () => {
      const { getProjectById, updateProject, deleteProject } = await import("../src/controllers/project.controller");

      const mockRes = () => {
        const res: any = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
      };

      // test getProjectById
      const reqGet = { params: { id: 123 } } as any;
      const resGet = mockRes();
      await getProjectById(reqGet, resGet);
      expect(resGet.status).toHaveBeenCalledWith(400);
      expect(resGet.json).toHaveBeenCalledWith({ error: "Invalid ID" });

      // test updateProject
      const reqUpdate = { params: { id: 123 }, body: { title: "Update" } } as any;
      const resUpdate = mockRes();
      await updateProject(reqUpdate, resUpdate);
      expect(resUpdate.status).toHaveBeenCalledWith(400);
      expect(resUpdate.json).toHaveBeenCalledWith({ error: "Invalid ID" });

      // test deleteProject
      const reqDelete = { params: { id: 123 } } as any;
      const resDelete = mockRes();
      await deleteProject(reqDelete, resDelete);
      expect(resDelete.status).toHaveBeenCalledWith(400);
      expect(resDelete.json).toHaveBeenCalledWith({ error: "Invalid ID" });
    });

    it("PUT /projects/:id - should successfully update authorId, imageUrls, and videoUrls", async () => {
      // First create a project to update
      const createRes = await request(app)
        .post("/projects")
        .send({
          title: "CoverageProject",
          content: "Content for coverage",
          imageUrl: "https://example.com/img.png",
          authorId: seedUserId,
        });
      const projectId = createRes.body.id;

      const res = await request(app)
        .put(`/projects/${projectId}`)
        .send({
          authorId: seedUserId,
          imageUrls: ["https://example.com/a.png", "https://example.com/b.png"],
          videoUrls: ["https://example.com/v.mp4"],
        });
      expect(res.status).toBe(200);
      expect(res.body.authorId).toBe(seedUserId);
      expect(res.body.imageUrls).toEqual(["https://example.com/a.png", "https://example.com/b.png"]);
      expect(res.body.videoUrls).toEqual(["https://example.com/v.mp4"]);

      // Cleanup
      await request(app).delete(`/projects/${projectId}`);
    });
  });
});