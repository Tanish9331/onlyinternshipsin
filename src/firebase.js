import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || 'demo-project.firebaseapp.com',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || 'demo-project.appspot.com',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: process.env.REACT_APP_FIREBASE_APP_ID || 'demo-app-id',
};

// Validate required environment variables
const requiredEnvVars = [
  'REACT_APP_FIREBASE_API_KEY',
  'REACT_APP_FIREBASE_AUTH_DOMAIN',
  'REACT_APP_FIREBASE_PROJECT_ID',
  'REACT_APP_FIREBASE_STORAGE_BUCKET',
  'REACT_APP_FIREBASE_MESSAGING_SENDER_ID',
  'REACT_APP_FIREBASE_APP_ID'
];

const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.warn('Missing Firebase environment variables:', missingEnvVars);
  console.warn('Using demo configuration. Please set up your .env file for production.');
}

// Initialize Firebase with error handling
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Firebase initialization failed:', error);
  throw new Error('Failed to initialize Firebase. Please check your configuration.');
}

// Enable debug mode in development
if (process.env.NODE_ENV === 'development') {
  console.log('Firebase Config:', {
    apiKey: firebaseConfig.apiKey ? '***' : 'MISSING',
    authDomain: firebaseConfig.authDomain,
    projectId: firebaseConfig.projectId,
    storageBucket: firebaseConfig.storageBucket,
    messagingSenderId: firebaseConfig.messagingSenderId,
    appId: firebaseConfig.appId ? '***' : 'MISSING'
  });
}

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

// Network connectivity check
const checkNetworkConnectivity = async () => {
  try {
    const response = await fetch('https://www.google.com', { 
      method: 'HEAD',
      mode: 'no-cors',
      cache: 'no-cache'
    });
    return true;
  } catch (error) {
    console.warn('Network connectivity issue detected:', error);
    return false;
  }
};

// Enhanced emulator connection with network check
if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_USE_EMULATOR === 'true') {
  checkNetworkConnectivity().then(isConnected => {
    if (isConnected) {
      try {
        const emulatorHost = process.env.REACT_APP_FIREBASE_EMULATOR_HOST || 'localhost';
        
        connectAuthEmulator(auth, `http://${emulatorHost}:9099`);
        connectFirestoreEmulator(db, emulatorHost, 8080);
        connectStorageEmulator(storage, emulatorHost, 9199);
        connectFunctionsEmulator(functions, emulatorHost, 5001);
        
        console.log('Firebase emulators connected successfully');
      } catch (error) {
        console.log('Firebase emulators not available or already connected:', error.message);
      }
    } else {
      console.warn('Network connectivity issues detected. Firebase emulators may not work properly.');
    }
  });
}

// Export the Firebase app instance
export default app;

