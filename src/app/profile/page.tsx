'use client';

import useLocalStorage from "@/lib/useLocalStorage";
import { DEFAULT_RESUME } from "@/lib/resumeUtils";
import Link from "next/link";
import Tabpane from "@/components/Tabpane";
import EditBasics from "@/components/pageSpecific/profile/EditBasics";
import EditWorkExperience from '@/components/pageSpecific/profile/EditWork';

const RESUME_KEY = 'saved-resume';

export default function ConfigureProfile() {
  const [resume, setResume] = useLocalStorage(RESUME_KEY, DEFAULT_RESUME);

  return <div className="font-[family-name:var(--font-geist-sans)] w-full md:w-4/5 mx-auto px-12 py-12">
    <h1>Modify Profile</h1>
    <Link href="/" className='btn'>Return Home</Link>

    <Tabpane
      className='mt-12'
      tabs={{
        basics: {
          text: 'Basics',
          content: <EditBasics resume={resume}
            setResume={setResume} />
        },
        work: {
          text: 'Work Experience',
          content: <EditWorkExperience resume={resume} setResume={setResume} />
        }
      }}
    />

  </div>
}
