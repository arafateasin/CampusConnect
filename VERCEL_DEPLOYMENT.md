# CampusConnect Vercel Deployment Guide

## 🚀 Deploying to Vercel

### Prerequisites

- Vercel account (https://vercel.com)
- MongoDB Atlas database
- Firebase project

### Deployment Steps

1. **Install Vercel CLI (optional)**

   ```bash
   npm install -g vercel
   ```

2. **Import from GitHub**

   - Go to https://vercel.com/dashboard
   - Click "New Project"
   - Import from GitHub: `https://github.com/arafateasin/CampusConnect.git`

3. **Configure Environment Variables**
   In Vercel dashboard, add these environment variables:

   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/campusconnect
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your app

### Build Settings

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### Domain Configuration

- Custom domain can be added in Vercel dashboard
- SSL certificate is automatically provided

### Environment Variables Security

- Never commit `.env.local` to Git
- Use Vercel's environment variables dashboard
- Use different MongoDB databases for development and production

### Monitoring

- Vercel provides analytics and monitoring
- Check deployment logs for any issues
- Monitor API endpoint performance

### Troubleshooting

- Check Vercel deployment logs
- Verify environment variables are set correctly
- Ensure MongoDB Atlas allows connections from 0.0.0.0/0 (all IPs)
- Check Firebase configuration for production domain

### Performance Optimization

- Next.js automatically optimizes for production
- Static assets are cached on Vercel's CDN
- API routes are optimized for serverless functions
