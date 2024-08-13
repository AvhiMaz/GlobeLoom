import mongoose from "mongoose";
import { Hotel } from "../types/hotelTypes";

const hotelSchema = new mongoose.Schema<Hotel>(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    pricePerNight: {
      type: Number,
      required: true,
    },
    amenities: [
      {
        type: String,
      },
    ],
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

hotelSchema.index({ location: "2dsphere" });

export default mongoose.model<Hotel>("Hotel", hotelSchema);
