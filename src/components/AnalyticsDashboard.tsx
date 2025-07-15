import { useState, useEffect } from "react";
import { EventStats } from "@/types/event";

export function AnalyticsDashboard() {
  const [stats, setStats] = useState<EventStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      console.log("🔍 Fetching stats from /api/stats");
      const response = await fetch("/api/stats");
      
      console.log("📡 Response status:", response.status);
      console.log("📡 Response headers:", response.headers);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("📊 Analytics API Response:", data);

      if (data.success && data.data) {
        console.log("✅ Setting stats:", data.data);
        setStats(data.data);
        setError(null);
      } else {
        console.error("❌ API returned unsuccessfully:", data);
        setError(`API Error: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("💥 Error fetching stats:", error);
      setError(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-200 rounded-lg h-32"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="text-red-800 font-medium">Error Loading Analytics</h3>
        <p className="text-red-600 text-sm mt-2">{error}</p>
        <button
          onClick={fetchStats}
          className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="text-yellow-800 font-medium">No Statistics Available</h3>
        <p className="text-yellow-600 text-sm mt-2">
          Unable to load analytics data. Please check the console for errors.
        </p>
        <button
          onClick={fetchStats}
          className="mt-3 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 text-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Events",
      value: stats.totalEvents,
      icon: "📅",
      color: "bg-blue-500",
      change: "+12%",
      changeType: "positive",
    },
    {
      title: "Active Users",
      value: stats.totalUsers || 0,
      icon: "👥",
      color: "bg-green-500",
      change: "+5.2%",
      changeType: "positive",
    },
    {
      title: "Registrations",
      value: stats.totalRegistrations || 0,
      icon: "✅",
      color: "bg-purple-500",
      change: "+8.1%",
      changeType: "positive",
    },
    {
      title: "Colleges",
      value: stats.totalColleges,
      icon: "🏫",
      color: "bg-orange-500",
      change: "+2",
      changeType: "positive",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {card.title}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {card.value.toLocaleString()}
                </p>
              </div>
              <div className={`${card.color} rounded-full p-3`}>
                <span className="text-2xl">{card.icon}</span>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span
                className={`text-sm ${
                  card.changeType === "positive"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {card.change}
              </span>
              <span className="text-sm text-gray-500 ml-2">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Event Type Distribution */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Event Type Distribution
        </h3>
        <div className="space-y-4">
          {Object.entries(stats.eventTypeCount).map(([type, count]) => {
            const percentage = (count / stats.totalEvents) * 100;
            const colors = {
              hackathon: "bg-blue-500",
              "tech-talk": "bg-green-500",
              workshop: "bg-purple-500",
            };

            return (
              <div key={type} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      colors[type as keyof typeof colors]
                    }`}
                  ></div>
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {type.replace("-", " ")}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{count}</span>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        colors[type as keyof typeof colors]
                      }`}
                      style={{ width: `${Math.max(percentage, 2)}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500 w-12">
                    {percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {[
            {
              action: "New event created",
              event: "AI Workshop 2024",
              time: "2 hours ago",
              type: "create",
            },
            {
              action: "User registered",
              event: "React Hackathon",
              time: "4 hours ago",
              type: "register",
            },
            {
              action: "Event updated",
              event: "Tech Talk Series",
              time: "6 hours ago",
              type: "update",
            },
            {
              action: "New user joined",
              event: "Platform",
              time: "8 hours ago",
              type: "user",
            },
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.type === "create"
                    ? "bg-green-100 text-green-600"
                    : activity.type === "register"
                    ? "bg-blue-100 text-blue-600"
                    : activity.type === "update"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-purple-100 text-purple-600"
                }`}
              >
                {activity.type === "create"
                  ? "✨"
                  : activity.type === "register"
                  ? "👤"
                  : activity.type === "update"
                  ? "📝"
                  : "🎉"}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {activity.action}
                </p>
                <p className="text-sm text-gray-600">{activity.event}</p>
              </div>
              <span className="text-xs text-gray-700 font-medium">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
