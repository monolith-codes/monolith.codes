import { Router } from "express";
import {
  getTechStackItems,
  getTechStackItemById,
  createTechStackItem,
  updateTechStackItem,
  deleteTechStackItem
} from "../controllers/techstack.controller";

const router = Router();

router.get("/", getTechStackItems);
router.get("/:id", getTechStackItemById);
router.post("/", createTechStackItem);
router.put("/:id", updateTechStackItem);
router.delete("/:id", deleteTechStackItem);

export default router;
