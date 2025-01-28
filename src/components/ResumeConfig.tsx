import type Resume from "@/lib/resume";
import type JSONResume from '@/lib/jsonResume';
import Templates from '@/lib/templates';
import ToggleField from "./ToggleField";
import Togglable, { isTogglable } from "@/lib/togglable";
import { useState } from "react";

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
  const Template = Templates[templateName];

  function getResumePDFLink() {
    return `/api/pdf/?resume=${JSON.stringify(resume)}`
  }

  const [currURL, setCurrURL] = useState<string>(getResumePDFLink());

  const updateCurrUrl = () => {
    setCurrURL(getResumePDFLink());
  }

  return <div className='w-full flex'>
    <div className='flex-grow-1'>
      <div className='flex'>
        <a className='btn' href={getResumePDFLink()} target="_blank">View Resume</a>
        <a className='btn' href="/profile">Modify Profile Here</a>
      </div>
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
              // @ts-expect-error type needs to be generic
              togglable={val as Resume[keyof Resume] & Togglable<unknown>}
              parent={resume}
              setParent={setResume} /></li>
        })}
      </ul>
    </div>
    <div>
      <button className='btn btn-primary ml-12 mb-4' onClick={updateCurrUrl}>Update</button>
      <div className='ml-12 w-[68em] h-[73em]'>
        <iframe width={'100%'} height={'100%'} src={currURL} />
      </div>
    </div>
  </div>
}
