import { Request, Response } from "express";
import Trip from "../models/tripModel";
import User from "../models/userModel";
import mongoose from "mongoose";

const createTrip = async (req: Request, res: Response) => {
  const { userId, name, startDate, endDate, itinerary } = req.body;

  try {
    // Validate if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new trip
    const newTrip = new Trip({
      user: new mongoose.Types.ObjectId(userId),
      name,
      startDate,
      endDate,
      itinerary,
    });

    const savedTrip = await newTrip.save();

    // Add the trip to the user's trips array
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
