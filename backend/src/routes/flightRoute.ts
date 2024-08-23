import express from "express";
import flightControllers from "../controllers/flightControllers";

const flightRouter = express.Router();

flightRouter.post("/flights/search", flightControllers.searchFlights);

export default flightRouter;

