import ResumeConfig from '@/components/pageSpecific/home/ResumeConfig';
import SignInSignOut from '@/components/SignInSignOut';
import getResume from '@/lib/auth/getResume';

export default async function Home() {

    const resumeFromProfile = await getResume();
    console.log('PROFILE IS', resumeFromProfile);

    return (
        <div
            className='font-[family-name:var(--font-geist-sans)] w-full md:w-4/5 mx-auto px-12 py-12'
            suppressHydrationWarning
        >
            <div className='flex justify-between'>
                <h1>Flexime</h1>
                <SignInSignOut />
            </div>
            <ResumeConfig 
                initResume={resumeFromProfile}
            />
        </div>
    );
}
