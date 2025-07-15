import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  college: {
    type: String,
    required: true,
    trim: true,
  },
  eventType: {
    type: String,
    required: true,
    enum: ["hackathon", "tech-talk", "workshop"],
  },
  link: {
    type: String,
    required: true,
    trim: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  createdBy: {
    type: String,
    default: "anonymous",
  },
  // Registration system
  registrationEnabled: {
    type: Boolean,
    default: false,
  },
  registrationDeadline: {
    type: Date,
  },
  maxParticipants: {
    type: Number,
  },
  registeredUsers: {
    type: [String],
    default: [],
  },
  registrationCount: {
    type: Number,
    default: 0,
  },
  // Additional features
  isFeatured: {
    type: Boolean,
    default: false,
  },
  imageUrl: {
    type: String,
    trim: true,
  },
  organizer: {
    type: String,
    trim: true,
  },
  contactEmail: {
    type: String,
    trim: true,
  },
  prerequisites: {
    type: [String],
    default: [],
  },
  price: {
    type: Number,
    default: 0,
  },
  currency: {
    type: String,
    default: "USD",
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
EventSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Create indexes for better performance
EventSchema.index({ college: 1 });
EventSchema.index({ eventType: 1 });
EventSchema.index({ date: 1 });
EventSchema.index({ tags: 1 });
EventSchema.index({ createdBy: 1 });

export default mongoose.models.Event || mongoose.model("Event", EventSchema);
