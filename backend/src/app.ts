// src/app.ts
import express from "express";
import cors from "cors";
import globalErrorHandler from "./middleware/globalErrorHandler";
import userRoute from "./routes/userRoute";
import cookieParser from "cookie-parser";
import tripRoute from "./routes/tripRoute";
import hotelRoutes from "./routes/hotelRoute";
import flightRouter from "./routes/flightRoute";

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/users/", userRoute);
app.use("/api/trips/", tripRoute);
app.use("/api/hotels", hotelRoutes);
app.use("/api", flightRouter);

app.use(globalErrorHandler);

export default app;
