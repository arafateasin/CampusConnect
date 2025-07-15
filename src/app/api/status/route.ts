import { NextResponse } from "next/server";
import { HybridEventService } from "@/lib/hybridEventService";

export async function GET() {
  try {
    await HybridEventService.initialize();

    const status = {
      database: HybridEventService.getConnectionStatus(),
      timestamp: new Date().toISOString(),
      isMongoDb: HybridEventService.getConnectionStatus() === "MongoDB Atlas",
    };

    return NextResponse.json({
      success: true,
      data: status,
    });
  } catch (error) {
    console.error("Error getting status:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to get status",
      },
      { status: 500 }
    );
  }
}
