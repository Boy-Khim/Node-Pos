import dotenv from "dotenv";
import app from "./app.js";
import { pool } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    const client = await pool.connect();
    client.release();
    console.log("PostgreSQL Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log("PostgreSQL connection failed:", error);
    process.exit(1);
  }
};

startServer();
