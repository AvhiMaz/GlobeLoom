import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import userModel from "../models/userModel";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(createHttpError(400, "All fields are required"));
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser._id }, config.jwtSecret as string);

    res.status(201).json({ accessToken: token });
  } catch (error) {
    return next(createHttpError(500, "failed to create user"));
  }
};

export default createUser;
