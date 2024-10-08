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

    const token = jwt.sign({ id: newUser._id }, config.jwtSecret as string, {
      expiresIn: "7d",
    });

    res.status(201).json({ accessToken: token, user: newUser._id });
  } catch (error) {
    return next(createHttpError(500, "failed to create user"));
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(createHttpError(400, "All fields are required"));
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return next(createHttpError(401, "Invalid credentials"));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(createHttpError(401, "Invalid credentials"));
    }

    const token = jwt.sign({ id: user._id }, config.jwtSecret as string, {
      expiresIn: "7d",
    });
    res.status(200).json({ accessToken: token, user: user._id });
  } catch (error) {
    return next(createHttpError(500, "failed to login"));
  }
};

const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.accessToken;

    if (token) {
      const decodedToken: any = jwt.verify(token, config.jwtSecret as string);
      const userId = decodedToken.sub;
      const user = await userModel.findById(userId);

      if (!user) {
        return next(createHttpError(404, "User not found"));
      }
    }

    res.clearCookie("accessToken");
    res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    return next(
      createHttpError(500, "Failed to log out. Please try again later.")
    );
  }
};

export { createUser, loginUser, logoutUser };
