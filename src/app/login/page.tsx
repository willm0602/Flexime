import ErrorBanner from "@/components/ErrorBanner";
import Input from "@/components/pageSpecific/auth/input"
import { login } from "@/lib/auth/actions"
import { createClient } from "@/lib/supabase/client";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default function SigninPage(){

  const supabase = createClient();
  if(!supabase)
    return notFound();

  return <div className="min-h-screen min-w-full flex items-center justify-center">
    <div className="card card-border bg-base-300 w-96">
    <div className="card-body">
      <form>
        <h2 className="card-title mt-1">Login</h2>
        <Suspense><ErrorBanner /></Suspense>
        <Input id='email' name='email' type='text' label='Email' placeholder='Enter your email'/>
        <Input id='password' name='password' type='password' label='Password' placeholder=''/>
        <div className="card-actions justify-end">
          <button type="submit" className="btn btn-primary w-full" formAction={login}>Submit</button>
        </div>
      </form>
      <div className="divider">OR</div>
      <div className="flex max-w-full justify-between">
        <a href="/signup" className="btn btn-secondary flex-1 mr-2 text-black no-underline">Sign Up</a>
        <a href="/" className="btn btn-accent no-underline flex-1 text-black">Return Home</a>
      </div>
      <div className='alert alert-info'>
          <span>Third-party auth coming soon</span>
      </div>
    </div>
  </div>
  </div>
}