import { Event, EventFilters } from "@/types/event";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "events.json");

export class EventService {
  private static readEventsFromFile(): Event[] {
    try {
      const data = fs.readFileSync(DATA_FILE, "utf8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading events file:", error);
      return [];
    }
  }

  private static writeEventsToFile(events: Event[]): void {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(events, null, 2));
    } catch (error) {
      console.error("Error writing events file:", error);
      throw new Error("Failed to save events");
    }
  }

  static getAllEvents(): Event[] {
    return this.readEventsFromFile();
  }

  static getEventById(id: string): Event | undefined {
    const events = this.readEventsFromFile();
    return events.find((event) => event.id === id);
  }

  static addEvent(
    eventData: Omit<Event, "id" | "createdAt" | "updatedAt">
  ): Event {
    const events = this.readEventsFromFile();
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    events.push(newEvent);
    this.writeEventsToFile(events);
    return newEvent;
  }

  static updateEvent(id: string, eventData: Partial<Event>): Event | null {
    const events = this.readEventsFromFile();
    const index = events.findIndex((event) => event.id === id);

    if (index === -1) {
      return null;
    }

    events[index] = {
      ...events[index],
      ...eventData,
      updatedAt: new Date().toISOString(),
    };

    this.writeEventsToFile(events);
    return events[index];
  }

  static deleteEvent(id: string): boolean {
    const events = this.readEventsFromFile();
    const initialLength = events.length;
    const filteredEvents = events.filter((event) => event.id !== id);

    if (filteredEvents.length === initialLength) {
      return false;
    }

    this.writeEventsToFile(filteredEvents);
    return true;
  }

  static filterEvents(filters: EventFilters): Event[] {
    const events = this.readEventsFromFile();

    return events.filter((event) => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const matchesSearch =
          event.title.toLowerCase().includes(searchTerm) ||
          event.description.toLowerCase().includes(searchTerm) ||
          event.college.toLowerCase().includes(searchTerm) ||
          event.location.toLowerCase().includes(searchTerm) ||
          event.tags.some((tag) => tag.toLowerCase().includes(searchTerm));

        if (!matchesSearch) return false;
      }

      // Event type filter
      if (filters.eventType && filters.eventType !== "all") {
        if (event.eventType !== filters.eventType) return false;
      }

      // College filter
      if (filters.college) {
        if (
          !event.college.toLowerCase().includes(filters.college.toLowerCase())
        )
          return false;
      }

      // Location filter
      if (filters.location) {
        if (
          !event.location.toLowerCase().includes(filters.location.toLowerCase())
        )
          return false;
      }

      // Date range filter
      if (filters.dateFrom) {
        if (new Date(event.date) < new Date(filters.dateFrom)) return false;
      }

      if (filters.dateTo) {
        if (new Date(event.date) > new Date(filters.dateTo)) return false;
      }

      return true;
    });
  }

  static getColleges(): string[] {
    const events = this.readEventsFromFile();
    const colleges = [...new Set(events.map((event) => event.college))];
    return colleges.sort();
  }

  static getLocations(): string[] {
    const events = this.readEventsFromFile();
    const locations = [...new Set(events.map((event) => event.location))];
    return locations.sort();
  }

  static getEventStats() {
    const events = this.readEventsFromFile();
    const totalEvents = events.length;
    const eventTypeCount = {
      hackathon: events.filter((e) => e.eventType === "hackathon").length,
      "tech-talk": events.filter((e) => e.eventType === "tech-talk").length,
      workshop: events.filter((e) => e.eventType === "workshop").length,
    };

    return {
      totalEvents,
      eventTypeCount,
      totalColleges: this.getColleges().length,
      totalLocations: this.getLocations().length,
    };
  }
}
