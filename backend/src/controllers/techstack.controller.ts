import type { Request, Response } from "express";
import * as techStackService from "../services/techstack.service";

export const getTechStackItems = async (req: Request, res: Response) => {
  try {
    const items = await techStackService.getAllTechStackItems();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tech stack items" });
  }
};

export const getTechStackItemById = async (req: Request, res: Response) => {
  try {
    const { id: idParam } = req.params;
    if (typeof idParam !== "string") {
      return res.status(400).json({ error: "Invalid ID" });
    }
    const id = parseInt(idParam, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    const item = await techStackService.getTechStackItemById(id);
    if (!item) {
      return res.status(404).json({ error: "Tech stack item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tech stack item" });
  }
};

export const createTechStackItem = async (req: Request, res: Response) => {
  try {
    const { name, imageUrl, companyUrl, description } = req.body;
    if (!name || !imageUrl || !companyUrl || !description) {
      return res.status(400).json({
        error: "All fields (name, imageUrl, companyUrl, description) are required"
      });
    }
    if (
      typeof name !== "string" ||
      typeof imageUrl !== "string" ||
      typeof companyUrl !== "string" ||
      typeof description !== "string"
    ) {
      return res.status(400).json({ error: "All fields must be strings" });
    }
    const item = await techStackService.createTechStackItem({
      name,
      imageUrl,
      companyUrl,
      description
    });
    res.status(201).json(item);
  } catch (error: any) {
    if (error.code === "P2002") {
      return res
        .status(400)
        .json({ error: "Tech stack item with this name already exists" });
    }
    res.status(500).json({ error: "Failed to create tech stack item" });
  }
};

export const updateTechStackItem = async (req: Request, res: Response) => {
  try {
    const { id: idParam } = req.params;
    if (typeof idParam !== "string") {
      return res.status(400).json({ error: "Invalid ID" });
    }
    const id = parseInt(idParam, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    const { name, imageUrl, companyUrl, description } = req.body;

    if (
      name === undefined &&
      imageUrl === undefined &&
      companyUrl === undefined &&
      description === undefined
    ) {
      return res
        .status(400)
        .json({ error: "At least one field to update is required" });
    }

    const item = await techStackService.updateTechStackItem(id, {
      name,
      imageUrl,
      companyUrl,
      description
    });
    res.status(200).json(item);
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Tech stack item not found" });
    }
    if (error.code === "P2002") {
      return res
        .status(400)
        .json({ error: "Tech stack item with this name already exists" });
    }
    res.status(500).json({ error: "Failed to update tech stack item" });
  }
};

export const deleteTechStackItem = async (req: Request, res: Response) => {
  try {
    const { id: idParam } = req.params;
    if (typeof idParam !== "string") {
      return res.status(400).json({ error: "Invalid ID" });
    }
    const id = parseInt(idParam, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    await techStackService.deleteTechStackItem(id);
    res.status(200).json({ message: "Tech stack item deleted successfully" });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Tech stack item not found" });
    }
    res.status(500).json({ error: "Failed to delete tech stack item" });
  }
};
