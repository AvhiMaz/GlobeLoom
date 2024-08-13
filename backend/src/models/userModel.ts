import mongoose from "mongoose";
import { User } from "../types/userTypes";

const userSchema = new mongoose.Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    trips: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trip",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<User>("user", userSchema);
