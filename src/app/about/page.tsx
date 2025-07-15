export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          About CampusConnect
        </h1>
        <p className="text-lg text-gray-600">
          Connecting students with opportunities across the tech community
        </p>
      </div>

      <div className="space-y-8">
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed">
            CampusConnect aims to bridge the gap between tech events and
            students by providing a centralized hub for discovering hackathons,
            tech talks, and workshops happening across colleges nationwide. We
            believe that every student should have access to learning
            opportunities and networking events that can advance their career in
            technology.
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Event Discovery
              </h3>
              <p className="text-gray-700">
                Browse through a comprehensive collection of upcoming tech
                events from colleges across the country.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Advanced Filtering
              </h3>
              <p className="text-gray-700">
                Find events by type, location, college, date range, and specific
                technologies or topics.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Easy Submission
              </h3>
              <p className="text-gray-700">
                Event organizers can easily submit their events to reach a wider
                audience of students.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Event Types
              </h3>
              <p className="text-gray-700">
                Support for hackathons, tech talks, workshops, and other
                technology-focused events.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Event Types
          </h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Hackathons</h3>
                <p className="text-gray-700">
                  Competitive coding events where teams build innovative
                  solutions within a limited timeframe.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Tech Talks</h3>
                <p className="text-gray-700">
                  Presentations by industry experts sharing insights on latest
                  technologies and trends.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-green-600"
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
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Workshops</h3>
                <p className="text-gray-700">
                  Hands-on learning sessions where participants develop
                  practical skills in specific technologies.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            How It Works
          </h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Discover Events</h3>
                <p className="text-gray-700">
                  Browse the dashboard to find events that match your interests
                  and schedule.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Filter & Search</h3>
                <p className="text-gray-700">
                  Use our powerful filtering system to narrow down events by
                  type, location, or date.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Register & Attend
                </h3>
                <p className="text-gray-700">
                  Click through to the event page for registration details and
                  more information.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            For Event Organizers
          </h2>
          <p className="text-gray-700 mb-4">
            Are you organizing a tech event at your college? We'd love to help
            you reach more students!
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">
              Submit Your Event
            </h3>
            <p className="text-blue-800 mb-3">
              Use our simple submission form to add your event to our platform.
              It takes just a few minutes!
            </p>
            <a
              href="/submit"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Submit Event
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Technology Stack
          </h2>
          <p className="text-gray-700 mb-4">
            This platform is built with modern web technologies to ensure a
            fast, reliable, and user-friendly experience:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="font-semibold text-gray-900">Frontend</div>
              <div className="text-gray-700">Next.js 15, React, TypeScript</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="font-semibold text-gray-900">Styling</div>
              <div className="text-gray-700">Tailwind CSS</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="font-semibold text-gray-900">Backend</div>
              <div className="text-gray-700">Next.js API Routes</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
