import { prisma } from "../lib/prisma";

export const getAllProjects = async () => {
  return await prisma.project.findMany({
    include: {
      author: true
    }
  });
};

export const getProjectById = async (id: number) => {
  return await prisma.project.findUnique({
    where: { id },
    include: {
      author: true
    }
  });
};

export const createProject = async (data: {
  title: string;
  content: string;
  imageUrl: string;
  authorId: number;
  imageUrls?: string[];
  videoUrls?: string[];
  githubUrl?: string | null;
  websiteUrl?: string | null;
  videoUrl?: string | null;
  instagramUrl?: string | null;
  tiktokUrl?: string | null;
}) => {
  return await prisma.project.create({
    data
  });
};

export const updateProject = async (
  id: number,
  data: Partial<{
    title: string;
    content: string;
    imageUrl: string;
    authorId: number;
    imageUrls: string[];
    videoUrls: string[];
    githubUrl: string | null;
    websiteUrl: string | null;
    videoUrl: string | null;
    instagramUrl: string | null;
    tiktokUrl: string | null;
  }>
) => {
  return await prisma.project.update({
    where: { id },
    data
  });
};

export const deleteProject = async (id: number) => {
  return await prisma.project.delete({
    where: { id }
  });
};
