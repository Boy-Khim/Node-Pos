import type { Request, Response } from "express";
import { db } from "../config/helper.js";

export const getConfig = async (req: Request, res: Response) => {
  try {
    const role = await db.query("SELECT  id,name FROM roles ORDER BY id DESC");
    const category = await db.query(`
  SELECT id,name FROM categories ORDER BY id DESC
`);
    const supplier = await db.query(
      "SELECT id,name FROM supplier ORDER BY id DESC",
    );
    const brands = [
      { name: "Apple", country: "USA" },
      { name: "Samsung", country: "South Korea" },
      { name: "Xiaomi", country: "China" },
      { name: "Huawei", country: "China" },
      { name: "Oppo", country: "China" },
      { name: "Vivo", country: "China" },
      { name: "Sony", country: "Japan" },
      { name: "LG", country: "South Korea" },
      { name: "Google", country: "USA" },
      { name: "OnePlus", country: "China" },
      { name: "Nokia", country: "Finland" },
      { name: "Realme", country: "China" },
      { name: "Asus", country: "Taiwan" },
      { name: "Lenovo", country: "China" },
      { name: "Motorola", country: "USA" },
    ];
    return res.status(200).json({
      message: "Get Config",
      data: {
        role: role.rows,
        category: category.rows,
        supplier: supplier.rows,
        brands: brands,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
