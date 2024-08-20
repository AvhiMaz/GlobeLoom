import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { config } from "../config/config";

const fetchHotelsByLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { latitude, longitude, checkIn, checkOut, pageNumber, currencyCode } =
    req.body;

  if (!latitude || !longitude || !checkIn || !checkOut) {
    return res.status(400).json({
      status: false,
      message:
        "Missing required query parameters: latitude, longitude, checkIn, checkOut",
    });
  }

  const options = {
    method: "GET",
    url: config.rapidapiurl,
    params: {
      latitude: String(latitude),
      longitude: String(longitude),
      checkIn: String(checkIn),
      checkOut: String(checkOut),
      pageNumber: pageNumber || "1",
      currencyCode: currencyCode || "USD",
    },
    headers: {
      "x-rapidapi-key": config.rapidapiKey,
      "x-rapidapi-host": config.rapidapiHost,
    },
  };

  try {
    const response = await axios.request(options);

    if (response.data && response.data.status === true) {
      res.status(200).json({
        status: true,
        message: "Success",
        timestamp: Date.now(),
        data: response.data,
      });
    } else {
      res.status(400).json({
        status: false,
        message: "Invalid response format or validation errors",
        data: response.data,
      });
    }
  } catch (error: any) {
    console.error("Error fetching hotels:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching hotels", error: error.message });
  }
};

export default { fetchHotelsByLocation };
