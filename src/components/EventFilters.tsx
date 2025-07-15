"use client";

import { EventFilters, EventType } from "@/types/event";
import { useState, useEffect } from "react";

interface EventFiltersProps {
  filters: EventFilters;
  onFiltersChange: (filters: EventFilters) => void;
  colleges: string[];
}

export function EventFiltersComponent({
  filters,
  onFiltersChange,
  colleges,
}: EventFiltersProps) {
  const [localFilters, setLocalFilters] = useState<EventFilters>(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (key: keyof EventFilters, value: string) => {
    const newFilters = { ...localFilters, [key]: value || undefined };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters: EventFilters = {};
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Filter Events</h2>
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Search */}
        <div>
          <label
            htmlFor="search"
            className="block text-sm font-semibold text-gray-900 mb-1"
          >
            Search
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search events, colleges, tags..."
            value={localFilters.search || ""}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          />
        </div>

        {/* Event Type */}
        <div>
          <label
            htmlFor="eventType"
            className="block text-sm font-semibold text-gray-900 mb-1"
          >
            Event Type
          </label>
          <select
            id="eventType"
            value={localFilters.eventType || "all"}
            onChange={(e) => handleFilterChange("eventType", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          >
            <option value="all">All Types</option>
            <option value="hackathon">Hackathon</option>
            <option value="tech-talk">Tech Talk</option>
            <option value="workshop">Workshop</option>
          </select>
        </div>

        {/* College */}
        <div>
          <label
            htmlFor="college"
            className="block text-sm font-semibold text-gray-900 mb-1"
          >
            College
          </label>
          <select
            id="college"
            value={localFilters.college || ""}
            onChange={(e) => handleFilterChange("college", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          >
            <option value="">All Colleges</option>
            {colleges.map((college) => (
              <option key={college} value={college}>
                {college}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-semibold text-gray-900 mb-1"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            placeholder="Filter by location..."
            value={localFilters.location || ""}
            onChange={(e) => handleFilterChange("location", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          />
        </div>

        {/* Date From */}
        <div>
          <label
            htmlFor="dateFrom"
            className="block text-sm font-semibold text-gray-900 mb-1"
          >
            From Date
          </label>
          <input
            type="date"
            id="dateFrom"
            value={localFilters.dateFrom || ""}
            onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          />
        </div>

        {/* Date To */}
        <div>
          <label
            htmlFor="dateTo"
            className="block text-sm font-semibold text-gray-900 mb-1"
          >
            To Date
          </label>
          <input
            type="date"
            id="dateTo"
            value={localFilters.dateTo || ""}
            onChange={(e) => handleFilterChange("dateTo", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          />
        </div>
      </div>
    </div>
  );
}
