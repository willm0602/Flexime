'use client';
import Input from "@/components/pageSpecific/auth/input"
import { login } from "@/lib/auth/actions"
import { useSearchParams } from "next/navigation";

export default function SignupPage(){

  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  console.log(error);

  return <div className="min-h-screen min-w-full flex items-center justify-center">
    <div className="card card-border bg-base-300 w-96">
    <div className="card-body">
      <form>
        <h2 className="card-title mt-1">Login</h2>
        {error && <div className="alert alert-error shadow-lg mb-8">
          <div>
            <span>{error}</span>
          </div>
        </div>}
        <Input id='email' name='email' type='text' label='Email' placeholder='Enter your email'/>
        <Input id='password' name='password' type='password' label='Password' placeholder=''/>
        <div className="card-actions justify-end">
          <button type="submit" className="btn btn-primary w-full" formAction={login}>Submit</button>
        </div>
      </form>
      <div className="divider">OR</div>

    </div>
  </div>
  </div>
}