import { Event, EventFilters } from "@/types/event";
import { EventService } from "@/lib/eventService";
import { MongoEventService } from "@/lib/mongoEventService";

export class HybridEventService {
  private static useMongoDb = false;

  // Initialize and test MongoDB connection
  static async initialize() {
    try {
      console.log("🔄 Initializing HybridEventService...");
      
      // Set a timeout for MongoDB connection test
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("MongoDB connection timeout")), 8000)
      );
      
      const mongoTest = MongoEventService.getAllEvents();
      
      // Race between MongoDB test and timeout
      await Promise.race([mongoTest, timeoutPromise]);
      
      this.useMongoDb = true;
      console.log("✅ MongoDB connected successfully - using MongoDB");
    } catch (error) {
      console.log("⚠️ MongoDB connection failed - falling back to JSON storage");
      console.log("Error details:", error instanceof Error ? error.message : error);
      this.useMongoDb = false;
    }
  }

  static async getAllEvents(): Promise<Event[]> {
    if (this.useMongoDb) {
      return await MongoEventService.getAllEvents();
    }
    return EventService.getAllEvents();
  }

  static async getEventById(id: string): Promise<Event | null> {
    if (this.useMongoDb) {
      return await MongoEventService.getEventById(id);
    }
    return EventService.getEventById(id) || null;
  }

  static async addEvent(
    eventData: Omit<Event, "id" | "createdAt" | "updatedAt">
  ): Promise<Event> {
    if (this.useMongoDb) {
      return await MongoEventService.addEvent(eventData);
    }
    return EventService.addEvent(eventData);
  }

  static async updateEvent(
    id: string,
    eventData: Partial<Event>
  ): Promise<Event | null> {
    if (this.useMongoDb) {
      return await MongoEventService.updateEvent(id, eventData);
    }
    return EventService.updateEvent(id, eventData);
  }

  static async deleteEvent(id: string): Promise<boolean> {
    if (this.useMongoDb) {
      return await MongoEventService.deleteEvent(id);
    }
    return EventService.deleteEvent(id);
  }

  static async filterEvents(filters: EventFilters): Promise<Event[]> {
    if (this.useMongoDb) {
      return await MongoEventService.filterEvents(filters);
    }
    return EventService.filterEvents(filters);
  }

  static async getColleges(): Promise<string[]> {
    if (this.useMongoDb) {
      return await MongoEventService.getColleges();
    }
    return EventService.getColleges();
  }

  static async getLocations(): Promise<string[]> {
    if (this.useMongoDb) {
      return await MongoEventService.getLocations();
    }
    return EventService.getLocations();
  }

  static async getEventStats() {
    if (this.useMongoDb) {
      return await MongoEventService.getEventStats();
    }
    return EventService.getEventStats();
  }

  static async getEventsByUser(userId: string): Promise<Event[]> {
    if (this.useMongoDb) {
      return await MongoEventService.getEventsByUser(userId);
    }
    // For JSON fallback, filter by today's events as demo
    const allEvents = EventService.getAllEvents();
    return allEvents.filter((event) => {
      const createdDate = new Date(event.createdAt);
      const today = new Date();
      return createdDate.toDateString() === today.toDateString();
    });
  }

  static getConnectionStatus(): string {
    return this.useMongoDb ? "MongoDB Atlas" : "JSON File Storage";
  }
}
