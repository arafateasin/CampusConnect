import { Event } from "@/types/event";
import {
  formatDateTime,
  getEventTypeColor,
  getEventTypeLabel,
  isEventUpcoming,
  truncateText,
} from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface EventCardProps {
  event: Event;
  userFavorites?: string[];
  userRegistrations?: string[];
  onFavoriteToggle?: (eventId: string) => void;
  onRegister?: (eventId: string) => void;
}

export function EventCard({
  event,
  userFavorites = [],
  userRegistrations = [],
  onFavoriteToggle,
  onRegister,
}: EventCardProps) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const upcoming = isEventUpcoming(event.date);
  const isFavorite = userFavorites.includes(event.id);
  const isRegistered = userRegistrations.includes(event.id);
  const canRegister = event.registrationEnabled && upcoming && !isRegistered;
  const registrationDeadlinePassed = Boolean(
    event.registrationDeadline &&
      new Date() > new Date(event.registrationDeadline)
  );

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user || !onFavoriteToggle) return;

    setIsLoading(true);
    try {
      await onFavoriteToggle(event.id);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user || !onRegister) return;

    setIsLoading(true);
    try {
      await onRegister(event.id);
    } finally {
      setIsLoading(false);
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "hackathon":
        return (
          <svg
            className="w-4 h-4"
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
        );
      case "tech-talk":
        return (
          <svg
            className="w-4 h-4"
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
        );
      case "workshop":
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-4 h-4"
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
        );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group hover:scale-105 flex flex-col h-full">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 relative">
        <div className="flex items-center justify-between">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white border ${getEventTypeColor(
              event.eventType
            )}`}
          >
            {getEventTypeIcon(event.eventType)}
            <span className="ml-1">{getEventTypeLabel(event.eventType)}</span>
          </span>
          <div className="flex flex-col items-end">
            <span className="text-white text-sm font-semibold bg-black bg-opacity-30 px-3 py-1 rounded-full backdrop-blur-sm">
              {formatDateTime(event.date)}
            </span>
            {upcoming && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-400 text-white mt-2">
                Upcoming
              </span>
            )}
          </div>
        </div>

        {/* Featured badge */}
        {event.isFeatured && (
          <div className="absolute top-2 right-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-400 text-yellow-900">
              ⭐ Featured
            </span>
          </div>
        )}
      </div>

      {/* Event Image */}
      {event.imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {user && (
            <button
              onClick={handleFavoriteClick}
              disabled={isLoading}
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
              className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
                isFavorite
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-white bg-opacity-80 text-gray-600 hover:bg-opacity-100"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill={isFavorite ? "currentColor" : "none"}
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
            </button>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {event.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
            {truncateText(event.description, 150)}
          </p>
        </div>

        {/* Event details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-gray-600">
            <svg
              className="w-4 h-4 mr-2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-sm">{event.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <svg
              className="w-4 h-4 mr-2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <span className="text-sm font-medium">{event.college}</span>
          </div>

          {event.organizer && (
            <div className="flex items-center text-gray-600">
              <svg
                className="w-4 h-4 mr-2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="text-sm">{event.organizer}</span>
            </div>
          )}

          {event.price && event.price > 0 && (
            <div className="flex items-center text-gray-600">
              <svg
                className="w-4 h-4 mr-2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
              <span className="text-sm font-medium">
                {event.price} {event.currency}
              </span>
            </div>
          )}
        </div>

        {/* Registration info */}
        {event.registrationEnabled && (
          <div className="bg-gray-50 p-3 rounded-lg mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Registration
              </span>
              {event.registrationCount !== undefined &&
                event.maxParticipants && (
                  <span className="text-sm text-gray-600">
                    {event.registrationCount}/{event.maxParticipants}
                  </span>
                )}
            </div>
            {event.registrationDeadline && (
              <p className="text-xs text-gray-900 font-medium">
                Deadline: {formatDateTime(event.registrationDeadline)}
              </p>
            )}
            {registrationDeadlinePassed && (
              <p className="text-xs text-red-600 font-medium mt-1">
                Registration closed
              </p>
            )}
          </div>
        )}

        {/* Tags */}
        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {event.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium"
              >
                #{tag}
              </span>
            ))}
            {event.tags.length > 3 && (
              <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                +{event.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex items-center justify-between mt-auto gap-2">
          <div className="flex gap-2">
            {canRegister && user && (
              <button
                onClick={handleRegisterClick}
                disabled={isLoading || registrationDeadlinePassed}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Registering..." : "Register"}
              </button>
            )}

            {isRegistered && (
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 font-medium rounded-lg">
                ✓ Registered
              </div>
            )}

            <Link
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 group"
            >
              <span>View Details</span>
              <svg
                className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </Link>
          </div>

          <Link
            href={`/events/${event.id}`}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors"
          >
            More Info
          </Link>
        </div>
      </div>
    </div>
  );
}
