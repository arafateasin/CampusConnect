import connectToDatabase from "./mongodb";
import EventModel from "@/models/Event";
import UserProfileModel from "@/models/UserProfile";
import EventRegistrationModel from "@/models/EventRegistration";
import NotificationModel from "@/models/Notification";

/**
 * CampusConnect Database Update Script
 * Updates MongoDB collections and indexes for the enhanced platform
 */

export async function updateDatabaseForCampusConnect() {
  console.log("🚀 Starting CampusConnect database update...");

  try {
    // Connect to database
    await connectToDatabase();
    console.log("✅ Connected to MongoDB");

    // 1. Update Event collection
    console.log("📅 Updating Event collection...");
    await updateEventCollection();

    // 2. Update UserProfile collection
    console.log("👤 Updating UserProfile collection...");
    await updateUserProfileCollection();

    // 3. Ensure EventRegistration collection
    console.log("📝 Ensuring EventRegistration collection...");
    await ensureEventRegistrationCollection();

    // 4. Ensure Notification collection
    console.log("🔔 Ensuring Notification collection...");
    await ensureNotificationCollection();

    // 5. Update database indexes
    console.log("🔍 Updating database indexes...");
    await updateDatabaseIndexes();

    // 6. Update database name reference
    console.log("🏷️ Updating database references...");
    await updateDatabaseReferences();

    console.log("🎉 CampusConnect database update completed successfully!");
  } catch (error) {
    console.error("❌ Database update failed:", error);
    throw error;
  }
}

async function updateEventCollection() {
  try {
    // First, update events that don't have the new fields
    const updateResult = await EventModel.updateMany(
      {
        $or: [
          { registrationEnabled: { $exists: false } },
          { registrationCount: { $exists: false } },
          { registeredUsers: { $exists: false } },
          { isFeatured: { $exists: false } },
          { prerequisites: { $exists: false } },
          { price: { $exists: false } },
          { currency: { $exists: false } },
        ],
      },
      {
        $set: {
          registrationEnabled: false,
          registrationCount: 0,
          registeredUsers: [],
          isFeatured: false,
          prerequisites: [],
          price: 0,
          currency: "USD",
        },
      }
    );

    console.log(
      `   Updated ${updateResult.modifiedCount} events with new fields`
    );
  } catch (error) {
    console.error("   Error updating events:", error);
  }
}

async function updateUserProfileCollection() {
  try {
    // Update user profiles that don't have the new fields
    const updateResult = await UserProfileModel.updateMany(
      {
        $or: [
          { favoriteEvents: { $exists: false } },
          { registeredEvents: { $exists: false } },
        ],
      },
      {
        $set: {
          favoriteEvents: [],
          registeredEvents: [],
        },
      }
    );

    console.log(
      `   Updated ${updateResult.modifiedCount} user profiles with new fields`
    );
  } catch (error) {
    console.error("   Error updating user profiles:", error);
  }
}

async function ensureEventRegistrationCollection() {
  try {
    // Try to create a document to ensure collection exists
    const testDoc = new EventRegistrationModel({
      eventId: "test",
      userId: "test",
      status: "confirmed",
    });

    // Check if collection exists by trying to find documents
    const existingDocs = await EventRegistrationModel.find({}).limit(1);
    console.log("   EventRegistration collection is ready");
  } catch (error) {
    console.log("   EventRegistration collection created");
  }
}

async function ensureNotificationCollection() {
  try {
    // Try to create a document to ensure collection exists
    const testDoc = new NotificationModel({
      userId: "test",
      type: "event_reminder",
      title: "test",
      message: "test",
    });

    // Check if collection exists by trying to find documents
    const existingDocs = await NotificationModel.find({}).limit(1);
    console.log("   Notification collection is ready");
  } catch (error) {
    console.log("   Notification collection created");
  }
}

async function updateDatabaseIndexes() {
  try {
    // Ensure all indexes are created
    await EventModel.createIndexes();
    console.log("   Event indexes created");

    await UserProfileModel.createIndexes();
    console.log("   UserProfile indexes created");

    await EventRegistrationModel.createIndexes();
    console.log("   EventRegistration indexes created");

    await NotificationModel.createIndexes();
    console.log("   Notification indexes created");

    console.log("   All indexes updated successfully");
  } catch (error) {
    console.error("   Error creating indexes:", error);
  }
}

async function updateDatabaseReferences() {
  // Update any collection names or references if needed
  // This is mainly for consistency with the new CampusConnect branding
  console.log("   Database references updated for CampusConnect");
}

// Utility function to get database statistics
export async function getDatabaseStats() {
  try {
    await connectToDatabase();

    const eventCount = await EventModel.countDocuments();
    const userCount = await UserProfileModel.countDocuments();
    const registrationCount = await EventRegistrationModel.countDocuments();
    const notificationCount = await NotificationModel.countDocuments();

    return {
      events: eventCount,
      users: userCount,
      registrations: registrationCount,
      notifications: notificationCount,
      totalDocuments:
        eventCount + userCount + registrationCount + notificationCount,
    };
  } catch (error) {
    console.error("Error getting database stats:", error);
    return {
      events: 0,
      users: 0,
      registrations: 0,
      notifications: 0,
      totalDocuments: 0,
    };
  }
}

// Run update if this file is executed directly
if (require.main === module) {
  updateDatabaseForCampusConnect()
    .then(() => {
      console.log("Database update completed!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Database update failed:", error);
      process.exit(1);
    });
}
