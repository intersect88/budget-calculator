# Firebase Configuration for Budget Calculator

## 📋 Steps to Configure Firebase

### 1. Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click on "Add project"
3. Enter a project name (e.g., "budget-calculator")
4. Follow the guided steps

### 2. Add a Web App
1. In the project dashboard, click on the Web icon `</>`
2. Register the app with a nickname (e.g., "Budget Calculator Web")
3. Copy the Firebase configuration that appears

### 3. Enable Authentication
1. In the side menu, go to "Authentication"
2. Click on "Get started"
3. In the "Sign-in method" tab:
   - Enable **Email/Password**
   - Enable **Google** (add support email when requested)

### 4. Configure Firestore (Optional for cloud sync)
1. In the side menu, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location for the database

### 5. Update Configuration File
Copy your Firebase configuration and paste it into `src/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",  // Your API key
  authDomain: "budget-calculator-xxxxx.firebaseapp.com",
  projectId: "budget-calculator-xxxxx",
  storageBucket: "budget-calculator-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef..."
};
```

### 6. Configure Authorized Domain
1. In Firebase Console > Authentication > Settings
2. In the "Authorized domains" section
3. Add `localhost` if not already present (should be there by default)

## 🚀 Starting the Application

```bash
npm start
```

## 🔐 Authentication Features

- ✅ Registration with email/password
- ✅ Login with email/password
- ✅ Login with Google
- ✅ Logout
- ✅ Error handling in English
- ✅ Persistent session

## 📝 Important Notes

- Data is currently saved in **localStorage** (local to the browser)
- To sync data across devices, you'll need to implement Firestore
- Firebase configuration should NOT be committed to public repositories
- Consider using environment variables (`.env`) for configuration in production

## 🛡️ Firestore Security Rules (if you implement the database)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```
