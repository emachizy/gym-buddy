import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },

  password: {
    type: String,
    required: true,
  },
  verifyOtp: {
    type: String,
    default: "",
  },
  verifyOtpExpiresAt: {
    type: Number,
    default: 0,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  resetOtp: {
    type: String,
    default: "",
  },
  resetOtpExpiresAt: {
    type: Number,
    default: 0,
  },

  // Profile Setup Fields
  fitnessGoal: { type: String },
  preferredTime: { type: String },
  availability: [{ type: String }], // e.g., ["Mon", "Wed", "Fri"]
  // ...existing code...
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
      default: [0, 0],
    },
  },
});

userSchema.index({ location: "2dsphere" }); // Enables geospatial queries

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
