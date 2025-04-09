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
            <h1>Configure Resume</h1>
            <ResumeConfig initResume={resumeFromProfile} />
        </div>
    );
}
