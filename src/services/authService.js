import { supabase } from './supabase.js';
import { useUserStore } from '../store/userStore.js';

export const loginAdmin = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw error;
    return { success: true, user: data.user };
  } catch (error) {
    console.error("Authentication failed:", error);
    return { success: false, error: error.message };
  }
};

export const logoutAdmin = async () => {
  await supabase.auth.signOut();
};

export const initAuthListener = () => {
  const userStore = useUserStore();
  
  supabase.auth.onAuthStateChange((event, session) => {
    userStore.setAdmin(session?.user || null);
    if (!userStore.isAuthInitialized) {
      userStore.setInitialized();
    }
  });
};
