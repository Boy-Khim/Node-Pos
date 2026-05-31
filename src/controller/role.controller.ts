import type { Request, Response } from "express";
import { db } from "../config/helper.js";

export const getListRole = async (req: Request, res: Response) => {
  try {
    const result = await db.query("SELECT *FROM roles");
    return res.status(200).json({
      message: "Get List Role",
      roles: result.rows,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createRole = async (req: Request, res: Response) => {
  try {
    const { name, code } = req.body;
    const result = await db.query(
      "INSERT INTO roles(name,code)VALUES($1,$2)RETURNING *",
      [name, code],
    );
    return res.status(200).json({
      message: "Create Role Scuccess",
      roles: result.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, code } = req.body;
    const result = await db.query(
      "UPDATE roles SET name=$1, code=$2 WHERE id=$3 RETURNING *",
      [name, code, id],
    );
    return res.status(200).json({
      message: "Update Role Scuccess",
      data: result.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
};
export const deleteRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await db.query("DELETE FROM roles WHERE id=$1", [id]);
    return res.status(200).json({
      message: "Delete Role Scuccess",
      data: result.rows,
    });
  } catch (error) {
    console.log(error);
  }
};
