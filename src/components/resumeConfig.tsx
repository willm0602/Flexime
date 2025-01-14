import type Resume from "@/lib/resume"
import Templates from '../../templates';

type ResumeConfigProps = {
  resume: Resume,
  baseResume: Resume,
  setResume: (resume: Resume) => void,
  template?: keyof typeof Templates
}

export default function ResumeConfig(
  props: ResumeConfigProps
) {
  const { resume } = props;
  const templateName = props.template || 'DEFAULT'
  const Template = Templates[templateName]

  type ResumeField = keyof Resume | keyof keyof Resume;

  const ToggleResumeField: React.FC = (props: {
    resumeField: ResumeField,
    parent: Resume | Resume[keyof Resume]
  }) => {
    const { resumeField, parent } = props;
    return <input />
  }

  return <div className='w-full flex'>
    <div className='flex-grow-1'>
      <h2 className='mt-0'>Configure Resume</h2>
      <ToggleResumeField resumeField= />
    </div>
    <div className='ml-12 w-[40em] h-[48em]'>
      <Template resume={resume} />
    </div>
  </div>
}
