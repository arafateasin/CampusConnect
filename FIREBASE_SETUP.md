# Firebase Setup Instructions

## Quick Start (For Demo)

Since Firebase requires a real project, here's how to set up authentication:

### Option 1: Use Demo Mode (No Real Authentication)

The application will work without Firebase by showing the authentication UI but not actually authenticating users. This is useful for demonstration purposes.

### Option 2: Set up your own Firebase project

1. **Go to Firebase Console**

   - Visit https://console.firebase.google.com/
   - Click "Add project"
   - Choose a project name (e.g., "college-events-yourname")

2. **Enable Authentication**

   - Go to "Authentication" → "Sign-in method"
   - Enable "Email/Password"
   - Enable "Google" (optional)

3. **Get Configuration**

   - Go to "Project settings" → "General" → "Your apps"
   - Click "Add app" → Web app
   - Copy the config object values

4. **Update Environment Variables**

   - Copy `.env.local.example` to `.env.local`
   - Replace the placeholder values with your actual Firebase config

5. **Restart Development Server**
   ```bash
   npm run dev
   ```

## Environment Variables Required

Create `.env.local` file with:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

## Testing Without Firebase

The application includes fallback UI that shows the authentication interface without requiring a real Firebase project. This is perfect for:

- Demonstrating the UI/UX
- Testing the frontend functionality
- Showing the complete user flow

The authentication modal will appear and function normally, but won't actually authenticate users until you configure Firebase.
