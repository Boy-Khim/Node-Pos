import { Router } from "express";
import {
  getListSupplier,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "../controller/supplier.controller.js";
import { validate_token } from "../controller/auth.controller.js";

const router = Router();

router.get("/", validate_token(), getListSupplier);
router.post("/", validate_token(), createSupplier);
router.put("/:id", validate_token(), updateSupplier);
router.delete("/:id", validate_token(), deleteSupplier);

export default router;
