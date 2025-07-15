import { NextResponse } from "next/server";
import { HybridEventService } from "@/lib/hybridEventService";

export async function GET() {
  try {
    await HybridEventService.initialize();

    const colleges = await HybridEventService.getColleges();

    return NextResponse.json({
      success: true,
      data: colleges,
      database: HybridEventService.getConnectionStatus(),
    });
  } catch (error) {
    console.error("Error fetching colleges:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch colleges",
      },
      { status: 500 }
    );
  }
}
