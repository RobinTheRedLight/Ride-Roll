import { createContext, ReactNode, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
  UserCredential,
  AuthProvider as FirebaseAuthProvider,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  createUser: (email: string, password: string) => Promise<UserCredential>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  providerLogin: (provider: FirebaseAuthProvider) => Promise<UserCredential>;
  updateUserProfile: (name: string, photo: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const auth = getAuth(app);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const createUser = (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email: string, password: string): Promise<UserCredential> => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = (): Promise<void> => {
    setLoading(true);
    return signOut(auth);
  };

  const providerLogin = (
    provider: FirebaseAuthProvider
  ): Promise<UserCredential> => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const updateUserProfile = (name: string, photo: string): Promise<void> => {
    if (auth.currentUser) {
      return updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
    } else {
      return Promise.reject(new Error("No user is currently signed in"));
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("current user", currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo: AuthContextType = {
    user,
    loading,
    createUser,
    signIn,
    logOut,
    providerLogin,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
