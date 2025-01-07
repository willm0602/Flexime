'use client';

import Image from "next/image";
import { InformationCircleIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import Resume from "@/lib/resume";
import { DEFAULT_RESUME } from "@/lib/resumeUtils";
import HomePageHeader from "@/components/pageSpecific/home/header";
import ResumeBasicsSection from "@/components/pageSpecific/home/resumeBasicsSection";

export default function Home() {
  const [resume, setResume] = useState<Resume>(DEFAULT_RESUME);

  return (
    <div className="font-[family-name:var(--font-geist-sans)] w-full md:w-2/3 mx-auto px-12 pt-12">
      <HomePageHeader
        setResume={setResume}
      />
      <ResumeBasicsSection
        setResume={setResume}
        resume={resume}
      />
    </div>
  );
}
