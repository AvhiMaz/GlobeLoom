import express from "express";
import { createUser, loginUser } from "../controllers/userControllers";

const userRoute = express.Router();

userRoute.post("/register", createUser);

userRoute.post("/login", loginUser);

export default userRoute;
