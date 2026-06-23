import type { Request, Response } from 'express';
import * as projectService from '../services/project.service';
import { prisma } from '../lib/prisma';

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await projectService.getAllProjects();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { id: idParam } = req.params;
    if (typeof idParam !== "string") {
      return res.status(400).json({ error: "Invalid ID" });
    }
    const id = parseInt(idParam, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    const project = await projectService.getProjectById(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch project" });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const {
      title,
      content,
      imageUrl,
      authorId,
      imageUrls,
      videoUrls,
      githubUrl,
      websiteUrl,
      videoUrl,
      instagramUrl,
      tiktokUrl
    } = req.body;

    // Validate required fields
    if (
      title === undefined ||
      content === undefined ||
      imageUrl === undefined ||
      authorId === undefined
    ) {
      return res.status(400).json({
        error: "All required fields (title, content, imageUrl, authorId) are required"
      });
    }

    if (
      typeof title !== "string" ||
      typeof content !== "string" ||
      typeof imageUrl !== "string" ||
      typeof authorId !== "number"
    ) {
      return res.status(400).json({ error: "Invalid field types" });
    }

    // Validate authorId exists in the database
    const authorExists = await prisma.user.findUnique({
      where: { id: authorId }
    });
    if (!authorExists) {
      return res.status(400).json({ error: "Author user not found" });
    }

    // Optional arrays formatting validation
    if (imageUrls !== undefined && !Array.isArray(imageUrls)) {
      return res.status(400).json({ error: "imageUrls must be an array of strings" });
    }
    if (videoUrls !== undefined && !Array.isArray(videoUrls)) {
      return res.status(400).json({ error: "videoUrls must be an array of strings" });
    }

    // Optional string fields validation
    if (videoUrl !== undefined && typeof videoUrl !== "string" && videoUrl !== null) {
      return res.status(400).json({ error: "videoUrl must be a string or null" });
    }
    if (instagramUrl !== undefined && typeof instagramUrl !== "string" && instagramUrl !== null) {
      return res.status(400).json({ error: "instagramUrl must be a string or null" });
    }
    if (tiktokUrl !== undefined && typeof tiktokUrl !== "string" && tiktokUrl !== null) {
      return res.status(400).json({ error: "tiktokUrl must be a string or null" });
    }

    const project = await projectService.createProject({
      title,
      content,
      imageUrl,
      authorId,
      imageUrls: imageUrls || [],
      videoUrls: videoUrls || [],
      githubUrl: githubUrl || null,
      websiteUrl: websiteUrl || null,
      videoUrl: videoUrl || null,
      instagramUrl: instagramUrl || null,
      tiktokUrl: tiktokUrl || null
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: "Failed to create project" });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id: idParam } = req.params;
    if (typeof idParam !== "string") {
      return res.status(400).json({ error: "Invalid ID" });
    }
    const id = parseInt(idParam, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const {
      title,
      content,
      imageUrl,
      authorId,
      imageUrls,
      videoUrls,
      githubUrl,
      websiteUrl,
      videoUrl,
      instagramUrl,
      tiktokUrl
    } = req.body;

    const data: any = {};
    if (title !== undefined) data.title = title;
    if (content !== undefined) data.content = content;
    if (imageUrl !== undefined) data.imageUrl = imageUrl;
    if (authorId !== undefined) {
      if (typeof authorId !== "number") {
        return res.status(400).json({ error: "authorId must be a number" });
      }
      const authorExists = await prisma.user.findUnique({
        where: { id: authorId }
      });
      if (!authorExists) {
        return res.status(400).json({ error: "Author user not found" });
      }
      data.authorId = authorId;
    }
    if (imageUrls !== undefined) {
      if (!Array.isArray(imageUrls)) {
        return res.status(400).json({ error: "imageUrls must be an array of strings" });
      }
      data.imageUrls = imageUrls;
    }
    if (videoUrls !== undefined) {
      if (!Array.isArray(videoUrls)) {
        return res.status(400).json({ error: "videoUrls must be an array of strings" });
      }
      data.videoUrls = videoUrls;
    }
    if (githubUrl !== undefined) data.githubUrl = githubUrl;
    if (websiteUrl !== undefined) data.websiteUrl = websiteUrl;
    if (videoUrl !== undefined) {
      if (typeof videoUrl !== "string" && videoUrl !== null) {
        return res.status(400).json({ error: "videoUrl must be a string or null" });
      }
      data.videoUrl = videoUrl;
    }
    if (instagramUrl !== undefined) {
      if (typeof instagramUrl !== "string" && instagramUrl !== null) {
        return res.status(400).json({ error: "instagramUrl must be a string or null" });
      }
      data.instagramUrl = instagramUrl;
    }
    if (tiktokUrl !== undefined) {
      if (typeof tiktokUrl !== "string" && tiktokUrl !== null) {
        return res.status(400).json({ error: "tiktokUrl must be a string or null" });
      }
      data.tiktokUrl = tiktokUrl;
    }

    const updatedProject = await projectService.updateProject(id, data);
    res.status(200).json(updatedProject);
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(500).json({ error: "Failed to update project" });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id: idParam } = req.params;
    if (typeof idParam !== "string") {
      return res.status(400).json({ error: "Invalid ID" });
    }
    const id = parseInt(idParam, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    await projectService.deleteProject(id);
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(500).json({ error: "Failed to delete project" });
  }
};