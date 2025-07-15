import { MongoEventService } from "../src/lib/mongoEventService";
import { EventService } from "../src/lib/eventService";

async function migrateData() {
  try {
    console.log("Starting data migration from JSON to MongoDB...");

    // Get all events from JSON file
    const jsonEvents = EventService.getAllEvents();
    console.log(`Found ${jsonEvents.length} events in JSON file`);

    // Clear existing MongoDB data (optional - remove if you want to preserve existing data)
    // await MongoEventService.clearAllEvents();

    // Add each event to MongoDB
    let migratedCount = 0;
    for (const event of jsonEvents) {
      try {
        const { id, ...eventData } = event; // Remove the id field as MongoDB will generate its own
        await MongoEventService.addEvent(eventData);
        migratedCount++;
        console.log(`Migrated: ${event.title}`);
      } catch (error) {
        console.error(`Failed to migrate event: ${event.title}`, error);
      }
    }

    console.log(`Successfully migrated ${migratedCount} events to MongoDB`);

    // Verify migration
    const mongoEvents = await MongoEventService.getAllEvents();
    console.log(`MongoDB now contains ${mongoEvents.length} events`);

    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

migrateData();
