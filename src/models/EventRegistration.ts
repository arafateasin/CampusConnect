import mongoose from "mongoose";

const EventRegistrationSchema = new mongoose.Schema({
  eventId: {
    type: String,
    required: true,
    index: true,
  },
  userId: {
    type: String,
    required: true,
    index: true,
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["confirmed", "waitlisted", "cancelled"],
    default: "confirmed",
  },
  additionalInfo: {
    type: String,
    maxlength: 1000,
  },
});

// Create compound index for eventId and userId
EventRegistrationSchema.index({ eventId: 1, userId: 1 }, { unique: true });

export default mongoose.models.EventRegistration ||
  mongoose.model("EventRegistration", EventRegistrationSchema);
