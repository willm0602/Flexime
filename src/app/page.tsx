import ResumeConfig from '@/components/pageSpecific/home/ResumeConfig';
import SignInSignOut from '@/components/SignInSignOut';
import getResume from '@/lib/auth/getResume';
import getUser from '@/lib/auth/getUser';

export default async function Home() {

    const resumeFromProfile = await getResume();
    const user = await getUser();

    return (
        <div
            className='font-[family-name:var(--font-geist-sans)] w-full md:w-4/5 mx-auto px-12 py-12'
            suppressHydrationWarning
        >
            <div className='flex justify-between'>
                <h1>Flexime</h1>
                <SignInSignOut user={user}/>
            </div>
            <ResumeConfig 
                initResume={resumeFromProfile}
            />
        </div>
    );
}
