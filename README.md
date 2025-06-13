# MyChat

MyChat is a mobile chat application built with React Native, Expo, and Firebase.

## Features

* User authentication (Login)
* Real-time chat functionality
* Home screen to display available chats or contacts (assumption)

## Tech Stack

* **Frontend:**
    * React Native
    * Expo
    * TypeScript
    * React Navigation (for screen navigation)
    * React Native Gifted Chat (for the chat UI)
    * Async Storage (for local data storage)
* **Backend:**
    * Firebase (Authentication, likely Firestore/Realtime Database for chat messages)

## Prerequisites

* Node.js and npm/yarn installed
* Expo CLI installed (`npm install -g expo-cli`)
* An Android emulator or physical device (for Android development)
* Xcode and an iOS simulator or physical device (for iOS development)
* Firebase project setup with authentication enabled. You will need to configure `firebaseConfig.ts` with your project's credentials.

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd mychat
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    ```
3.  **Configure Firebase:**
    *   Create a `firebaseConfig.ts` file in the root of the project (if it doesn't exist or needs your credentials).
    *   Add your Firebase project configuration details to this file. It should look something like this:
        ```typescript
        // firebaseConfig.ts
        import { initializeApp } from "firebase/app";
        import { getAuth } from "firebase/auth";
        import { getFirestore } from "firebase/firestore";

        const firebaseConfig = {
          apiKey: "YOUR_API_KEY",
          authDomain: "YOUR_AUTH_DOMAIN",
          projectId: "YOUR_PROJECT_ID",
          storageBucket: "YOUR_STORAGE_BUCKET",
          messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
          appId: "YOUR_APP_ID"
        };

        const app = initializeApp(firebaseConfig);
        export const auth = getAuth(app);
        export const db = getFirestore(app);
        ```

4.  **Run the application:**

    *   **To start the development server:**
        ```bash
        npm start
        # or
        # expo start
        ```
        This will open the Expo Developer Tools in your browser. You can then choose to run the app on an emulator/simulator or scan the QR code with the Expo Go app on your physical device.

    *   **To run directly on Android:**
        ```bash
        npm run android
        # or
        # expo run:android
        ```

    *   **To run directly on iOS:**
        ```bash
        npm run ios
        # or
        # expo run:ios
        ```

    *   **To run in the web browser (experimental/limited functionality for some native modules):**
        ```bash
        npm run web
        # or
        # expo start --web
        ```

## Building for Production

*   **To build an Android APK:**
    ```bash
    npm run build-apk
    ```
    The APK will be located in `android/app/build/outputs/apk/release/`.

## Project Structure (Key Files & Folders)

```
mychat/
├── .expo/                # Expo configuration and cache
├── .git/                 # Git repository files
├── android/              # Android specific project files
├── assets/               # Static assets (images, fonts, etc.)
├── node_modules/         # Project dependencies
├── src/
│   ├── screens/          # Application screens (LoginScreen, HomeScreen, ChatScreen)
│   ├── components/       # Reusable UI components (assumption)
│   └── services/         # Firebase services, API calls, etc. (assumption)
├── App.tsx               # Main application component, navigation setup
├── NavigationTypes.ts    # TypeScript types for navigation
├── babel.config.js       # Babel compiler configuration
├── firebaseConfig.ts     # Firebase project configuration
├── index.ts              # Entry point for the app (registers App.tsx)
├── metro.config.js       # Metro bundler configuration
├── package.json          # Project metadata, dependencies, and scripts
├── tsconfig.json         # TypeScript compiler configuration
└── .gitignore            # Files and folders to be ignored by Git
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the [0BSD License](LICENSE).

*(You might want to create a `LICENSE` file in your project root containing the text of the 0BSD license if you haven't already.)*
