import type { Request, Response } from "express";
import { db } from "../config/helper.js";

export const getListExpense = async (req: Request, res: Response) => {
  try {
    const result = await db.query(`
      SELECT
        e.id,
        e.expense_type_id,
        e.ref_no,
        e.name,
        et.name AS expense_type,
        e.amount,
        e.remark,
        e.expense_date
      FROM expenses e
      INNER JOIN expense_types et
        ON e.expense_type_id = et.id
      ORDER BY e.id DESC
    `);

    return res.status(200).json({
      message: "List Expenses",
      expenses: result.rows,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};
export const createExpense = async (req: Request, res: Response) => {
  try {
    const { expense_type_id, ref_no, name, amount, remark, expense_date } =
      req.body;

    const result = await db.query(
      `
      INSERT INTO expenses (
        expense_type_id,
        ref_no,
        name,
        amount,
        remark,
        expense_date
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
      `,
      [expense_type_id, ref_no, name, amount, remark, expense_date],
    );

    return res.status(201).json({
      message: "Expense created successfully",
      expense: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};
