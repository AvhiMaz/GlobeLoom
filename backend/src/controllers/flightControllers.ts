import { Request, Response } from "express";
import axios from "axios";
import { config } from "../config/config";

const searchFlights = async (req: Request, res: Response) => {
  const {
    sourceAirportCode,
    destinationAirportCode,
    date,
    itineraryType,
    sortOrder,
    numAdults,
    numSeniors,
    classOfService,
    returnDate,
    pageNumber,
    nearby,
    nonstop,
    currencyCode,
    region,
  } = req.body;

  const options = {
    method: "GET",
    url: config.flightapiUrl,
    params: {
      sourceAirportCode,
      destinationAirportCode,
      date,
      itineraryType,
      sortOrder,
      numAdults,
      numSeniors,
      classOfService,
      returnDate,
      pageNumber,
      nearby,
      nonstop,
      currencyCode,
      region,
    },
    headers: {
      "x-rapidapi-key": config.rapidapiKey,
      "x-rapidapi-host": config.rapidapiHost,
    },
  };

  try {
    const response = await axios.request(options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch flight data" });
  }
};

export default { searchFlights };
