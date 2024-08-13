import express from "express";
import createUser from "../controllers/userControllers";

const userRoute = express.Router();

userRoute.post("/register", createUser);

export default userRoute;
