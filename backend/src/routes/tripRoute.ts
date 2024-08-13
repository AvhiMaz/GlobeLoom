import express from "express";
import {
  createTrip,
  deleteTrip,
  getTripById,
  getTripsByUser,
  updateTrip,
} from "../controllers/tripControllers";

const tripRoute = express.Router();

tripRoute.post("/", createTrip);
tripRoute.get("/user/:userId", getTripsByUser);
tripRoute.get("/:tripId", getTripById);
tripRoute.put("/:tripId", updateTrip);
tripRoute.delete("/:tripId", deleteTrip);

export default tripRoute;
