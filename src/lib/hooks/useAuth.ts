import { useEffect, useState } from 'react';
import { createClient } from '../supabase/client';
import type { User } from '@supabase/supabase-js';

const supabase = createClient();

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  console.log('USER IS', user);

  useEffect(() => {
    if(!supabase) {
      return;
    }
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return user;
};

export default useAuth;