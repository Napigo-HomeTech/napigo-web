const AppConfig = {
    environment: import.meta.env.VITE_ENVIRONMENT || "development",
    serviceHost: import.meta.env.VITE_SERVICE_HOST || undefined,
    featureFlag: {
        url: import.meta.env.VITE_FEATURES_ENDPOINT,
    },
    firebase: {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        appId: import.meta.env.VITE_FIREBASE_APP_ID,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    },
    mockFetchDelay: import.meta.env.VITE_MOCK_DELAYS,
    build: {
        id: import.meta.env.VITE_BUILD_ID,
        poweredBy: import.meta.env.VITE_POWERED_BY,
        commitRef: import.meta.env.VITE_COMMIT_REF,
    },
    prelaunch: import.meta.env.VITE_PRE_LAUNCH,
};

export { AppConfig };
