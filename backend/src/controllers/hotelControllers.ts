import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { config } from "../config/config";

const fetchHotelsByCity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { cityName, checkIn, checkOut, pageNumber, currencyCode } = req.body;

  if (!cityName || !checkIn || !checkOut) {
    return res.status(400).json({
      status: false,
      message: "Missing required parameters: cityName, checkIn, checkOut",
    });
  }

  const geocodeOptions = {
    method: "GET",
    url: config.geoCodeapiUrl,
    params: {
      address: cityName,
      language: "en",
    },
    headers: {
      "x-rapidapi-key": config.rapidapiKey,
      "x-rapidapi-host": config.rapidapiHost2,
    },
  };

  try {
    const geocodeResponse = await axios.request(geocodeOptions);
    const { results } = geocodeResponse.data;

    if (!results || results.length === 0) {
      return res.status(404).json({
        status: false,
        message: "City not found",
      });
    }

    const { location } = results[0];
    const { lat, lng } = location;

    const hotelOptions = {
      method: "GET",
      url: config.bookingdotcomapiurl,
      params: {
        latitude: lat,
        longitude: lng,
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

    const hotelResponse = await axios.request(hotelOptions);

    if (hotelResponse.data && hotelResponse.data.status === true) {
      const filteredData = hotelResponse.data.data.data.map((hotel: any) => ({
        id: hotel.id,
        title: hotel.title,
        location: hotel.secondaryInfo,
        rating: hotel.bubbleRating?.rating,
        reviewCount: hotel.bubbleRating?.count,
        imageUrls: hotel.cardPhotos.map((photo: any) =>
          photo.sizes.urlTemplate
            .replace("{width}", "500")
            .replace("{height}", "300")
        ),
      }));

      res.status(200).json({
        status: true,
        message: "Success",
        timestamp: Date.now(),
        data: filteredData,
      });
    } else {
      res.status(400).json({
        status: false,
        message: "Invalid response format or validation errors",
        data: hotelResponse.data,
      });
    }
  } catch (error: any) {
    console.error(
      "Error fetching data:",
      error.response?.data || error.message
    );
    res
      .status(500)
      .json({ message: "Error fetching data", error: error.message });
  }
};

export default { fetchHotelsByCity };
