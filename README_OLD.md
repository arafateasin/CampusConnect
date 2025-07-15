# CampusConnect - College Event Aggregator Platform

CampusConnect is a compr## 🚀 Deployment

### Deploy to Netlify

1. **Fork or clone this repository**
2. **Import to Netlify**

   - Go to [Netlify Dashboard](https://app.netlify.com/)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Select your CampusConnect repository

3. **Configure Build Settings**

   - Build command: `npm run build`
   - Publish directory: `.next`

4. **Configure Environment Variables**
   Add these in Netlify's environment variables section:2 platform for aggregating college events including hackathons, tech talks, and workshops from multiple college websites. Built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Event Dashboard**: Browse upcoming tech events from colleges nationwide
- **Advanced Filtering**: Filter by event type, date, location, and college
- **Event Submission**: Easy form for organizers to submit new events
- **User Registration**: Register for events with capacity management
- **Event Favorites**: Save and manage favorite events
- **User Profiles**: Complete profile management system
- **Notifications**: Real-time notifications for registrations and updates
- **Analytics Dashboard**: Track registrations and engagement metrics
- **PWA Support**: Progressive Web App for mobile installation
- **Responsive Design**: Optimized for desktop and mobile devices
- **Event Details**: Comprehensive event information with registration links
- **Search Functionality**: Find events by title, description, tags, or college
- **Statistics Dashboard**: View event counts and statistics

## 🛠️ Technology Stack

- **Frontend**: Next.js 15 with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS for responsive design
- **Backend**: Next.js API routes with TypeScript
- **Database**: MongoDB Atlas with Mongoose ODM
- **Authentication**: Firebase Authentication
- **Development**: ESLint, PostCSS, and modern development tools

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd campusconnect
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   ```bash
   # Copy the example environment file
   cp .env.local.example .env.local
   ```

   Edit `.env.local` and add your configuration:

   - **MongoDB URI**: Your MongoDB Atlas connection string
   - **Firebase Configuration**: Your Firebase project credentials

   ```env
   # MongoDB Configuration
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/campusconnect

   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## � Deployment

### Deploy to Vercel

1. **Fork or clone this repository**
2. **Import to Vercel**

   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import from GitHub: `https://github.com/arafateasin/CampusConnect.git`

3. **Configure Environment Variables**
   Add these in Vercel's environment variables section:

   ```
   MONGODB_URI=your-mongodb-connection-string
   NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```

4. **Deploy**
   - Click "Deploy site"
   - Your app will be live at `https://your-site-name.netlify.app`

📋 **Your app is now hosted on Netlify with automatic deployments!**

## �🚦 Getting Started

### For Users

1. Visit the homepage to browse upcoming events
2. Use filters to find events by type, date, or location
3. Click on event cards to view detailed information
4. Register for events through the provided links

### For Event Organizers

1. Navigate to `/submit` to access the event submission form
2. Fill in all required event details
3. Submit the form to add your event to the platform
4. Your event will appear on the dashboard immediately

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── api/               # API routes
│   │   │   ├── events/        # Event CRUD operations
│   │   │   ├── colleges/      # College data
│   │   │   └── stats/         # Statistics endpoint
│   │   ├── events/[id]/       # Individual event pages
│   │   ├── submit/            # Event submission page
│   │   ├── about/             # About page
│   │   └── page.tsx           # Dashboard homepage
│   ├── components/            # Reusable UI components
│   │   ├── EventCard.tsx      # Event display component
│   │   ├── EventFilters.tsx   # Filtering component
│   │   ├── EventForm.tsx      # Event submission form
│   │   ├── Navbar.tsx         # Navigation component
│   │   └── ...
│   ├── lib/                   # Utility functions
│   │   ├── eventService.ts    # Event data operations
│   │   └── utils.ts           # Helper functions
│   └── types/                 # TypeScript type definitions
│       └── event.ts           # Event-related types
├── data/
│   └── events.json            # Event data storage
├── public/                    # Static assets
└── ...
```

## 🔧 API Endpoints

### Events

- `GET /api/events` - Get all events with optional filtering
- `POST /api/events` - Create a new event
- `GET /api/events/[id]` - Get a specific event
- `PUT /api/events/[id]` - Update an event
- `DELETE /api/events/[id]` - Delete an event

### Colleges

- `GET /api/colleges` - Get list of all colleges

### Statistics

- `GET /api/stats` - Get event statistics and counts

## 🎨 Event Types

The platform supports three main event types:

1. **Hackathons** - Competitive coding events where teams build solutions
2. **Tech Talks** - Presentations by industry experts on latest technologies
3. **Workshops** - Hands-on learning sessions for skill development

## 🔍 Filtering Options

- **Search**: Text search across event titles, descriptions, and tags
- **Event Type**: Filter by hackathon, tech talk, or workshop
- **College**: Filter by specific educational institution
- **Location**: Filter by city or state
- **Date Range**: Filter by start and end dates

## 📊 Sample Data

The platform comes with sample events from major universities including:

- MIT (AI & Machine Learning Hackathon)
- Stanford (Web Development Workshop)
- Harvard (Blockchain Technology Tech Talk)
- Carnegie Mellon (Cybersecurity Bootcamp)
- UC Berkeley (Startup Pitch Competition)
- Georgia Tech (Data Science Summit)

## 🚀 Development

### Running the Development Server

```bash
npm run dev
```

### Building for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## 🔮 Future Enhancements

- **Database Integration**: Upgrade from JSON to PostgreSQL/MongoDB
- **User Authentication**: Add user accounts and event management
- **Event Scraping**: Automated collection from college websites
- **Email Notifications**: Subscribe to event updates
- **Calendar Integration**: Export events to calendar applications
- **Social Features**: Comments, ratings, and event discussions
- **Mobile App**: React Native companion app
- **Analytics Dashboard**: Detailed event analytics for organizers

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contact Information

For questions, suggestions, or support:

- **Telegram**: [@your_telegram_id]
- **Twitter**: [@your_twitter_id]
- **Email**: your.email@example.com
- **Phone**: +1-XXX-XXX-XXXX

## 🌟 Acknowledgments

- Built for the college community to connect students with tech opportunities
- Inspired by the need for centralized event discovery
- Thanks to all contributors and event organizers

---

**Note**: This is a Web2 platform focusing on traditional web technologies. No blockchain or cryptocurrency features are included as per the project requirements.
