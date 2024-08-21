// src/types/tripTypes.ts

import mongoose from "mongoose";

export interface Activity {
  time: string;
  description: string;
}

export interface ItineraryDay {
  day: number;
  activities: Activity[];
}

export interface Trip {
  user: mongoose.Schema.Types.ObjectId;
  name: string;
  startDate: Date;
  endDate: Date;
  destinations?: mongoose.Schema.Types.ObjectId[];
  itinerary: ItineraryDay[]; // Add the itinerary field here
  aiGeneratedContent?: string;
}
