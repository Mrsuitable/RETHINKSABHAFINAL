import { BookOpen, Mic, Search, Users, Video } from 'lucide-react';
import { useState, useEffect } from 'react';
import { auth, googleProvider, signInWithPopup, signOut } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      console.error("Error signing in", error);
      setAuthError(error.message || "Failed to sign in");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <a href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <Mic className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-2xl font-bold text-slate-900 tracking-tight">Rethink Sabha</span>
          </a>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#debates" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Active Debates</a>
            <a href="#learn" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Learn to Debate</a>
            <a href="#about" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">About Us</a>
            {user ? (
              <div className="flex items-center space-x-4">
                {user.photoURL && (
                  <img src={user.photoURL} alt="Profile" className="h-8 w-8 rounded-full" referrerPolicy="no-referrer" />
                )}
                <button onClick={handleSignOut} className="bg-slate-100 text-slate-700 px-5 py-2 rounded-full font-medium hover:bg-slate-200 transition-colors shadow-sm">
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-end relative">
                <button onClick={handleSignIn} className="bg-indigo-600 text-white px-5 py-2 rounded-full font-medium hover:bg-indigo-700 transition-colors shadow-sm">
                  Sign In
                </button>
                {authError && (
                  <div className="absolute top-full mt-2 right-0 w-64 bg-red-50 border border-red-200 text-red-600 text-xs p-2 rounded shadow-lg z-50">
                    {authError}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
