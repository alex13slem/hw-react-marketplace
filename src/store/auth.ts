import { Session, User } from '@supabase/supabase-js';
import { create } from 'zustand';

interface AuthStore {
  user: User | null;
  session: Session | null;
  setUser: (user: User) => void;
  setSession: (session: Session) => void;
  clearAuthUser: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  session: null,
  setUser(user) {
    set({ user });
  },
  setSession(session) {
    set({ session });
  },
  clearAuthUser() {
    set({ user: null, session: null });
  },
}));

export { useAuthStore };
