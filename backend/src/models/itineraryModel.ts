import mongoose from "mongoose";
import { Itinerary } from "../types/itineraryTypes";

const itinerarySchema = new mongoose.Schema<Itinerary>(
  {
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },
    day: {
      type: Number,
      required: true,
    },
    activities: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Itinerary>("Itinerary", itinerarySchema);
