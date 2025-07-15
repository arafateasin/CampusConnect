import { NextRequest, NextResponse } from "next/server";
import { MongoEventService } from "@/lib/mongoEventService";

export async function POST(request: NextRequest) {
  try {
    console.log("🌱 Seeding MongoDB with sample events...");

    const sampleEvents = [
      {
        title: "MongoDB Test Event 1",
        description: "This is a test event from MongoDB database",
        date: "2025-07-22T14:00:00Z",
        location: "MongoDB University",
        college: "MongoDB College",
        eventType: "tech-talk" as const,
        link: "https://example.com/mongodb-event-1",
        tags: ["mongodb", "database", "testing"],
        createdBy: "system",
      },
      {
        title: "MongoDB Test Event 2",
        description: "Another test event from MongoDB database",
        date: "2025-07-28T16:00:00Z",
        location: "Database Center",
        college: "Tech University",
        eventType: "workshop" as const,
        link: "https://example.com/mongodb-event-2",
        tags: ["mongodb", "workshop", "database"],
        createdBy: "system",
      },
      {
        title: "MongoDB Test Hackathon",
        description: "A hackathon event stored in MongoDB",
        date: "2025-08-02T09:00:00Z",
        location: "Innovation Hub",
        college: "Startup College",
        eventType: "hackathon" as const,
        link: "https://example.com/mongodb-hackathon",
        tags: ["mongodb", "hackathon", "innovation"],
        createdBy: "system",
      },
    ];

    const createdEvents = [];

    for (const eventData of sampleEvents) {
      const event = await MongoEventService.addEvent(eventData);
      createdEvents.push(event);
      console.log(`✅ Created event: ${event.title}`);
    }

    return NextResponse.json({
      success: true,
      message: "Sample events seeded successfully",
      data: {
        eventsCreated: createdEvents.length,
        events: createdEvents,
      },
    });
  } catch (error) {
    console.error("❌ Error seeding events:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to seed events",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
