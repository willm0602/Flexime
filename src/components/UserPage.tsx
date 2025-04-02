'use client';

import type React from "react";
import UserContext from "./UserContext";
import type { User } from "@supabase/supabase-js";

interface UserPageProps{
    children: React.ReactNode,
    user: User | null
}

export default function UserPage({children, user}: UserPageProps){
    console.log('USER IS', user);
    return <UserContext value={user}>
        {children}
    </UserContext>
}