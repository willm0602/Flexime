import ErrorBanner from '@/components/ErrorBanner';
import Input from '@/components/pageSpecific/auth/input';
import { signup } from '@/lib/auth/actions';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default async function SignupPage() {
    const supabase = await createClient();
    if (!supabase) return notFound();

    return (
        <div className='min-h-screen min-w-full flex items-center justify-center'>
            <div className='card card-border bg-base-300 w-96'>
                <div className='card-body'>
                    <form>
                        <h2 className='card-title mt-1'>Signup</h2>
                        <Suspense>
                            <ErrorBanner />
                        </Suspense>
                        <Input
                            id='email'
                            name='email'
                            type='text'
                            label='Email'
                            placeholder='Enter your email'
                        />
                        <Input
                            id='password'
                            name='password'
                            type='password'
                            label='Password'
                            placeholder=''
                        />
                        <Input
                            id='confirm-password'
                            name='confirmPassword'
                            type='password'
                            label='Confirm Password'
                            placeholder=''
                        />
                        <div className='card-actions justify-end'>
                            <button
                                type='submit'
                                className='btn btn-primary w-full'
                                formAction={signup}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                    <div className='divider'>OR</div>
                    <div className='alert alert-info'>
                        <span>Third-party auth coming soon</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
