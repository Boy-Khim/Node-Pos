import { Router } from "express";
import {
  getListEmplyees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controller/employees.controller.js";
import { validate_token } from "../controller/auth.controller.js";

const route = Router();

route.get("/", validate_token(), getListEmplyees);
route.post("/", validate_token(), createEmployee);
route.put("/:id", validate_token(), updateEmployee);
route.delete("/:id", validate_token(), deleteEmployee);

export default route;
