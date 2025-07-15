"use client";

import { EventFormData, EventType } from "@/types/event";
import { useState } from "react";
import { validateUrl } from "@/lib/utils";

interface EventFormProps {
  onSubmit: (eventData: EventFormData) => void;
  isLoading?: boolean;
}

export function EventForm({ onSubmit, isLoading = false }: EventFormProps) {
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    description: "",
    date: "",
    location: "",
    college: "",
    eventType: "hackathon",
    link: "",
    tags: "",
    registrationEnabled: false,
    registrationDeadline: "",
    maxParticipants: undefined,
    imageUrl: "",
    organizer: "",
    contactEmail: "",
    prerequisites: "",
    price: 0,
    currency: "USD",
  });

  const [errors, setErrors] = useState<Partial<EventFormData>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof EventFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<EventFormData> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    } else {
      const eventDate = new Date(formData.date);
      const now = new Date();
      if (eventDate < now) {
        newErrors.date = "Event date must be in the future";
      }
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!formData.college.trim()) {
      newErrors.college = "College is required";
    }

    if (!formData.link.trim()) {
      newErrors.link = "Link is required";
    } else if (!validateUrl(formData.link)) {
      newErrors.link = "Please enter a valid URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-semibold text-gray-900 mb-1"
        >
          Event Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter event title"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-semibold text-gray-900 mb-1"
        >
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Describe the event"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-semibold text-gray-900 mb-1"
          >
            Date & Time *
          </label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 ${
              errors.date ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-600">{errors.date}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="eventType"
            className="block text-sm font-semibold text-gray-900 mb-1"
          >
            Event Type *
          </label>
          <select
            id="eventType"
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          >
            <option value="hackathon">Hackathon</option>
            <option value="tech-talk">Tech Talk</option>
            <option value="workshop">Workshop</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="location"
          className="block text-sm font-semibold text-gray-900 mb-1"
        >
          Location *
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 ${
            errors.location ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Event location"
        />
        {errors.location && (
          <p className="mt-1 text-sm text-red-600">{errors.location}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="college"
          className="block text-sm font-semibold text-gray-900 mb-1"
        >
          College/University *
        </label>
        <input
          type="text"
          id="college"
          name="college"
          value={formData.college}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 ${
            errors.college ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="College or university name"
        />
        {errors.college && (
          <p className="mt-1 text-sm text-red-600">{errors.college}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="link"
          className="block text-sm font-semibold text-gray-900 mb-1"
        >
          Event Link *
        </label>
        <input
          type="url"
          id="link"
          name="link"
          value={formData.link}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 ${
            errors.link ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="https://example.com/event"
        />
        {errors.link && (
          <p className="mt-1 text-sm text-red-600">{errors.link}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="tags"
          className="block text-sm font-semibold text-gray-900 mb-1"
        >
          Tags (Optional)
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          placeholder="AI, Machine Learning, Web Development (comma-separated)"
        />
        <p className="mt-1 text-sm text-gray-600">
          Separate tags with commas (e.g., AI, React, JavaScript)
        </p>
      </div>

      {/* Registration Settings */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Registration Settings
        </h3>

        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="registrationEnabled"
              name="registrationEnabled"
              checked={formData.registrationEnabled || false}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  registrationEnabled: e.target.checked,
                }))
              }
              className="mr-2"
            />
            <label
              htmlFor="registrationEnabled"
              className="text-sm font-medium text-gray-700"
            >
              Enable event registration
            </label>
          </div>

          {formData.registrationEnabled && (
            <div className="space-y-4 pl-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="registrationDeadline"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Registration Deadline
                  </label>
                  <input
                    type="datetime-local"
                    id="registrationDeadline"
                    name="registrationDeadline"
                    value={formData.registrationDeadline || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                </div>
                <div>
                  <label
                    htmlFor="maxParticipants"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Max Participants
                  </label>
                  <input
                    type="number"
                    id="maxParticipants"
                    name="maxParticipants"
                    value={formData.maxParticipants || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        maxParticipants: e.target.value
                          ? parseInt(e.target.value)
                          : undefined,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="Leave empty for unlimited"
                    min="1"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Additional Information
        </h3>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="organizer"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Organizer Name
              </label>
              <input
                type="text"
                id="organizer"
                name="organizer"
                value={formData.organizer || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                placeholder="Event organizer or organization"
              />
            </div>
            <div>
              <label
                htmlFor="contactEmail"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Contact Email
              </label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                value={formData.contactEmail || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                placeholder="Contact email for inquiries"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Event Image URL
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              placeholder="https://example.com/event-image.jpg"
            />
          </div>

          <div>
            <label
              htmlFor="prerequisites"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Prerequisites
            </label>
            <input
              type="text"
              id="prerequisites"
              name="prerequisites"
              value={formData.prerequisites || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              placeholder="Requirements or skills needed (comma-separated)"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price || 0}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    price: parseFloat(e.target.value) || 0,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label
                htmlFor="currency"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Currency
              </label>
              <select
                id="currency"
                name="currency"
                value={formData.currency || "USD"}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="CAD">CAD</option>
                <option value="AUD">AUD</option>
                <option value="INR">INR</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end space-x-4">
        <button
          type="button"
          onClick={() => {
            setFormData({
              title: "",
              description: "",
              date: "",
              location: "",
              college: "",
              eventType: "hackathon",
              link: "",
              tags: "",
              registrationEnabled: false,
              registrationDeadline: "",
              maxParticipants: undefined,
              imageUrl: "",
              organizer: "",
              contactEmail: "",
              prerequisites: "",
              price: 0,
              currency: "USD",
            });
            setErrors({});
          }}
          className="px-4 py-2 text-sm font-medium text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Clear
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Submitting..." : "Submit Event"}
        </button>
      </div>
    </form>
  );
}
