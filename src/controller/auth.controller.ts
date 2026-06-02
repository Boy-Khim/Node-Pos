import type { NextFunction, Request, Response } from "express";
import { db } from "../config/helper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const getListUser = async (req: Request, res: Response) => {
  try {
    const result = await db.query(
      `
  SELECT
      u.id,
      u.name,
      u.username,
      u.is_active,
      r.name AS role_name
  FROM users u
  INNER JOIN roles r
      ON u.role_id = r.id
  `,
    );
    return res.status(201).json({
      message: "List User",
      user: result.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
export const register = async (req: Request, res: Response) => {
  try {
    const { name, username, password, is_active, role_id, create_by } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      `INSERT INTO users (name, username, password, is_active, role_id,create_by)
       VALUES ($1, $2, $3, $4, $5,$6)
       RETURNING *`,
      [name, username, hashedPassword, is_active, role_id, create_by],
    );
    return res.status(201).json({
      message: "User registered successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // const result = await db.query(`SELECT * FROM users WHERE username = $1`,
    //   [
    //   username,
    // ]);
    const result = await db.query(
      `
  SELECT
    u.*,
    r.name AS role_name
  FROM "users" u
  INNER JOIN roles r ON u.role_id = r.id
  WHERE u.username = $1
`,
      [username],
    );
    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Username Don't not Exist" });
    }
    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password incorrect" });
    }
    const obj = {
      data: result.rows[0],
      permission: ["view_all", "delete", "update"],
    };
    return res.status(200).json({
      message: "Login successful",
      ...obj,
      access_token: await getAccessToken(obj),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
export const getProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await db.query("SELECT *FROM users WHERE id=$1", [id]);
    return res.status(200).json({
      data: result.rows.length > 0 ? result.rows[0] : null,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
const getAccessToken = async (obj: any) => {
  const key = process.env.jwtKey as string;

  const access_token = await jwt.sign({ data: obj }, key, {
    expiresIn: "1d",
  });

  return access_token;
};
export const validate_token = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;
    const key = process.env.jwtKey as string;
    // console.log("Authorization header:", authorization); // ← add this

    let token_from_client = null;
    if (authorization != null && authorization != "") {
      token_from_client = authorization.split(" ");
      token_from_client = token_from_client[1];
    }
    if (token_from_client == null) {
      res.status(401).send({
        message: "Uauthorized",
      });
    } else {
      jwt.verify(token_from_client, key, (error, result) => {
        if (error) {
          // console.log("JWT error:", error.message); // ← check what error you get

          return res.status(401).send({ message: "Unauthorized" }); // ← add return
        } else {
          next();
        }
      });
    }
  };
};
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM users WHERE id=$1", [id]);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, username, password, is_active, role_id, create_by } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      `UPDATE users SET name=$1, username=$2, password=$3, is_active=$4, role_id=$5, create_by=$6 WHERE id=$7 RETURNING *`,
      [name, username, hashedPassword, is_active, role_id, create_by, id],
    );
    return res.status(200).json({
      message: "User updated successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
