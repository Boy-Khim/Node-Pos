import express from "express";
import cors from "cors";

import categoryRoute from "./route/category.route.js";
import roleRoute from "./route/role.route.js";
import authRoute from "./route/user.route.js";
import supplierRoute from "./route/supplier.router.js";
import configRoute from "./route/config.route.js";
import productRoute from "./route/product.route.js";
import customerRouter from "./route/customer.route.js";
import expensesRouter from "./route/expence.route.js";
import employeesRouter from "./route/exployees.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/categories", categoryRoute);
app.use("/api/auth/roles", roleRoute);
app.use("/api/auth", authRoute);
app.use("/api/suppliers", supplierRoute);
app.use("/api/config", configRoute);
app.use("/api/products", productRoute);
app.use("/api/customers", customerRouter);
app.use("/api/expenses", expensesRouter);
app.use("/api/employees", employeesRouter);

export default app;
