import { Router } from "express";
import {
  getListRole,
  createRole,
  updateRole,
  deleteRole,
} from "../controller/role.controller.js";
import { validate_token } from "../controller/auth.controller.js";

const router = Router();

router.get("/", validate_token(), getListRole);
router.post("/", validate_token(), createRole);
router.put("/:id", validate_token(), updateRole);
router.delete("/:id", validate_token(), deleteRole);

export default router;
