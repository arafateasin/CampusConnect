"use client";

import { useState } from "react";

export default function TestDBPage() {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testDatabase = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/database");
      const data = await response.json();
      setResults({ type: "Database Status", data });
    } catch (error) {
      setResults({ type: "Database Error", error: error instanceof Error ? error.message : "Unknown error" });
    } finally {
      setLoading(false);
    }
  };

  const testStats = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/stats");
      const data = await response.json();
      setResults({ type: "Stats", data });
    } catch (error) {
      setResults({ type: "Stats Error", error: error instanceof Error ? error.message : "Unknown error" });
    } finally {
      setLoading(false);
    }
  };

  const seedDatabase = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/seed-events", {
        method: "POST",
      });
      const data = await response.json();
      setResults({ type: "Seed Result", data });
    } catch (error) {
      setResults({ type: "Seed Error", error: error instanceof Error ? error.message : "Unknown error" });
    } finally {
      setLoading(false);
    }
  };

  const testEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/events");
      const data = await response.json();
      setResults({ type: "Events", data });
    } catch (error) {
      setResults({ type: "Events Error", error: error instanceof Error ? error.message : "Unknown error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Database Test Page</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <button
            onClick={testDatabase}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
          >
            Test Database
          </button>
          
          <button
            onClick={seedDatabase}
            disabled={loading}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-400"
          >
            Seed Database
          </button>
          
          <button
            onClick={testEvents}
            disabled={loading}
            className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 disabled:bg-gray-400"
          >
            Test Events API
          </button>
          
          <button
            onClick={testStats}
            disabled={loading}
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:bg-gray-400"
          >
            Test Stats API
          </button>
        </div>

        {loading && (
          <div className="p-4 bg-yellow-100 rounded-lg mb-4">
            <p>Loading...</p>
          </div>
        )}

        {results && (
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="font-semibold mb-2">{results.type}:</h3>
            <pre className="text-sm overflow-x-auto bg-white p-2 rounded">
              {JSON.stringify(results.data || results.error, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
