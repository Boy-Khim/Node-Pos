import { Router } from "express";
import { getConfig } from "../controller/config.controller.js";
import { validate_token } from "../controller/auth.controller.js";

const router = Router();

router.get("/", validate_token(), getConfig);
export default router;
