import type { User } from '@supabase/supabase-js';
import React from 'react';

const UserContext = React.createContext<User | null>(null);

export default UserContext;
