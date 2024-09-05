import { Router } from "express";
import hotelControllers from "../controllers/hotelControllers";

const hotelRoutes = Router();

hotelRoutes.post("/cities", hotelControllers.fetchHotelsByCity);

export default hotelRoutes;
