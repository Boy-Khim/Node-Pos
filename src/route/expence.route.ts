import { Router } from "express";
import {
  getListExpense,
  createExpense,
} from "../controller/expenses.controller.js";
import { validate_token } from "../controller/auth.controller.js";
const route = Router();

route.get("/", validate_token(), getListExpense);
route.post("/", validate_token(), createExpense);

export default route;
