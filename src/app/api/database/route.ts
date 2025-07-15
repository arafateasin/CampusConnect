import { NextResponse } from "next/server";
import {
  updateDatabaseForCampusConnect,
  getDatabaseStats,
} from "@/lib/campusConnectMigration";

export async function GET() {
  try {
    const stats = await getDatabaseStats();

    return NextResponse.json({
      success: true,
      data: {
        message: "CampusConnect database is healthy",
        collections: {
          events: stats.events,
          users: stats.users,
          registrations: stats.registrations,
          notifications: stats.notifications,
          total: stats.totalDocuments,
        },
        status: "operational",
      },
    });
  } catch (error) {
    console.error("Database health check failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Database health check failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { action } = await request.json();

    if (action === "migrate") {
      await updateDatabaseForCampusConnect();
      const stats = await getDatabaseStats();

      return NextResponse.json({
        success: true,
        data: {
          message: "CampusConnect database migration completed successfully",
          collections: {
            events: stats.events,
            users: stats.users,
            registrations: stats.registrations,
            notifications: stats.notifications,
            total: stats.totalDocuments,
          },
        },
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: "Invalid action specified",
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("Database migration failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Database migration failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
