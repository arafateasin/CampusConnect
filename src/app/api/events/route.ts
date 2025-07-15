import { NextRequest, NextResponse } from "next/server";
import { HybridEventService } from "@/lib/hybridEventService";
import { EventFilters, EventType } from "@/types/event";

export async function GET(request: NextRequest) {
  try {
    await HybridEventService.initialize();

    const { searchParams } = new URL(request.url);

    const filters: EventFilters = {
      search: searchParams.get("search") || undefined,
      eventType: (searchParams.get("eventType") as EventType) || undefined,
      college: searchParams.get("college") || undefined,
      location: searchParams.get("location") || undefined,
      dateFrom: searchParams.get("dateFrom") || undefined,
      dateTo: searchParams.get("dateTo") || undefined,
    };

    const events = await HybridEventService.filterEvents(filters);

    return NextResponse.json({
      success: true,
      data: events,
      database: HybridEventService.getConnectionStatus(),
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch events",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await HybridEventService.initialize();

    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      "title",
      "description",
      "date",
      "location",
      "college",
      "eventType",
      "link",
    ];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          {
            success: false,
            error: `Missing required field: ${field}`,
          },
          { status: 400 }
        );
      }
    }

    // Parse tags if provided
    const tags = body.tags
      ? body.tags.split(",").map((tag: string) => tag.trim())
      : [];

    const eventData = {
      title: body.title,
      description: body.description,
      date: body.date,
      location: body.location,
      college: body.college,
      eventType: body.eventType,
      link: body.link,
      tags,
      createdBy: body.createdBy || "anonymous",
    };

    const newEvent = await HybridEventService.addEvent(eventData);

    return NextResponse.json({
      success: true,
      data: newEvent,
      database: HybridEventService.getConnectionStatus(),
    });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create event",
      },
      { status: 500 }
    );
  }
}
