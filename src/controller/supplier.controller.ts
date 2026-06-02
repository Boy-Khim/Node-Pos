import type { Response, Request } from "express";
import { db } from "../config/helper.js";

export const getListSupplier = async (req: Request, res: Response) => {
  try {
    const result = await db.query("SELECT * FROM supplier");
    return res.status(200).json({
      message: "Get List Category",
      data: result.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
export const createSupplier = async (req: Request, res: Response) => {
  try {
    const { name, code, tel, email, address, website, note } = req.body;
    const result = await db.query(
      `INSERT INTO supplier (name, code, tel, email, address, website, note)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [name, code, tel, email, address, website, note],
    );
    return res.status(201).json({
      message: "Supplier created successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
export const updateSupplier = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, code, tel, email, address, website, note } = req.body;
    const result = await db.query(
      `UPDATE supplier
       SET name = $1, code = $2, tel = $3, email = $4, address = $5, website = $6, note = $7
       WHERE id = $8
       RETURNING *`,
      [name, code, tel, email, address, website, note, id],
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    return res.status(200).json({
      message: "Supplier updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
export const deleteSupplier = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await db.query(`DELETE FROM supplier WHERE id = $1`, [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    return res.status(200).json({ message: "Supplier deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
