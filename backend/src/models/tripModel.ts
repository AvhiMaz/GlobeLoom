import mongoose from "mongoose";
import { Trip } from "../types/tripTypes";

const tripSchema = new mongoose.Schema<Trip>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    destinations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Destination",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Trip>("Trip", tripSchema);
