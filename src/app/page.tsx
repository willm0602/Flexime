import ResumeConfig from '@/components/pageSpecific/home/ResumeConfig';

export default async function Home() {
    return (
        <div
            className='font-(family-name:--font-geist-sans) w-full md:w-4/5 mx-auto md:px-12 md:py-12 px-4 py-4'
            suppressHydrationWarning
        >
            <h1>Configure Resume</h1>
            <ResumeConfig />
        </div>
    );
}
