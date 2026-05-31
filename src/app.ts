import express from "express";
import categoryRoute from "./route/category.route.js";
import authRoute from "./route/user.route.js";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/categories", categoryRoute);
app.use("/api/auth", authRoute);

export default app;
