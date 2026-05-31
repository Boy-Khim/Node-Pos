import { Router } from "express";
import {
  register,
  login,
  getProfile,
  validate_token, // ← fix typo here
} from "../controller/auth.controller.js";

const router = Router();

router.post("/register", register);
router.get("/login", login);
router.get("/profile", validate_token(), getProfile); // ← and here

export default router;
