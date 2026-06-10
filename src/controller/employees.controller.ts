import type { Request, Response } from "express";
import { db } from "../config/helper.js";

export const getListEmplyees = async (req: Request, res: Response) => {
  try {
    const result = await db.query("SELECT *FROM employees *");
    return res.status(200).json({
      message: "List Employees",
      employees: result.rows,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const {
      first_name,
      last_name,
      card_id,
      dob,
      gender,
      tel,
      email,
      base_salary,
      address,
      created_by,
    } = req.body;

    const query = `
      INSERT INTO employees (
        first_name,
        last_name,
        card_id,
        dob,
        gender,
        tel,
        email,
        base_salary,
        address,
        created_by
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *;
    `;

    const values = [
      first_name,
      last_name,
      card_id,
      dob,
      gender,
      tel,
      email,
      base_salary,
      address,
      created_by,
    ];

    const result = await db.query(query, values);

    return res.status(201).json({
      message: "Employee created successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const {
      first_name,
      last_name,
      card_id,
      dob,
      gender,
      tel,
      email,
      base_salary,
      address,
    } = req.body;

    const query = `
      UPDATE employees
      SET 
        first_name = $1,
        last_name = $2,
        card_id = $3,
        dob = $4,
        gender = $5,
        tel = $6,
        email = $7,
        base_salary = $8,
        address = $9
      WHERE id = $10
      RETURNING *;
    `;

    const values = [
      first_name,
      last_name,
      card_id,
      dob,
      gender,
      tel,
      email,
      base_salary,
      address,
      id,
    ];

    const result = await db.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      message: "Employee updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const query = `
      DELETE FROM employees
      WHERE id = $1
      RETURNING *;
    `;

    const result = await db.query(query, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      message: "Employee deleted successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};
