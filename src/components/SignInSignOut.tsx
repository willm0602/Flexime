'use client';

import useAuth from '@/lib/hooks/useAuth';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import Link from 'next/link';

const linkClassName = 'btn btn-primary no-underline';

function SignIn() {
    return (
        <div>
            <Link href='/login' className={`${linkClassName} mr-4`}>
                Login
            </Link>
            <Link href='/signup' className={linkClassName}>
                Signup
            </Link>
        </div>
    );
}

function SignOut() {
    return (
        <div>
            <a className={linkClassName} href='/signout'>
                Signout
            </a>
        </div>
    );
}

interface SignInSignOutProps {
    user: User | null;
}

export default function SignInSignOut({ user }: SignInSignOutProps) {
    const supabase = createClient();
    if (!supabase) return null;
    return user ? <SignOut /> : <SignIn />;
}
