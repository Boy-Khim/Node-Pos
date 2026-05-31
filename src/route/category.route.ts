import { Router } from "express";
import {
  getCategorys,
  createCategory,
  getCategorybyId,
  updateCategory,
  deleteCategory,
} from "../controller/categorys.controller.js";

import { validate_token } from "../controller/auth.controller.js";
const router = Router();
router.get("/", validate_token(), getCategorys);
router.post("/", validate_token(), createCategory);
router.get("/:id", validate_token(), getCategorybyId);
router.put("/:id", validate_token(), updateCategory);
router.delete("/:id", validate_token(), deleteCategory);

export default router;
