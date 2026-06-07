import { Router } from "express";
import { upload } from "../config/storage.js";
import {
  getListProduct,
  createProduct,
  newBarcode,
  updateProduct,
  deleteProduct,
} from "../controller/product.controlller.js";
import { validate_token } from "../controller/auth.controller.js";
const route = Router();
route.get("/", validate_token(), getListProduct);
route.post("/", validate_token(), upload.single("image"), createProduct);
route.get("/new-barcode", validate_token(), newBarcode);
route.put("/:id", validate_token(), upload.single("image"), updateProduct);
route.delete("/:id", validate_token(), deleteProduct);

export default route;
