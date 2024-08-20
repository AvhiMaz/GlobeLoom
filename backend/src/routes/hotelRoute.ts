import { Router } from "express";
import hotelControllers from "../controllers/hotelControllers";

const hotelRoutes = Router();

hotelRoutes.get("/cities", hotelControllers.fetchHotelsByLocation);

export default hotelRoutes;
