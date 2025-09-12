import Input from '@/components/pageSpecific/auth/input';
import { resetPassword } from '@/lib/auth/actions';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

export default function PasswordResetPage() {
    const supabase = createClient();
    if (!supabase) return notFound();

    return (
        <div className='min-h-screen min-w-full flex items-center justify-center'>
            <div className='card card-border bg-base-300 w-96'>
                <div className='card-body'>
                    <form>
                        <h2 className='card-title mt-1'>Reset Password</h2>
                        <Input
                            id='email'
                            name='email'
                            type='text'
                            label='Email'
                            placeholder='Enter your email'
                        />
                        <div className='card-actions justify-end'>
                            <button
                                type='submit'
                                className='btn btn-primary w-full'
                                formAction={resetPassword}
                            >
                                Reset Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
