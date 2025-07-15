import { Event, EventFilters } from "@/types/event";
import connectToDatabase from "@/lib/mongodb";
import EventModel from "@/models/Event";
import { Types } from "mongoose";

export class MongoEventService {
  private static async ensureConnection() {
    await connectToDatabase();
  }

  static async getAllEvents(): Promise<Event[]> {
    await this.ensureConnection();

    const events = await EventModel.find({}).sort({ date: 1 }).lean();

    return events.map((event) => {
      const { _id, __v, ...rest } = event;
      return {
        ...rest,
        id:
          typeof _id === "object" && _id !== null && "_id" in event
            ? (_id as Types.ObjectId).toString()
            : "",
      } as Event;
    });
  }

  static async getEventById(id: string): Promise<Event | null> {
    await this.ensureConnection();

    if (!Types.ObjectId.isValid(id)) {
      return null;
    }

    const event = await EventModel.findById(id).lean();

    if (!event) {
      return null;
    }

    const eventObj = event as any;
    const { _id, __v, ...rest } = eventObj;
    return {
      ...rest,
      id: _id.toString(),
    } as Event;
  }
  static async addEvent(
    eventData: Omit<Event, "id" | "createdAt" | "updatedAt">
  ): Promise<Event> {
    await this.ensureConnection();

    // Convert prerequisites string to array if it's a string
    const processedData = {
      ...eventData,
      prerequisites:
        typeof eventData.prerequisites === "string"
          ? (eventData.prerequisites as string)
              .split(",")
              .map((p: string) => p.trim())
              .filter((p: string) => p)
          : eventData.prerequisites || [],
    };

    const event = new EventModel(processedData);
    await event.save();

    const { _id, __v, ...rest } = event.toObject();
    return {
      ...rest,
      id: _id.toString(),
    } as Event;
  }

  static async updateEvent(
    id: string,
    eventData: Partial<Event>
  ): Promise<Event | null> {
    await this.ensureConnection();

    if (!Types.ObjectId.isValid(id)) {
      return null;
    }

    const event = await EventModel.findByIdAndUpdate(
      id,
      { ...eventData, updatedAt: new Date() },
      { new: true }
    ).lean();

    if (!event) {
      return null;
    }

    const eventObj = event as any;
    const { _id, __v, ...rest } = eventObj;
    return {
      ...rest,
      id: _id.toString(),
    } as Event;
  }

  static async deleteEvent(id: string): Promise<boolean> {
    await this.ensureConnection();

    if (!Types.ObjectId.isValid(id)) {
      return false;
    }

    const result = await EventModel.findByIdAndDelete(id);
    return result !== null;
  }

  static async filterEvents(filters: EventFilters): Promise<Event[]> {
    await this.ensureConnection();

    const query: any = {};

    // Search filter
    if (filters.search) {
      const searchRegex = new RegExp(filters.search, "i");
      query.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { college: searchRegex },
        { location: searchRegex },
        { tags: { $in: [searchRegex] } },
      ];
    }

    // Event type filter
    if (filters.eventType && filters.eventType !== "all") {
      query.eventType = filters.eventType;
    }

    // College filter
    if (filters.college) {
      query.college = new RegExp(filters.college, "i");
    }

    // Location filter
    if (filters.location) {
      query.location = new RegExp(filters.location, "i");
    }

    // Date range filter
    if (filters.dateFrom || filters.dateTo) {
      query.date = {};
      if (filters.dateFrom) {
        query.date.$gte = new Date(filters.dateFrom);
      }
      if (filters.dateTo) {
        query.date.$lte = new Date(filters.dateTo);
      }
    }

    const events = await EventModel.find(query).sort({ date: 1 }).lean();

    return events.map((event) => {
      const { _id, __v, id, ...rest } = event;
      return {
        ...rest,
        id:
          typeof _id === "object" && _id !== null
            ? (_id as Types.ObjectId).toString()
            : "",
      } as Event;
    });
  }

  static async getColleges(): Promise<string[]> {
    await this.ensureConnection();

    const colleges = await EventModel.distinct("college");
    return colleges.sort();
  }

  static async getLocations(): Promise<string[]> {
    await this.ensureConnection();

    const locations = await EventModel.distinct("location");
    return locations.sort();
  }

  static async getEventStats() {
    await this.ensureConnection();

    const totalEvents = await EventModel.countDocuments();

    const eventTypeCounts = await EventModel.aggregate([
      {
        $group: {
          _id: "$eventType",
          count: { $sum: 1 },
        },
      },
    ]);

    const eventTypeCount = {
      hackathon: 0,
      "tech-talk": 0,
      workshop: 0,
    };

    eventTypeCounts.forEach((item) => {
      if (item._id in eventTypeCount) {
        eventTypeCount[item._id as keyof typeof eventTypeCount] = item.count;
      }
    });

    const totalColleges = await EventModel.distinct("college").then(
      (colleges) => colleges.length
    );
    const totalLocations = await EventModel.distinct("location").then(
      (locations) => locations.length
    );

    return {
      totalEvents,
      eventTypeCount,
      totalColleges,
      totalLocations,
    };
  }

  static async getEventsByUser(userId: string): Promise<Event[]> {
    await this.ensureConnection();

    const events = await EventModel.find({ createdBy: userId })
      .sort({ createdAt: -1 })
      .lean();

    return events.map((event) => {
      const eventObj = event as any;
      const { _id, __v, ...rest } = eventObj;
      return {
        ...rest,
        id: _id.toString(),
      } as Event;
    });
  }
}
