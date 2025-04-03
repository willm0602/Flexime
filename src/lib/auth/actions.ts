'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

interface SignupFormData {
    email: string,
    password: string,
    confirmPassword: string,
}

export async function login(formData: FormData) {
    const supabase = await createClient()
    // type-casting here for convenience
    // in practice, you should validate your inputs
    const signin = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }
    const { error } = await supabase.auth.signInWithPassword(signin);
    if (error) {
        redirect('/error')
    }
    revalidatePath('/', 'layout')
    redirect('/')
}

function validateForm(data: SignupFormData) {
    if (!data.email || !data.password || !data.confirmPassword) {
        return 'Missing required fields'
    }
    if (data.password !== data.confirmPassword) {
        return 'Passwords do not match'
    }

    if(!data.email.includes('@')) {
        return 'Invalid email address'
    }

    if(data.password.length < 8) {
        return 'Password must be at least 8 characters long'
    }

    return false;
}

export async function signup(formData: FormData) {
    const supabase = await createClient()
    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data: SignupFormData = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        confirmPassword: formData.get('confirmPassword') as string,
    };

    const validation = validateForm(data)
    if (validation) {
        console.log('VALIDATION ERROR', validation);
        // redirect to error page
        const params = new URLSearchParams({error: validation})
        redirect(`/signup?${params.toString()}`);
    }


    const { error } = await supabase.auth.signUp(data)
    if (error) {
        const params = new URLSearchParams({error: error.message})
        redirect(`/signup?${params.toString()}`);
    }
    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signout() {
    const supabase = await createClient();
    supabase.auth.signOut();
}