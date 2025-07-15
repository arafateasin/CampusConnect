import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Go to Homepage
          </Link>
          
          <div className="flex gap-4 justify-center">
            <Link
              href="/events"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Browse Events
            </Link>
            <Link
              href="/submit"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Submit Event
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
