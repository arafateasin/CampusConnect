import {
  updateDatabaseForCampusConnect,
  getDatabaseStats,
} from "./campusConnectMigration";

async function testMigration() {
  console.log("🧪 Testing CampusConnect Database Migration...");

  try {
    // Get initial stats
    console.log("📊 Getting initial database stats...");
    const initialStats = await getDatabaseStats();
    console.log("Initial stats:", initialStats);

    // Run migration
    console.log("🔄 Running migration...");
    await updateDatabaseForCampusConnect();

    // Get final stats
    console.log("📊 Getting final database stats...");
    const finalStats = await getDatabaseStats();
    console.log("Final stats:", finalStats);

    // Verify migration
    console.log("✅ Migration test completed successfully!");
  } catch (error) {
    console.error("❌ Migration test failed:", error);
  }
}

// Export for testing
export { testMigration };
