'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import type { User } from '@supabase/supabase-js';

interface SignupFormData {
    email: string;
    password: string;
    confirmPassword: string;
}

export async function login(formData: FormData) {
    const supabase = await createClient();
    if (!supabase) return;
    // type-casting here for convenience
    // in practice, you should validate your inputs
    const signin = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    };
    const { error } = await supabase.auth.signInWithPassword(signin);
    if (error) {
        const params = new URLSearchParams({ error: error.message });
        redirect(`/login?${params.toString()}`);
    }
    revalidatePath('/', 'layout');
    redirect('/');
}

function validateForm(data: SignupFormData) {
    if (!data.email || !data.password || !data.confirmPassword) {
        return 'Missing required fields';
    }
    if (data.password !== data.confirmPassword) {
        return 'Passwords do not match';
    }

    if (!data.email.includes('@')) {
        return 'Invalid email address';
    }

    if (data.password.length < 8) {
        return 'Password must be at least 8 characters long';
    }

    return false;
}

export async function signup(formData: FormData) {
    const supabase = await createClient();

    if (!supabase) return;
    // type-casting here for convenience
    // in practice, you should validate your inputs
    const signUpData: SignupFormData = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        confirmPassword: formData.get('confirmPassword') as string,
    };

    const validation = validateForm(signUpData);
    if (validation) {
        // redirect to error page
        const params = new URLSearchParams({ error: validation });
        redirect(`/signup?${params.toString()}`);
    }

    const { data, error } = await supabase.auth.signUp(signUpData);
    if (error) {
        const params = new URLSearchParams({ error: error.message });
        redirect(`/signup?${params.toString()}`);
    } else {
        const { user } = data;
        await makeUserProfileFor(user);
    }
    revalidatePath('/', 'layout');
    redirect('/');
}

export async function resetPassword(formData: FormData) {
    const supabase = await createClient();
    if (!supabase) return;
    const email = formData.get('email') as string;
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const redirectURL = new URL('/login', baseUrl);
    redirectURL.searchParams.set('error', 'Sent Password Reset');
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `/reset/password`,
    });
    if (error) throw error;
    revalidatePath('/', 'layout');
    redirect(redirectURL.href);
}

async function makeUserProfileFor(user: User | null) {
    if (!user) {
        console.error(
            'Unable to create user profile, no response returned after signup',
        );
        return;
    }
    const { id } = user;
    const supabaseClient = await createClient();
    if (!supabaseClient) return;
    const { error } = await supabaseClient.from('userprofile').insert({
        user_id: id,
        settings: {},
    });
    if (error) {
        console.error(error);
    }
}

export async function signout() {
    const supabase = await createClient();
    if (!supabase) return;
    supabase.auth.signOut();
}
