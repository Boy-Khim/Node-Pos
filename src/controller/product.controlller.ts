import type { Request, Response } from "express";
import { db } from "../config/helper.js";
import { v2 as cloudinary } from "cloudinary";
// ✅ GET all products
export const getListProduct = async (req: Request, res: Response) => {
  try {
    const result = await db.query(
      `
  SELECT 
    p.*,
    c.name AS category_name
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
  `,
    );
    return res.status(200).json({
      message: "List Product",
      product: result.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, brand, description, qty, price, discount, category_id } =
      req.body;
    const image = req.file ? req.file.filename : null;
    const barcodeResult = await db.query(`
      SELECT CONCAT('P', LPAD((SELECT COALESCE(MAX(id), 0) + 1 FROM products)::TEXT, 3, '0')) AS new_barcode
    `);
    const barcode = barcodeResult.rows[0].new_barcode;
    const result = await db.query(
      `INSERT INTO products
  (category_id, barcode, name, brand, description, qty, price, discount, image)
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
  RETURNING *`,
      [
        category_id,
        barcode,
        name,
        brand,
        description,
        qty,
        price,
        discount,
        image,
      ],
    );
    return res.status(201).json({
      message: "Product created successfully",
      product: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, brand, description, qty, price, discount, category_id } =
      req.body;
    const existing = await db.query(
      "SELECT image FROM products WHERE id = $1",
      [id],
    );
    if (existing.rowCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    const oldImage = existing.rows[0].image;
    // new image or keep old
    const newImage = req.file ? req.file.filename : oldImage;
    const result = await db.query(
      `UPDATE products
   SET category_id=$1, name=$2, brand=$3, description=$4,
       qty=$5, price=$6, discount=$7, image=$8
   WHERE id=$9 RETURNING *`,
      [
        category_id,
        name,
        brand,
        description,
        qty,
        price,
        discount,
        newImage,
        id,
      ],
    );
    return res.status(200).json({
      message: "Product updated successfully",
      product: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
// ✅ DELETE product + its image
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const existing = await db.query(
      "SELECT image FROM products WHERE id = $1",
      [id],
    );
    if (existing.rowCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    const image = existing.rows[0].image;
    if (image) {
      await cloudinary.uploader.destroy(image);
    }
    await db.query("DELETE FROM products WHERE id = $1", [id]);

    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
// ✅ GET new barcode
export const newBarcode = async (req: Request, res: Response) => {
  try {
    const result = await db.query(
      `SELECT CONCAT('P', LPAD((SELECT COALESCE(MAX(id), 0) + 1 FROM products)::TEXT, 3, '0')) AS new_barcode`,
    );
    return res.status(200).json({ new_barcode: result.rows[0].new_barcode });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
