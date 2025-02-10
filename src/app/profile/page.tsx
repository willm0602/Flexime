'use client';

import { DEFAULT_RESUME } from "@/lib/resumeUtils";
import Link from "next/link";
import LoadResume from "@/components/LoadResume";
import Resume from "@/lib/jsonResume";
import useLocalStorage from "@/lib/useLocalStorage";
import * as Tabs from "@radix-ui/react-tabs";
import EditBasics from "@/components/pageSpecific/profile/EditBasics";
import EditWork from "@/components/pageSpecific/profile/EditWork";
import EditEducation from "@/components/pageSpecific/profile/EditEducation";
import EditProjects from "@/components/pageSpecific/profile/EditProjects";
import EditSkills from "@/components/pageSpecific/profile/EditSkills";

const RESUME_KEY = 'saved-resume';

export default function ConfigureProfile() {
  const [resume, setResume] = useLocalStorage<Resume>(RESUME_KEY, DEFAULT_RESUME);

  if (!resume)
    return 'loading...'

  return <div className="font-[family-name:var(--font-geist-sans)] w-full md:w-4/5 mx-auto px-12 py-12">
    <h1>Modify Profile</h1>
    <div className="flex">
      <Link href="/" className='btn no-underline'>Return Home</Link>
      <LoadResume setResume={setResume} />
      <a href={'/api/pdf'} className="btn no-underline btn-secondary text-black ml-4" download="resume.json">Export Profile</a>
    </div>

    <Tabs.Root defaultValue="basics" className="mt-12">
      <Tabs.List className="tabs-boxed">
        <Tabs.Trigger value="basics" className="tab">Basics</Tabs.Trigger>
        <Tabs.Trigger value="work" className="tab">Work Experience</Tabs.Trigger>
        <Tabs.Trigger value="education" className="tab">Education</Tabs.Trigger>
        <Tabs.Trigger value="projects" className="tab">Personal Projects</Tabs.Trigger>
        <Tabs.Trigger value="skills" className="tab">Skills</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="basics">
        <EditBasics resume={resume}
          setResume={setResume} />
      </Tabs.Content>
      <Tabs.Content value="work">
        <EditWork resume={resume}
          dispatchResume={setResume} />
      </Tabs.Content>
      <Tabs.Content value="education">
        <EditEducation resume={resume}
          dispatchResume={setResume} />
      </Tabs.Content>
      <Tabs.Content value="projects">
        <EditProjects resume={resume}
          dispatchResume={setResume} />
      </Tabs.Content>
      <Tabs.Content value="skills">
        <EditSkills resume={resume}
          dispatchResume={setResume} />
      </Tabs.Content>

    </Tabs.Root>

  </div>
}
