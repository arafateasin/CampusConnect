import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import EventModel from "@/models/Event";
import EventRegistrationModel from "@/models/EventRegistration";
import NotificationModel from "@/models/Notification";

export async function POST(request: NextRequest) {
  try {
    const { eventId, userId, additionalInfo } = await request.json();

    if (!eventId || !userId) {
      return NextResponse.json(
        { success: false, error: "Event ID and User ID are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Check if event exists and has registration enabled
    const event = await EventModel.findById(eventId);
    if (!event) {
      return NextResponse.json(
        { success: false, error: "Event not found" },
        { status: 404 }
      );
    }

    if (!event.registrationEnabled) {
      return NextResponse.json(
        { success: false, error: "Registration is not enabled for this event" },
        { status: 400 }
      );
    }

    // Check if registration deadline has passed
    if (
      event.registrationDeadline &&
      new Date() > new Date(event.registrationDeadline)
    ) {
      return NextResponse.json(
        { success: false, error: "Registration deadline has passed" },
        { status: 400 }
      );
    }

    // Check if user is already registered
    const existingRegistration = await EventRegistrationModel.findOne({
      eventId,
      userId,
    });

    if (existingRegistration) {
      return NextResponse.json(
        { success: false, error: "User is already registered for this event" },
        { status: 400 }
      );
    }

    // Check if event is full
    const registrationCount = await EventRegistrationModel.countDocuments({
      eventId,
      status: "confirmed",
    });

    const status =
      event.maxParticipants && registrationCount >= event.maxParticipants
        ? "waitlisted"
        : "confirmed";

    // Create registration
    const registration = new EventRegistrationModel({
      eventId,
      userId,
      status,
      additionalInfo,
    });

    await registration.save();

    // Update event registration count
    await EventModel.findByIdAndUpdate(eventId, {
      $inc: { registrationCount: 1 },
      $addToSet: { registeredUsers: userId },
    });

    // Create notification
    const notification = new NotificationModel({
      userId,
      type: "registration_confirmed",
      title: "Registration Confirmed",
      message: `You have been ${status} for "${event.title}"`,
      eventId,
    });

    await notification.save();

    return NextResponse.json({
      success: true,
      data: {
        registration,
        status,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to register for event" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get("eventId");
    const userId = searchParams.get("userId");

    await connectToDatabase();

    let query = {};
    if (eventId && eventId !== "undefined") query = { ...query, eventId };
    if (userId && userId !== "undefined") query = { ...query, userId };

    const registrations = await EventRegistrationModel.find(query).sort({
      registeredAt: -1,
    });

    return NextResponse.json({
      success: true,
      data: registrations,
    });
  } catch (error) {
    console.error("Get registrations error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to get registrations" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { eventId, userId } = await request.json();

    if (!eventId || !userId) {
      return NextResponse.json(
        { success: false, error: "Event ID and User ID are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Find and delete registration
    const registration = await EventRegistrationModel.findOneAndDelete({
      eventId,
      userId,
    });

    if (!registration) {
      return NextResponse.json(
        { success: false, error: "Registration not found" },
        { status: 404 }
      );
    }

    // Update event registration count
    await EventModel.findByIdAndUpdate(eventId, {
      $inc: { registrationCount: -1 },
      $pull: { registeredUsers: userId },
    });

    return NextResponse.json({
      success: true,
      message: "Registration cancelled successfully",
    });
  } catch (error) {
    console.error("Cancel registration error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to cancel registration" },
      { status: 500 }
    );
  }
}
