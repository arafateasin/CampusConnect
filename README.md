# CampusConnect - College Event Aggregator Platform

CampusConnect is a comprehensive platform for discovering and managing college events including hackathons, tech talks, and workshops from universities nationwide. Built with Next.js, TypeScript, and modern web technologies.

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
- **Search Functionality**: Find events by title, description, tags, or college

## 🛠️ Technology Stack

- **Frontend**: Next.js 15 with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS for responsive design
- **Backend**: Next.js API routes with TypeScript
- **Database**: MongoDB Atlas with Mongoose ODM
- **Authentication**: Firebase Authentication

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/arafateasin/CampusConnect.git
   cd CampusConnect
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

   ```env
   # MongoDB Configuration
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/campusconnect

   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.firebasestorage.app
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

### Deploy to Vercel

1. **Import to Vercel**

   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import from GitHub: `https://github.com/arafateasin/CampusConnect.git`

2. **Configure Environment Variables**
   Add your MongoDB and Firebase credentials in Vercel's environment variables section

3. **Deploy**
   - Click "Deploy"
   - Your app will be live at `https://your-project.vercel.app`

📋 **See [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) for detailed deployment instructions**

## 🚦 Getting Started

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

## 🎨 Event Types

The platform supports three main event types:

- **Hackathons** - Competitive coding events where teams build solutions
- **Tech Talks** - Presentations by industry experts on latest technologies
- **Workshops** - Hands-on learning sessions for skill development

## 🔍 Filtering Options

- **Search**: Text search across event titles, descriptions, and tags
- **Event Type**: Filter by hackathon, tech talk, or workshop
- **College**: Filter by specific educational institution
- **Location**: Filter by city or state
- **Date Range**: Filter by start and end dates

## 📊 Sample Data

The platform comes with sample events from major universities including MIT, Stanford, Harvard, Carnegie Mellon, UC Berkeley, and Georgia Tech.

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Contact Information

For questions, suggestions, or support:

- **Email**: easinarafat.bn@gmail.com
- **Telegram**: @easinarafat010
- **Twitter**: https://x.com/easinarafat_ss
- **Phone**: +601112794136

## 🌟 Acknowledgments

Built for the college community to connect students with tech opportunities and centralize event discovery across universities.
