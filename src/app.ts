import express from "express";
import cors from "cors";

import categoryRoute from "./route/category.route.js";
import roleRoute from "./route/role.route.js";
import authRoute from "./route/user.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/categories", categoryRoute);
app.use("/api/auth/roles", roleRoute);
app.use("/api/auth", authRoute);

export default app;
