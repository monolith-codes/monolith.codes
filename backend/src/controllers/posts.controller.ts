import type { Request, Response } from 'express';
import * as userService from '../services/posts.service';

export const getPosts = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllPosts();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};