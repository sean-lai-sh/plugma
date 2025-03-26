// app/providers/AuthProvider.tsx
'use client';
import { createContext, useEffect, useState, useContext } from 'react';
import { supabase } from '@/lib/supabaseClient';

type AuthContextType = {
  user: any;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    // Get initial user state
    getUser();

    // Save current path before route changes
    if (typeof window !== 'undefined' && window.location.pathname !== '/sign-in') {
      sessionStorage.setItem("prevPath", window.location.pathname);
    }

    // Listen to Supabase auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Listen for changes in localStorage (for cross-tab auth updates)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'supabase.auth.token') {
        getUser();
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      listener.subscription.unsubscribe();
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
