"use client";

import { useState, useEffect } from "react";
import { Event, EventFilters, EventType } from "@/types/event";
import { EventCard } from "@/components/EventCard";
import { EventFiltersComponent } from "@/components/EventFilters";
import { StatsCard } from "@/components/StatsCard";
import { LoadingSpinner, EmptyState } from "@/components/LoadingStates";
import { useAuth } from "@/contexts/AuthContext";

interface EventStats {
  totalEvents: number;
  eventTypeCount: {
    hackathon: number;
    "tech-talk": number;
    workshop: number;
  };
  totalColleges: number;
  totalLocations: number;
}

export default function Home() {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [filters, setFilters] = useState<EventFilters>({});
  const [colleges, setColleges] = useState<string[]>([]);
  const [stats, setStats] = useState<EventStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userFavorites, setUserFavorites] = useState<string[]>([]);
  const [userRegistrations, setUserRegistrations] = useState<string[]>([]);

  useEffect(() => {
    fetchEvents();
    fetchColleges();
    fetchStats();
    if (user) {
      fetchUserFavorites();
      fetchUserRegistrations();
    }
  }, [user]);

  useEffect(() => {
    fetchEvents();
  }, [filters]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("🔄 Starting event fetch...");

      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          params.append(key, value);
        }
      });

      // Try to fetch from API first
      const response = await fetch(`/api/events?${params}`);

      console.log("📡 API Response Status:", response.status);
      console.log("📡 API Response OK:", response.ok);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("📦 API Response Data:", data);

      if (data.success && data.data && Array.isArray(data.data)) {
        setEvents(data.data);
        console.log("✅ Successfully fetched events from API");
        console.log("🗄️ Database used:", data.database || "Unknown");
      } else {
        throw new Error(data.error || "Invalid API response");
      }
    } catch (err) {
      console.error("❌ API fetch failed, using fallback events:", err);

      // Use immediate fallback events
      const fallbackEvents: Event[] = [
        {
          id: "1",
          title: "Tech Innovation Summit 2025",
          description:
            "Join us for the biggest tech summit of the year featuring industry leaders and cutting-edge technology demonstrations.",
          date: "2025-07-20T10:00:00Z",
          location: "Convention Center, New York",
          college: "NYU",
          eventType: "tech-talk" as EventType,
          link: "https://example.com/tech-summit",
          tags: ["technology", "innovation", "networking"],
          createdAt: "2025-07-15T00:00:00Z",
          updatedAt: "2025-07-15T00:00:00Z",
        },
        {
          id: "2",
          title: "AI/ML Workshop Series",
          description:
            "Hands-on workshop covering machine learning fundamentals and practical AI applications.",
          date: "2025-07-25T14:00:00Z",
          location: "Computer Science Building, MIT",
          college: "MIT",
          eventType: "workshop" as EventType,
          link: "https://example.com/ai-workshop",
          tags: ["AI", "machine learning", "workshop"],
          createdAt: "2025-07-15T00:00:00Z",
          updatedAt: "2025-07-15T00:00:00Z",
        },
        {
          id: "3",
          title: "CodeCrush Hackathon",
          description:
            "48-hour hackathon focused on building solutions for social good. Great prizes and networking opportunities!",
          date: "2025-07-30T09:00:00Z",
          location: "Stanford University",
          college: "Stanford",
          eventType: "hackathon" as EventType,
          link: "https://example.com/hackathon",
          tags: ["hackathon", "coding", "social impact"],
          createdAt: "2025-07-15T00:00:00Z",
          updatedAt: "2025-07-15T00:00:00Z",
        },
        {
          id: "4",
          title: "Blockchain & Web3 Workshop",
          description:
            "Learn about blockchain technology, smart contracts, and decentralized applications. Hands-on coding session included.",
          date: "2025-08-05T16:00:00Z",
          location: "Engineering Building, UC Berkeley",
          college: "UC Berkeley",
          eventType: "workshop" as EventType,
          link: "https://example.com/blockchain-workshop",
          tags: ["blockchain", "web3", "cryptocurrency", "smart contracts"],
          createdAt: "2025-07-15T00:00:00Z",
          updatedAt: "2025-07-15T00:00:00Z",
        },
        {
          id: "5",
          title: "Cybersecurity Summit",
          description:
            "Industry experts discuss latest cybersecurity threats, defense strategies, and career opportunities in cybersecurity.",
          date: "2025-08-10T13:00:00Z",
          location: "Auditorium, Carnegie Mellon University",
          college: "Carnegie Mellon",
          eventType: "tech-talk" as EventType,
          link: "https://example.com/cybersecurity-summit",
          tags: ["cybersecurity", "networking", "career"],
          createdAt: "2025-07-15T00:00:00Z",
          updatedAt: "2025-07-15T00:00:00Z",
        },
        {
          id: "6",
          title: "Data Science & Analytics Bootcamp",
          description:
            "Intensive 3-day bootcamp covering Python, R, data visualization, and machine learning fundamentals for beginners.",
          date: "2025-08-15T09:00:00Z",
          location: "Data Science Center, Harvard University",
          college: "Harvard",
          eventType: "workshop" as EventType,
          link: "https://example.com/data-science-bootcamp",
          tags: ["data science", "python", "analytics", "bootcamp"],
          createdAt: "2025-07-15T00:00:00Z",
          updatedAt: "2025-07-15T00:00:00Z",
        },
        {
          id: "7",
          title: "FinTech Innovation Challenge",
          description:
            "24-hour hackathon focused on creating innovative financial technology solutions. Sponsored by major banks and fintech companies.",
          date: "2025-08-20T18:00:00Z",
          location: "Business School, University of Pennsylvania",
          college: "UPenn",
          eventType: "hackathon" as EventType,
          link: "https://example.com/fintech-challenge",
          tags: ["fintech", "hackathon", "finance", "innovation"],
          createdAt: "2025-07-15T00:00:00Z",
          updatedAt: "2025-07-15T00:00:00Z",
        },
      ];

      setEvents(fallbackEvents);
      setError(null); // Clear error since we have fallback data
      console.log("✅ Using fallback events");
    } finally {
      setLoading(false);
    }
  };

  const fetchColleges = async () => {
    try {
      const response = await fetch("/api/colleges");
      const data = await response.json();

      if (data.success) {
        setColleges(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch colleges:", err);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/stats");
      const data = await response.json();

      if (data.success) {
        setStats(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  };

  const fetchUserFavorites = async () => {
    if (!user) return;

    try {
      const response = await fetch(`/api/favorites?userId=${user.uid}`);
      const data = await response.json();

      if (data.success) {
        setUserFavorites(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch user favorites:", err);
    }
  };

  const fetchUserRegistrations = async () => {
    if (!user) return;

    try {
      const response = await fetch(`/api/registrations?userId=${user.uid}`);
      const data = await response.json();

      if (data.success) {
        setUserRegistrations(data.data.map((reg: any) => reg.eventId));
      }
    } catch (err) {
      console.error("Failed to fetch user registrations:", err);
    }
  };

  const handleFavoriteToggle = async (eventId: string) => {
    if (!user) return;

    try {
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.uid,
          eventId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          if (data.data.isFavorite) {
            setUserFavorites((prev) => [...prev, eventId]);
          } else {
            setUserFavorites((prev) => prev.filter((id) => id !== eventId));
          }
        }
      }
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
    }
  };

  const handleRegister = async (eventId: string) => {
    if (!user) return;

    try {
      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.uid,
          eventId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setUserRegistrations((prev) => [...prev, eventId]);
        }
      }
    } catch (err) {
      console.error("Failed to register for event:", err);
    }
  };

  const handleFiltersChange = (newFilters: EventFilters) => {
    setFilters(newFilters);
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              CampusConnect
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Connect with your campus community and discover upcoming tech
              talks, hackathons, and workshops from colleges across the country.
              Enhance your skills and network with fellow students.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 -mt-16 relative z-10">
            <StatsCard
              title="Total Events"
              value={stats.totalEvents}
              icon={
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              }
              color="bg-blue-500"
            />
            <StatsCard
              title="Hackathons"
              value={stats.eventTypeCount.hackathon}
              icon={
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              }
              color="bg-red-500"
            />
            <StatsCard
              title="Tech Talks"
              value={stats.eventTypeCount["tech-talk"]}
              icon={
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              }
              color="bg-blue-500"
            />
            <StatsCard
              title="Workshops"
              value={stats.eventTypeCount.workshop}
              icon={
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              }
              color="bg-green-500"
            />
          </div>
        )}

        {/* Filters */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Find Your Perfect Event
          </h2>
          <EventFiltersComponent
            filters={filters}
            onFiltersChange={handleFiltersChange}
            colleges={colleges}
          />
        </div>

        {/* Events Grid */}
        {loading ? (
          <LoadingSpinner />
        ) : events.length === 0 ? (
          <EmptyState message="Try adjusting your filters or submit a new event." />
        ) : (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {events.length} Event{events.length !== 1 ? "s" : ""} Found
              </h2>
              <p className="text-gray-600">
                Showing the latest events from top colleges
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  userFavorites={userFavorites}
                  userRegistrations={userRegistrations}
                  onFavoriteToggle={handleFavoriteToggle}
                  onRegister={handleRegister}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
