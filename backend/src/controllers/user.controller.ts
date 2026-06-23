import type { Request, Response } from 'express';
import * as userService from '../services/user.service';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id: idParam } = req.params;
    if (typeof idParam !== "string") {
      return res.status(400).json({ error: "Invalid ID" });
    }
    const id = parseInt(idParam, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({
        error: "All fields (name, email) are required"
      });
    }
    if (typeof name !== "string" || typeof email !== "string") {
      return res.status(400).json({ error: "All fields must be strings" });
    }
    const user = await userService.createUser({ name, email });
    res.status(201).json(user);
  } catch (error: any) {
    if (error.code === "P2002") {
      return res
        .status(400)
        .json({ error: "User with this name or email already exists" });
    }
    res.status(500).json({ error: "Failed to create user" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id: idParam } = req.params;
    if (typeof idParam !== "string") {
      return res.status(400).json({ error: "Invalid ID" });
    }
    const id = parseInt(idParam, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    const { name, email } = req.body;

    if (name === undefined && email === undefined) {
      return res
        .status(400)
        .json({ error: "At least one field to update is required" });
    }

    if (name !== undefined && typeof name !== "string") {
      return res.status(400).json({ error: "Name must be a string" });
    }

    if (email !== undefined && typeof email !== "string") {
      return res.status(400).json({ error: "Email must be a string" });
    }

    const user = await userService.updateUser(id, { name, email });
    res.status(200).json(user);
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "User not found" });
    }
    if (error.code === "P2002") {
      return res
        .status(400)
        .json({ error: "User with this name or email already exists" });
    }
    res.status(500).json({ error: "Failed to update user" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id: idParam } = req.params;
    if (typeof idParam !== "string") {
      return res.status(400).json({ error: "Invalid ID" });
    }
    const id = parseInt(idParam, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    await userService.deleteUser(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(500).json({ error: "Failed to delete user" });
  }
};