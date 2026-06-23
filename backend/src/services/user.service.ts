import { prisma } from "../lib/prisma";

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    include: { projects: true }
  });
};

export const getUserById = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
    include: { projects: true }
  });
};

export const createUser = async (data: { name: string; email: string }) => {
  return await prisma.user.create({
    data
  });
};

export const updateUser = async (
  id: number,
  data: Partial<{ name: string; email: string }>
) => {
  return await prisma.user.update({
    where: { id },
    data
  });
};

export const deleteUser = async (id: number) => {
  return await prisma.user.delete({
    where: { id }
  });
};