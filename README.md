# Firebase Authentication and Firestore Database with React

This project demonstrates how to implement user authentication and data management using Firebase Authentication and Firestore Database in a React application. It allows users to sign up, log in, and manage their to-do lists securely.

## Features

- User Authentication: Sign up, log in, and log out functionality using Firebase Authentication.
- Firestore Database: Store and manage to-do items in Firestore, allowing users to create
  , read, update, and delete their tasks.

![alt text](image.png)

## Environment Variables Setup

Before running the project, create a `.env` file in the root directory and add your Firebase configuration variables as shown below:

```
VITE_FIREBASE_API_KEY=""
VITE_FIREBASE_AUTH_DOMAIN=""
VITE_FIREBASE_PROJECT_ID=""
VITE_FIREBASE_STORAGE_BUCKET=""
VITE_FIREBASE_MESSAGING_SENDER_ID=""
VITE_FIREBASE_APP_ID=""
```

Replace the empty strings with your actual Firebase project configuration values, which can be found in your Firebase console under project settings.
