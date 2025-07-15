import { NextResponse } from "next/server";
import { HybridEventService } from "@/lib/hybridEventService";

export async function GET() {
  try {
    await HybridEventService.initialize();

    const stats = await HybridEventService.getEventStats();

    return NextResponse.json({
      success: true,
      data: stats,
      database: HybridEventService.getConnectionStatus(),
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch stats",
      },
      { status: 500 }
    );
  }
}
