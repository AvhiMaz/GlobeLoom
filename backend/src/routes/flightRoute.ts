import express from "express";
import flightControllers from "../controllers/flightControllers";

const flightRouter = express.Router();

// POST route to search for flights
flightRouter.post("/flights/search", flightControllers.searchFlights);

export default flightRouter;
