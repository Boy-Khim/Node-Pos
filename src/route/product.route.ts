import { Router } from "express";
import { getListProduct } from "../controller/product.controlller.js";
const route = Router();
route.get("/", getListProduct);

export default route;
