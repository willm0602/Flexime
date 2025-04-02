import type { User } from "@supabase/supabase-js";

interface SignInSignOutProps {
    user: User | null
};

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

export default function SignInSignOut({user}: SignInSignOutProps){
    return user ? <SignOut/> : <SignIn />
}