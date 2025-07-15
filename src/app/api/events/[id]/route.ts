import { NextRequest, NextResponse } from "next/server";
import { HybridEventService } from "@/lib/hybridEventService";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await HybridEventService.initialize();

    const event = await HybridEventService.getEventById(id);

    if (!event) {
      return NextResponse.json(
        {
          success: false,
          error: "Event not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: event,
      database: HybridEventService.getConnectionStatus(),
    });
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch event",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await HybridEventService.initialize();

    const body = await request.json();

    // Parse tags if provided
    const tags = body.tags
      ? body.tags.split(",").map((tag: string) => tag.trim())
      : undefined;

    const eventData = {
      ...body,
      tags,
    };

    const updatedEvent = await HybridEventService.updateEvent(
      params.id,
      eventData
    );

    if (!updatedEvent) {
      return NextResponse.json(
        {
          success: false,
          error: "Event not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedEvent,
      database: HybridEventService.getConnectionStatus(),
    });
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update event",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await HybridEventService.initialize();

    const deleted = await HybridEventService.deleteEvent(params.id);

    if (!deleted) {
      return NextResponse.json(
        {
          success: false,
          error: "Event not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { message: "Event deleted successfully" },
      database: HybridEventService.getConnectionStatus(),
    });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete event",
      },
      { status: 500 }
    );
  }
}
