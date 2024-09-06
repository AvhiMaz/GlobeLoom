import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import Trip from "../models/tripModel";
import mongoose from "mongoose";
import { config } from "../config/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const createTrip = async (req: Request, res: Response, next: NextFunction) => {
  const { userId, name, startDate, endDate, budget } = req.body;

  if (!name || !startDate || !endDate || !budget) {
    return res.status(400).json({
      message:
        "Missing required parameters: userId, name, startDate, endDate, budget",
    });
  }

  try {
    // Initialize the AI model
    const genAI = new GoogleGenerativeAI(config.geminiApi as string);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Create a prompt based on the trip name, start date, and end date
    const prompt = `Create a detailed travel itinerary for a trip to ${name} from ${startDate} to ${endDate} with a budget of ${budget}. The itinerary should be in plain text format without any special characters for formatting or emojis. The response should include the following details in a clear and structured manner:

1. A brief overview of the trip
2. The places to visit, with each place listed clearly
3. The activities to do, listed by day
4. The food to eat, including recommendations for each day
5. The transportation to use, with details on how to get around
6. The accommodation to stay, with a description
7. The budget breakdown, with approximate costs for each category
8. The packing list, including essentials to bring

Ensure the content is organized and easy to read, avoiding any bold text, italics, or other special formatting.
`;

    // Generate the itinerary from the AI model
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = await response.text();

    if (config.nodeEnv === "development") {
      console.log(text);
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new trip with the AI-generated itinerary
    const newTrip = new Trip({
      user: new mongoose.Types.ObjectId(userId),
      name,
      startDate,
      endDate,
      aiGeneratedContent: text,
    });

    // Save the new trip and associate it with the user
    const savedTrip = await newTrip.save();
    user.trips.push(savedTrip._id.toString());
    await user.save();

    res.status(201).json(savedTrip);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getTripsByUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const trips = await Trip.find({
      user: new mongoose.Types.ObjectId(userId),
    });

    if (!trips || trips.length === 0) {
      return res.status(404).json({ message: "No trips found for this user" });
    }

    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getTripById = async (req: Request, res: Response) => {
  const { tripId } = req.params;

  try {
    const trip = await Trip.findById(tripId);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const updateTrip = async (req: Request, res: Response) => {
  const { tripId } = req.params;
  const { name, startDate, endDate, itinerary } = req.body;

  try {
    const updatedTrip = await Trip.findByIdAndUpdate(
      tripId,
      { name, startDate, endDate, itinerary },
      { new: true }
    );

    if (!updatedTrip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.status(200).json(updatedTrip);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const deleteTrip = async (req: Request, res: Response) => {
  const { tripId } = req.params;

  try {
    const deletedTrip = await Trip.findByIdAndDelete(tripId);

    if (!deletedTrip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    // Remove the trip from the user's trips array
    await User.updateOne(
      { _id: deletedTrip.user },
      { $pull: { trips: tripId } }
    );

    res.status(200).json({ message: "Trip deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export { createTrip, getTripsByUser, getTripById, updateTrip, deleteTrip };
