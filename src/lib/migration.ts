import { MongoEventService } from "./mongoEventService";

/**
 * Migration script to update existing events with new fields
 */
export async function migrateExistingEvents() {
  console.log("🔄 Starting migration to add new fields to existing events...");

  try {
    // Get all existing events
    const events = await MongoEventService.getAllEvents();

    for (const event of events) {
      // Update event with new fields if they don't exist
      const updateData = {
        registrationEnabled: event.registrationEnabled ?? false,
        registrationCount: event.registrationCount ?? 0,
        registeredUsers: event.registeredUsers ?? [],
        isFeatured: event.isFeatured ?? false,
        prerequisites: event.prerequisites ?? [],
        price: event.price ?? 0,
        currency: event.currency ?? "USD",
      };

      await MongoEventService.updateEvent(event.id, updateData);
    }

    console.log(
      `✅ Migration completed successfully! Updated ${events.length} events.`
    );
  } catch (error) {
    console.error("❌ Migration failed:", error);
  }
}

// Run migration if this file is executed directly
if (require.main === module) {
  migrateExistingEvents()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Migration failed:", error);
      process.exit(1);
    });
}
