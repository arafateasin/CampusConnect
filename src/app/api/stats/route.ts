import { NextResponse } from "next/server";
import { HybridEventService } from "@/lib/hybridEventService";

export async function GET() {
  try {
    console.log("🔍 Stats API: Starting");
    console.log("🔍 Environment check:", {
      NODE_ENV: process.env.NODE_ENV,
      hasMongoURI: !!process.env.MONGODB_URI,
      mongoURI: process.env.MONGODB_URI ? "***" + process.env.MONGODB_URI.slice(-10) : "missing"
    });
    
    console.log("🔍 Stats API: Initializing HybridEventService");
    await HybridEventService.initialize();

    console.log("📊 Stats API: Fetching event stats");
    const stats = await HybridEventService.getEventStats();
    
    console.log("✅ Stats API: Successfully fetched stats", stats);

    return NextResponse.json({
      success: true,
      data: stats,
      database: HybridEventService.getConnectionStatus(),
    });
  } catch (error) {
    console.error("💥 Error fetching stats:", error);
    
    // Return more detailed error information
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch stats",
        details: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
