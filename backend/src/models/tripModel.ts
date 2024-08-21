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
    aiGeneratedContent: {
      type: String,
    },
    itinerary: [
      {
        day: {
          type: Number,
        },
        activities: [
          {
            time: {
              type: String,
            },
            description: {
              type: String,
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Trip>("Trip", tripSchema);
