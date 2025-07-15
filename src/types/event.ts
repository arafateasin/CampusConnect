export type EventType = "hackathon" | "tech-talk" | "workshop";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string; // ISO date string
  location: string;
  college: string;
  eventType: EventType;
  link: string;
  tags: string[];
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
  // Registration system
  registrationEnabled?: boolean;
  registrationDeadline?: string;
  maxParticipants?: number;
  registeredUsers?: string[];
  registrationCount?: number;
  // Additional features
  isFeatured?: boolean;
  imageUrl?: string;
  organizer?: string;
  contactEmail?: string;
  prerequisites?: string[];
  price?: number;
  currency?: string;
}

export interface EventFormData {
  title: string;
  description: string;
  date: string;
  location: string;
  college: string;
  eventType: EventType;
  link: string;
  tags: string;
  // New fields
  registrationEnabled?: boolean;
  registrationDeadline?: string;
  maxParticipants?: number;
  imageUrl?: string;
  organizer?: string;
  contactEmail?: string;
  prerequisites?: string;
  price?: number;
  currency?: string;
}

export interface EventFilters {
  search?: string;
  eventType?: EventType | "all";
  college?: string;
  location?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  college?: string;
  year?: string;
  major?: string;
  interests?: EventType[];
  bio?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  favoriteEvents?: string[];
  registeredEvents?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  userId: string;
  registeredAt: string;
  status: "confirmed" | "waitlisted" | "cancelled";
  additionalInfo?: string;
}

export interface EventStats {
  totalEvents: number;
  eventTypeCount: {
    hackathon: number;
    "tech-talk": number;
    workshop: number;
  };
  totalColleges: number;
  totalLocations: number;
  totalUsers?: number;
  totalRegistrations?: number;
  upcomingEvents?: number;
}

export interface Notification {
  id: string;
  userId: string;
  type:
    | "event_reminder"
    | "registration_confirmed"
    | "event_updated"
    | "event_cancelled";
  title: string;
  message: string;
  eventId?: string;
  read: boolean;
  createdAt: string;
}
