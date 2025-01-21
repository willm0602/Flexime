import type { GeneratedResume, GeneratedResumeProps } from "@/lib/generatedResume";
import getCompaniesFromWork from "@/lib/getCompaniesFromWork";
import Resume from '@/lib/resume';
import { getIncludedVals } from "@/lib/togglable";
import WorkComponent from "./components/default/Work";
import ProjectComponent from './components/default/Project';
import EducationComponent from './components/default/Education';
import { Project, Education } from '@/lib/jsonResume';

const DefaultTemplate: GeneratedResume = (props: GeneratedResumeProps) => {

  const { resume } = props;

  function ResumeSection(props: { children?: React.ReactNode, title: string }) {
    return <div className='block justify-evenly w-full text-xs solid border-t-2 pb-2'>
      <h2 className='w-full text-center font-semibold my-2 text-base'>{props.title}</h2>
      {props.children}
    </div>
  }

  const profiles = getIncludedVals(resume.profiles);
  const companies = getIncludedVals(resume.workExperience);
  const projects = getIncludedVals(resume.personalProjects);
  const education = getIncludedVals(resume.education);

  return <div className='w-full min-h-full bg-white text-gray-600 not-prose p-4'>
    <h1 className='text-center mono mb-0 text-2xl font-bold' > {resume.name}</h1 >
    <div className='w-full flex justify-between text-xs pb-2'>
      {resume.phone.isOn && <span>
        {resume.phone.val}
      </span>}
      {resume.email.isOn &&
        <span>
          {resume.email.val}
        </span>
      }
      {profiles.map((profile, idx) => {
        return <span key={`profile-${idx}`}><a className='underline' href={profile.url}>{profile.network}</a></span>
      })}
    </div>

    {resume.workExperience.isOn && <ResumeSection title="Work Experience">
      {companies.map((company, idx) => {
        return <WorkComponent key={`work-${idx}`} company={company} />
      })}
    </ResumeSection>}

    {resume.education.isOn && <ResumeSection title="Education">
      {education.map((school: Education, idx: number) => {
        return <EducationComponent school={school} key={`school-${idx}`} />
      })}
    </ResumeSection>}

    {resume.personalProjects.isOn && <ResumeSection title="Personal Projects">
      {projects.map((project: Project, idx: number) => {
        return <ProjectComponent project={project} key={idx} />
      })}
    </ResumeSection>}
  </div >
};

export default DefaultTemplate;
