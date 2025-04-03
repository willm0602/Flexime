'use client';

import useAuth from "@/lib/hooks/useAuth";
import type { User } from "@supabase/supabase-js";

const linkClassName = 'btn btn-primary no-underline'

function SignIn(){
    return <div>
        <a href="/login" className={`${linkClassName} mr-4`}>Login</a>
        <a href="/signup" className={linkClassName}>Signup</a>
    </div>
}

function SignOut(){
    return <div>
        <a className={linkClassName} href="/signout">Signout</a>
    </div>
}

export default function SignInSignOut(){
    const user = useAuth();
    console.log('USER IS', user);
    return user ? <SignOut/> : <SignIn />
}