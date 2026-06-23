import { prisma } from "../lib/prisma";

export const getAllTechStackItems = async () => {
  return await prisma.techStackItem.findMany();
};

export const getTechStackItemById = async (id: number) => {
  return await prisma.techStackItem.findUnique({
    where: { id }
  });
};

export const createTechStackItem = async (data: {
  name: string;
  imageUrl: string;
  companyUrl: string;
  description: string;
}) => {
  return await prisma.techStackItem.create({
    data
  });
};

export const updateTechStackItem = async (
  id: number,
  data: Partial<{
    name: string;
    imageUrl: string;
    companyUrl: string;
    description: string;
  }>
) => {
  return await prisma.techStackItem.update({
    where: { id },
    data
  });
};

export const deleteTechStackItem = async (id: number) => {
  return await prisma.techStackItem.delete({
    where: { id }
  });
};
