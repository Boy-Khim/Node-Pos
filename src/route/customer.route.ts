import { Router } from "express";
import {
  getlistCustomer,
  createCustomer,
  updateCustomer,
  deleteSupplier,
} from "../controller/customer.controller.js";
import { validate_token } from "../controller/auth.controller.js";

const route = Router();
route.get("/", validate_token(), getlistCustomer);
route.post("/", validate_token(), createCustomer);
route.put("/:id", validate_token(), updateCustomer);
route.delete("/:id", validate_token(), deleteSupplier);

export default route;
