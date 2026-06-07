import type { Request, Response } from "express";
import { db } from "../config/helper.js";
import type e from "express";

export const getlistCustomer = async (req: Request, res: Response) => {
  try {
    const result = await db.query("SELECT *FROM customers ORDER BY id DESC");
    return res.status(200).json({
      message: "List Customers",
      customers: result.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
export const createCustomer = async (req: Request, res: Response) => {
  try {
    const { name, tel, address, email, type } = req.body;
    const result = await db.query(
      "INSERT INTO customers(name,tel,address,email,type) VALUES($1,$2,$3,$4,$5) RETURNING *",
      [name, tel, address, email, type],
    );
    return res.status(200).json({
      message: "Create Success",
      customers: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, tel, address, email, type } = req.body;
    const result = await db.query(
      "UPDATE customers SET name=$1,tel=$2,address=$3,email=$4,type=$5 WHERE id=$6 RETURNING *",
      [name, tel, address, email, type, id],
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }
    return res.status(200).json({
      message: "Update Success",
      customers: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
export const deleteSupplier = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      `DELETE FROM customers WHERE id = $1 RETURNING *`,
      [id],
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Customers not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
