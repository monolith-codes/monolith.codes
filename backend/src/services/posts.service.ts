import { prisma } from "../lib/prisma";

export const getAllPosts = async () => {
  return await prisma.post.findMany({
    include: {
      author: {
        select: { name: true, email: true }
      }
    }
  });
};