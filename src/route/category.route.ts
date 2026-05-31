import { Router } from "express";
import {
  getCategorys,
  createCategory,
  getCategorybyId,
  updateCategory,
  deleteCategory,
} from "../controller/categorys.controller.js";
const router = Router();
router.get("/", getCategorys);
router.post("/", createCategory);
router.get("/:id", getCategorybyId);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
