import ResumeConfig from "@/components/pageSpecific/home/ResumeConfig";
import getResume from "@/lib/auth/getResume";

export default async function Home() {
  const resumeFromProfile = await getResume();
  console.log(resumeFromProfile);

  return (
    <div
      className="font-[family-name:var(--font-geist-sans)] w-full md:w-4/5 mx-auto px-12 py-12"
      suppressHydrationWarning
    >
      <h1>Configure Resume</h1>
      <ResumeConfig initResume={resumeFromProfile} />
    </div>
  );
}
