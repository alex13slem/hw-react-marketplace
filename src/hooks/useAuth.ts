import { useEffect } from 'react';
import { useAuthStore } from '../store/auth';
import supabase from '../supabase';

const useAuth = () => {
  const setSession = useAuthStore((state) => state.setSession);
  const setUser = useAuthStore((state) => state.setUser);
  const clearAuthUser = useAuthStore((state) => state.clearAuthUser);

  useEffect(() => {
    async function loader() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) return clearAuthUser();
        setSession(session);
        setUser(session.user);
      } catch (error) {
        console.error(error);
      }
    }
    loader();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) return clearAuthUser();
      setSession(session);
      setUser(session.user);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [clearAuthUser, setSession, setUser]);
};

export default useAuth;
