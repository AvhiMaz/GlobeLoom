import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
} from "../controllers/userControllers";

const userRoute = express.Router();

userRoute.post("/register", createUser);
userRoute.post("/login", loginUser);
userRoute.post("/logout", logoutUser);

export default userRoute;
