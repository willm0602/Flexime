import ResumeConfig from '@/components/pageSpecific/home/ResumeConfig';
import { createClient } from '@/lib/supabase/client';
import UserContext from '@/components/UserContext';
import UserPage from '@/components/UserPage';
import SignInSignOut from '@/components/SignInSignOut';

export default async function Home() {

    const supabase = createClient();
    const userResp = await supabase.auth.getUser();
    const user = userResp.data.user;

    return (
        <div
            className='font-[family-name:var(--font-geist-sans)] w-full md:w-4/5 mx-auto px-12 py-12'
            suppressHydrationWarning
        >
            <UserPage user={user}>
                <div className='flex justify-between'>
                    <h1>Flexime</h1>
                    <SignInSignOut user={user}/>
                </div>
                <ResumeConfig />
            </UserPage>
        </div>
    );
}
