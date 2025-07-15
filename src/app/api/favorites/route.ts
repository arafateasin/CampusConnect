import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import UserProfileModel from "@/models/UserProfile";

export async function POST(request: NextRequest) {
  try {
    const { userId, eventId } = await request.json();

    if (!userId || !eventId) {
      return NextResponse.json(
        { success: false, error: "User ID and Event ID are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Check if already favorited
    const userProfile = await UserProfileModel.findById(userId);
    if (!userProfile) {
      return NextResponse.json(
        { success: false, error: "User profile not found" },
        { status: 404 }
      );
    }

    const isFavorite = userProfile.favoriteEvents.includes(eventId);

    if (isFavorite) {
      // Remove from favorites
      await UserProfileModel.findByIdAndUpdate(userId, {
        $pull: { favoriteEvents: eventId },
      });
    } else {
      // Add to favorites
      await UserProfileModel.findByIdAndUpdate(userId, {
        $addToSet: { favoriteEvents: eventId },
      });
    }

    return NextResponse.json({
      success: true,
      data: { isFavorite: !isFavorite },
    });
  } catch (error) {
    console.error("Toggle favorite error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to toggle favorite" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId || userId === "undefined") {
      return NextResponse.json(
        { success: false, error: "User ID is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const userProfile = await UserProfileModel.findById(userId);
    if (!userProfile) {
      return NextResponse.json(
        { success: false, error: "User profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: userProfile.favoriteEvents,
    });
  } catch (error) {
    console.error("Get favorites error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to get favorites" },
      { status: 500 }
    );
  }
}
