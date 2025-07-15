import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";

export async function GET(request: NextRequest) {
  try {
    console.log("🔍 Testing MongoDB connection...");

    // Check if environment variable exists
    const mongoUri = process.env.MONGODB_URI;
    console.log("MongoDB URI exists:", !!mongoUri);
    console.log(
      "MongoDB URI preview:",
      mongoUri ? `${mongoUri.substring(0, 20)}...` : "MISSING"
    );

    // Try to connect
    const connection = await connectToDatabase();
    console.log("✅ MongoDB connection successful!");
    console.log("Connection state:", connection.readyState);
    console.log("Database name:", connection.name);

    // Test a simple query
    const collections = connection.db
      ? await connection.db.listCollections().toArray()
      : [];
    console.log(
      "Available collections:",
      collections.map((c) => c.name)
    );

    return NextResponse.json({
      success: true,
      data: {
        connected: true,
        connectionState: connection.readyState,
        databaseName: connection.name,
        collections: collections.map((c) => c.name),
        mongoUriExists: !!mongoUri,
        environment: process.env.NODE_ENV,
      },
    });
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: "MongoDB connection failed",
        details: error instanceof Error ? error.message : "Unknown error",
        mongoUriExists: !!process.env.MONGODB_URI,
      },
      { status: 500 }
    );
  }
}
