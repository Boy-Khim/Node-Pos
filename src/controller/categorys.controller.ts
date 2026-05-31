import type { Request, Response } from "express";
import { db } from "../config/helper.js";
export const getCategorys = async (req: Request, res: Response) => {
  try {
    const result = await db.query("SELECT *FROM categories");
    return res.status(200).json({
      message: "Get List Category",
      data: result.rows,
    });
  } catch (e) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description, status } = req.body;

    const result = await db.query(
      "INSERT INTO categories(name, description, status) VALUES($1, $2, $3) RETURNING *",
      [name, description, status],
    );

    res.status(201).json(result.rows[0]);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
export const getCategorybyId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await db.query("SELECT * FROM categories WHERE id = $1", [
      id,
    ]);

    res.status(200).json({
      message: "Get One Category",
      data: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, status } = req.body;
    const result = await db.query(
      "UPDATE categories SET name=$1, description=$2, status=$3 WHERE id=$4 RETURNING *",
      [name, description, status, id],
    );
    res.status(200).json(result.rows[0]);
  } catch (e) {
    res.status(500).json({
      message: "Server Error",
    });
    console.log(e);
  }
};
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await db.query("DELETE from categories WHERE id=$1", [id]);
    res.status(200).json(result.rows[0]);
  } catch (e) {
    res.status(500).json({
      message: "Server Error",
    });
    console.log(e);
  }
};
