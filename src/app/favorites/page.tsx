"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Event } from "@/types/event";
import { EventCard } from "@/components/EventCard";
import { LoadingSpinner } from "@/components/LoadingStates";
import Link from "next/link";

export default function FavoritesPage() {
  const { user } = useAuth();
  const [favoriteEvents, setFavoriteEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [userFavorites, setUserFavorites] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      fetchFavoriteEvents();
    }
  }, [user]);

  const fetchFavoriteEvents = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Get user's favorite event IDs
      const favoritesResponse = await fetch(
        `/api/favorites?userId=${user.uid}`
      );
      const favoritesData = await favoritesResponse.json();

      if (favoritesData.success) {
        setUserFavorites(favoritesData.data);

        // Get all events and filter favorites
        const eventsResponse = await fetch("/api/events");
        const eventsData = await eventsResponse.json();

        if (eventsData.success) {
          const favorites = eventsData.data.filter((event: Event) =>
            favoritesData.data.includes(event.id)
          );
          setFavoriteEvents(favorites);
        }
      }
    } catch (error) {
      console.error("Error fetching favorite events:", error);
    } finally {
      setLoading(false);
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
        // Remove from favorites list
        setFavoriteEvents((prev) =>
          prev.filter((event) => event.id !== eventId)
        );
        setUserFavorites((prev) => prev.filter((id) => id !== eventId));
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Please sign in to view your favorites
          </h2>
          <p className="text-gray-600">
            You need to be logged in to access your favorite events.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Favorite Events
          </h1>
          <p className="text-gray-600">
            Events you&apos;ve saved on CampusConnect
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner />
          </div>
        ) : favoriteEvents.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 mx-auto text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No favorite events yet
            </h3>
            <p className="text-gray-600 mb-4">
              Start exploring events and mark your favorites by clicking the
              heart icon.
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Events
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                userFavorites={userFavorites}
                onFavoriteToggle={handleFavoriteToggle}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
