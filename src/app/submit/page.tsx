"use client";

import { useState } from "react";
import { EventForm } from "@/components/EventForm";
import { EventFormData } from "@/types/event";
import { useRouter } from "next/navigation";

export default function SubmitEvent() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const router = useRouter();

  const handleSubmit = async (eventData: EventFormData) => {
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: "success", text: "Event submitted successfully!" });
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        setMessage({
          type: "error",
          text: data.error || "Failed to submit event",
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Submit New Event
        </h1>
        <p className="text-lg text-gray-600">
          Share your upcoming tech event with the CampusConnect community
        </p>
      </div>

      {message && (
        <div
          className={`mb-6 p-4 rounded-md ${
            message.type === "success"
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <EventForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          Submission Guidelines
        </h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Ensure all event details are accurate and up-to-date</li>
          <li>
            • Provide a valid URL for event registration or more information
          </li>
          <li>• Use relevant tags to help others discover your event</li>
          <li>• Submit events at least 1 week before the event date</li>
          <li>
            • Events are subject to review and may be removed if inappropriate
          </li>
        </ul>
      </div>
    </div>
  );
}
