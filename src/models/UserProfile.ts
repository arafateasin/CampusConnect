import mongoose from "mongoose";

const UserProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  college: {
    type: String,
    trim: true,
  },
  year: {
    type: String,
    trim: true,
  },
  major: {
    type: String,
    trim: true,
  },
  interests: {
    type: [String],
    enum: ["hackathon", "tech-talk", "workshop"],
    default: [],
  },
  bio: {
    type: String,
    maxlength: 500,
  },
  socialLinks: {
    github: {
      type: String,
      trim: true,
    },
    linkedin: {
      type: String,
      trim: true,
    },
    twitter: {
      type: String,
      trim: true,
    },
  },
  favoriteEvents: {
    type: [String],
    default: [],
  },
  registeredEvents: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
UserProfileSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Create indexes for better performance
UserProfileSchema.index({ college: 1 });
UserProfileSchema.index({ interests: 1 });

export default mongoose.models.UserProfile ||
  mongoose.model("UserProfile", UserProfileSchema);
