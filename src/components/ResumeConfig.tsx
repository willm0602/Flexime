import type Resume from "@/lib/resume";
import type JSONResume from '@/lib/jsonResume';
import Templates from '@/lib/templates';
import ToggleField from "./ToggleField";
import { isTogglable } from "@/lib/togglable";

type ResumeConfigProps = {
  resume: Resume,
  baseResume: JSONResume,
  setResume: (resume: Resume) => void,
  template?: keyof typeof Templates
}

export default function ResumeConfig(
  props: ResumeConfigProps
) {
  const { resume, setResume } = props;
  const templateName = props.template || 'DEFAULT'
  const Template = Templates[templateName]

  return <div className='w-full flex'>
    <div className='flex-grow-1'>
      <h2 className='mt-0'>Configure Resume</h2>
      <ul className='pl-0'>
        {Object.entries(resume).map(([key, val]) => {
          if (!isTogglable(val)) {
            return;
          }

          return <li
            key={`toggle-field-${key}`}
            className='list-none'
          ><ToggleField
              fieldName={key as keyof Resume}
              togglable={val as Resume[keyof Resume]}
              parent={resume}
              setParent={setResume} /></li>
        })}
      </ul>
    </div>
    <div className='ml-12 w-[40em] h-[48em]'>
      <Template resume={resume} />
    </div>
  </div>
}
