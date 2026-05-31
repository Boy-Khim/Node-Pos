import { Router } from "express";
import {
  register,
  login,
  getProfile,
  validate_token,
  getListUser,
} from "../controller/auth.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", validate_token(), getProfile);
router.get("/list-users", validate_token(), getListUser); // ← and here
// ← and here

export default router;
