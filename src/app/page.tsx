import ResumeConfig from '@/components/pageSpecific/home/ResumeConfig';
import getResume from '@/lib/auth/getResume';
import getUser from '@/lib/auth/getUser';

export default async function Home() {
    const resumeFromProfile = await getResume();
    const user = await getUser();

    return (
        <div
            className='font-(family-name:--font-geist-sans) w-full md:w-4/5 mx-auto md:px-12 md:py-12 px-4 py-4'
            suppressHydrationWarning
        >
            <h1>Configure Resume</h1>
            <ResumeConfig user={user} initResume={resumeFromProfile} />
        </div>
    );
}
