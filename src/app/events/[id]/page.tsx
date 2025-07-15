import EventDetailClient from "./EventDetailClient";

// Generate static params for build time
export async function generateStaticParams() {
  // Return empty array for now - dynamic routes will be handled at runtime
  return [];
}

export default function EventDetail() {
  return <EventDetailClient />;
}
