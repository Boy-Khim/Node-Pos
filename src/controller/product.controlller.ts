import { db } from "../config/helper.js";
import type { Request, Response } from "express";

export const getListProduct = async (req: Request, res: Response) => {
  try {
    const result = await db.query(`
      SELECT 
        p.*,
        c.name AS category_name
      FROM products p
      INNER JOIN categories c ON p.category_id = c.id
    `);

    return res.status(200).json({
      message: "Get List Product",
      products: result.rows,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