// Firestore utility functions
export const firestoreUtils = {
  // Add document with timestamps
  addDoc: async (collection, data) => {
    try {
      const { addDoc, collection: firestoreCollection } = await import('firebase/firestore');
      const docRef = await addDoc(firestoreCollection(db, collection), {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return docRef;
    } catch (error) {
      console.error('Error adding document:', error);
      throw error;
    }
  },

  // Get document by ID
  getDoc: async (collection, docId) => {
    try {
      const { doc, getDoc } = await import('firebase/firestore');
      const docRef = doc(db, collection, docId);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
    } catch (error) {
      console.error('Error getting document:', error);
      throw error;
    }
  },

  // Update document
  updateDoc: async (collection, docId, data) => {
    try {
      const { doc, updateDoc } = await import('firebase/firestore');
      const docRef = doc(db, collection, docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating document:', error);
      throw error;
    }
  },

  // Delete document
  deleteDoc: async (collection, docId) => {
    try {
      const { doc, deleteDoc } = await import('firebase/firestore');
      const docRef = doc(db, collection, docId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  },

  // Query documents with constraints
  query: async (collection, constraints = []) => {
    try {
      const { collection: firestoreCollection, query, getDocs } = await import('firebase/firestore');
      const q = query(firestoreCollection(db, collection), ...constraints);
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error querying documents:', error);
      throw error;
    }
  }
};

// Storage utility functions
export const storageUtils = {
  // Upload file and get download URL
  uploadFile: async (path, file) => {
    try {
      const { ref, uploadBytes, getDownloadURL } = await import('firebase/storage');
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, file);
      return await getDownloadURL(snapshot.ref);
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  },

  // Delete file from storage
  deleteFile: async (path) => {
    try {
      const { ref, deleteObject } = await import('firebase/storage');
      const storageRef = ref(storage, path);
      await deleteObject(storageRef);
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }
};

// Authentication utility functions
export const authUtils = {
  // Get current user
  getCurrentUser: () => {
    return auth.currentUser;
  },

  // Get user token
  getUserToken: async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        return await user.getIdToken();
      }
      return null;
    } catch (error) {
      console.error('Error getting user token:', error);
      throw error;
    }
  },

  // Sign out user
  signOut: async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }
};

// Functions utility
export const functionsUtils = {
  // Call Firebase Function
  callFunction: async (functionName, data) => {
    try {
      const { httpsCallable } = await import('firebase/functions');
      const callFunction = httpsCallable(functions, functionName);
      return await callFunction(data);
    } catch (error) {
      console.error('Error calling Firebase function:', error);
      throw error;
    }
  }
};

// Test Firebase connection and authentication
export const testFirebaseConnection = async () => {
  try {
    console.log('Testing Firebase connection...');
    
    // Test basic connectivity
    const response = await fetch('https://www.google.com', { 
      method: 'HEAD',
      mode: 'no-cors',
      cache: 'no-cache'
    });
    console.log('✅ Network connectivity: OK');
    
    // Test Firebase config
    console.log('Firebase Config Status:', {
      apiKey: firebaseConfig.apiKey ? '✅ Set' : '❌ Missing',
      authDomain: firebaseConfig.authDomain ? '✅ Set' : '❌ Missing',
      projectId: firebaseConfig.projectId ? '✅ Set' : '❌ Missing',
      storageBucket: firebaseConfig.storageBucket ? '✅ Set' : '❌ Missing',
      messagingSenderId: firebaseConfig.messagingSenderId ? '✅ Set' : '❌ Missing',
      appId: firebaseConfig.appId ? '✅ Set' : '❌ Missing'
    });
    
    // Test auth service
    try {
      const { getAuth } = await import('firebase/auth');
      const testAuth = getAuth(app);
      console.log('✅ Firebase Auth service: OK');
    } catch (error) {
      console.error('❌ Firebase Auth service failed:', error);
    }
    
    // Test Firestore service
    try {
      const { getFirestore } = await import('firebase/firestore');
      const testDb = getFirestore(app);
      console.log('✅ Firebase Firestore service: OK');
    } catch (error) {
      console.error('❌ Firebase Firestore service failed:', error);
    }
    
    console.log('✅ Firebase connection test completed');
    return true;
  } catch (error) {
    console.error('❌ Firebase connection test failed:', error);
    return false;
  }
};

// Debug authentication issues
export const debugAuthIssue = async (email, password) => {
  console.log('🔍 Debugging authentication issue...');
  
  try {
    // Test Firebase connection first
    const connectionOk = await testFirebaseConnection();
    if (!connectionOk) {
      console.error('❌ Firebase connection failed');
      return false;
    }
    
    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error('❌ Invalid email format');
      return false;
    }
    
    // Check if password meets minimum requirements
    if (!password || password.length < 6) {
      console.error('❌ Password too short (minimum 6 characters)');
      return false;
    }
    
    console.log('✅ Input validation passed');
    console.log('✅ Firebase connection OK');
    console.log('✅ Ready for authentication attempt');
    
    return true;
  } catch (error) {
    console.error('❌ Debug failed:', error);
    return false;
  }
};

// Network diagnostics
export const networkDiagnostics = {
  checkConnectivity: async () => {
    try {
      const response = await fetch('https://www.google.com', { 
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-cache'
      });
      return true;
    } catch (error) {
      console.error('Network connectivity test failed:', error);
      return false;
    }
  },
  
  checkFirebaseDomain: async () => {
    try {
      const domain = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
      const response = await fetch(`https://${domain}`, { 
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-cache'
      });
      return true;
    } catch (error) {
      console.error('Firebase domain test failed:', error);
      return false;
    }
  }
}; 