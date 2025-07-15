"use client";

import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { useAuth } from "@/contexts/AuthContext";

export default function AnalyticsPage() {
  const { user } = useAuth();

  // For now, we'll allow any logged-in user to view analytics
  // In a real application, you'd want to restrict this to admin users
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Please sign in to view analytics
          </h2>
          <p className="text-gray-600">
            You need to be logged in to access the analytics dashboard.
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
            Analytics Dashboard
          </h1>
          <p className="text-gray-600">
            CampusConnect platform insights and statistics
          </p>
        </div>

        <AnalyticsDashboard />
      </div>
    </div>
  );
}
