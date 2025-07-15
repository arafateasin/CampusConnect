import { Event } from "@/types/event";

// Fallback events that will always be available
export const FALLBACK_EVENTS: Event[] = [
  {
    id: "1",
    title: "Tech Innovation Summit 2025",
    description: "Join us for the biggest tech summit of the year featuring industry leaders and cutting-edge technology demonstrations.",
    date: "2025-07-20T10:00:00Z",
    location: "Convention Center, New York",
    college: "NYU",
    eventType: "tech-talk",
    link: "https://example.com/tech-summit",
    tags: ["technology", "innovation", "networking"],
    createdAt: "2025-07-15T00:00:00Z",
    updatedAt: "2025-07-15T00:00:00Z"
  },
  {
    id: "2", 
    title: "AI/ML Workshop Series",
    description: "Hands-on workshop covering machine learning fundamentals and practical AI applications.",
    date: "2025-07-25T14:00:00Z",
    location: "Computer Science Building, MIT",
    college: "MIT",
    eventType: "workshop",
    link: "https://example.com/ai-workshop",
    tags: ["AI", "machine learning", "workshop"],
    createdAt: "2025-07-15T00:00:00Z",
    updatedAt: "2025-07-15T00:00:00Z"
  },
  {
    id: "3",
    title: "CodeCrush Hackathon",
    description: "48-hour hackathon focused on building solutions for social good. Great prizes and networking opportunities!",
    date: "2025-07-30T09:00:00Z",
    location: "Stanford University",
    college: "Stanford",
    eventType: "hackathon",
    link: "https://example.com/hackathon",
    tags: ["hackathon", "coding", "social impact"],
    createdAt: "2025-07-15T00:00:00Z",
    updatedAt: "2025-07-15T00:00:00Z"
  },
  {
    id: "4",
    title: "Blockchain & Web3 Conference",
    description: "Explore the future of decentralized technology with industry experts and innovative projects.",
    date: "2025-08-05T11:00:00Z",
    location: "UC Berkeley",
    college: "UC Berkeley",
    eventType: "tech-talk",
    link: "https://example.com/blockchain-conf",
    tags: ["blockchain", "web3", "cryptocurrency"],
    createdAt: "2025-07-15T00:00:00Z",
    updatedAt: "2025-07-15T00:00:00Z"
  },
  {
    id: "5",
    title: "Mobile App Development Bootcamp",
    description: "Learn to build iOS and Android apps from scratch in this intensive 3-day workshop.",
    date: "2025-08-10T09:00:00Z",
    location: "Carnegie Mellon University",
    college: "CMU",
    eventType: "workshop",
    link: "https://example.com/mobile-bootcamp",
    tags: ["mobile", "iOS", "Android", "development"],
    createdAt: "2025-07-15T00:00:00Z",
    updatedAt: "2025-07-15T00:00:00Z"
  }
];
