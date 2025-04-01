import ResumeConfig from '@/components/pageSpecific/home/ResumeConfig';

const LOCAL_STORAGE_KEY = 'saved-resume';

export default function Home() {
    return (
        <div
            className='font-[family-name:var(--font-geist-sans)] w-full md:w-4/5 mx-auto px-12 py-12'
            suppressHydrationWarning
        >
            <>
                <div className='flex'>
                    <h1>Flexime</h1>
                </div>
                <ResumeConfig />
            </>
        </div>
    );
}
