import type { NextFunction, Request, Response } from "express";
import { db } from "../config/helper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Result } from "pg";
dotenv.config();

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

    const result = await db.query(`SELECT * FROM users WHERE username = $1`, [
      username,
    ]);
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
    const { id } = req.body;

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
    expiresIn: 180,
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
