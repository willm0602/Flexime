import type { GeneratedResume, GeneratedResumeProps } from "@/lib/generatedResume";
import WorkComponent from "./components/default/work";
import { Education, Project, Work } from "@/lib/resume";
import getCompaniesFromWork from "@/lib/getCompaniesFromWork";
import ProjectComponent from '@/components/templates/components/default/project';
import EducationComponent from "./components/default/education";


const DefaultTemplate: GeneratedResume = (props: GeneratedResumeProps) => {

  const { resume } = props;
  const companies: Record<string, Work[]> = getCompaniesFromWork(resume.work);

  function ResumeSection(props: { children?: React.ReactNode, title: string }) {
    return <div className='block justify-evenly w-full text-xs solid border-t-2 pb-2'>
      <h2 className='w-full text-center font-semibold my-2 text-base'>{props.title}</h2>
      {props.children}
    </div>
  }

  return <div className='w-full h-full bg-white text-gray-600 not-prose p-4'>
    <h1 className='text-center mono mb-0 text-2xl font-bold' > {resume.basics.name}</h1 >
    <div className='w-full flex justify-between text-xs pb-2'>
      <span>
        {resume.basics.phone}
      </span>
      <span>
        {resume.basics.email}
      </span>
      {resume.basics.url && <span>
        <a href={resume.basics.url} className='underline'>Personal Site</a>
      </span>}
      {resume.basics.profiles.map((profile, idx) => {
        return <span key={`profile-${idx}`}><a className='underline' href={profile.url}>{profile.network}</a></span>
      })}
    </div>

    <ResumeSection title="Work Experience">
      {Object.entries(companies).map(([companyName, positions], idx) => {
        return <WorkComponent key={`work-${idx}`} company={companyName} work={positions} />
      })}
    </ResumeSection>

    <ResumeSection title="Personal Projects">
      {resume.projects.map((project: Project, idx: number) => {
        return <ProjectComponent project={project} key={idx} />
      })}
    </ResumeSection>

    <ResumeSection title="Education">
      {resume.education.map((school: Education, idx: number) => {
        return <EducationComponent school={school} key={`school-${idx}`} />
      })}
    </ResumeSection>
  </div >
};

export default DefaultTemplate;
