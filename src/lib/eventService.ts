import { Event, EventFilters } from "@/types/event";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "events.json");

// Sample fallback events for when file system is not available
const FALLBACK_EVENTS: Event[] = [
  {
    id: "1",
    title: "Tech Innovation Summit 2025",
    description: "Join us for the biggest tech summit of the year featuring industry leaders and cutting-edge technology demonstrations.",
    date: "2025-07-20T10:00:00Z",
    location: "Convention Center, New York",
    college: "NYU",
    eventType: "tech-talk",
    link: "https://example.com/tech-summit",
    tags: ["technology", "innovation", "networking"],
    createdAt: "2025-07-15T00:00:00Z",
    updatedAt: "2025-07-15T00:00:00Z"
  },
  {
    id: "2", 
    title: "AI/ML Workshop Series",
    description: "Hands-on workshop covering machine learning fundamentals and practical AI applications.",
    date: "2025-07-25T14:00:00Z",
    location: "Computer Science Building, MIT",
    college: "MIT",
    eventType: "workshop",
    link: "https://example.com/ai-workshop",
    tags: ["AI", "machine learning", "workshop"],
    createdAt: "2025-07-15T00:00:00Z",
    updatedAt: "2025-07-15T00:00:00Z"
  },
  {
    id: "3",
    title: "CodeCrush Hackathon",
    description: "48-hour hackathon focused on building solutions for social good. Great prizes and networking opportunities!",
    date: "2025-07-30T09:00:00Z",
    location: "Stanford University",
    college: "Stanford",
    eventType: "hackathon",
    link: "https://example.com/hackathon",
    tags: ["hackathon", "coding", "social impact"],
    createdAt: "2025-07-15T00:00:00Z",
    updatedAt: "2025-07-15T00:00:00Z"
  }
];

export class EventService {
  private static readEventsFromFile(): Event[] {
    try {
      // Check if we're in a serverless environment (Netlify/Vercel)
      if (typeof window !== 'undefined' || !fs.existsSync) {
        console.log("🔄 Using fallback events (serverless environment)");
        return FALLBACK_EVENTS;
      }
      
      // Check if data directory exists
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        console.log("📁 Data directory not found, creating with fallback events");
        fs.mkdirSync(dataDir, { recursive: true });
        fs.writeFileSync(DATA_FILE, JSON.stringify(FALLBACK_EVENTS, null, 2));
        return FALLBACK_EVENTS;
      }
      
      // Try to read the file
      if (fs.existsSync(DATA_FILE)) {
        const data = fs.readFileSync(DATA_FILE, "utf8");
        const events = JSON.parse(data);
        return events.length > 0 ? events : FALLBACK_EVENTS;
      } else {
        console.log("📄 Events file not found, creating with fallback events");
        fs.writeFileSync(DATA_FILE, JSON.stringify(FALLBACK_EVENTS, null, 2));
        return FALLBACK_EVENTS;
      }
    } catch (error) {
      console.error("❌ Error reading events file:", error);
      console.log("🔄 Using fallback events");
      return FALLBACK_EVENTS;
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
