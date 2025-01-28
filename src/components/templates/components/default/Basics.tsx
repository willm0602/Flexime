import type Resume from "@/lib/resume";
import { togglable } from "@/lib/togglable";

export default function ResumeBasics(props: { resume: Resume }) {

  const { resume } = props;

  const profiles = (resume.profiles.children || []).filter((togglableProfile) => togglableProfile.isOn).map((togglableProfile) => {
    return togglableProfile.val
  });

  return <><h1 className='text-center mono mb-0 text-2xl font-bold' > {resume.name}</h1 >
    <div className='w-full flex justify-between text-xs pb-2'>
      {resume.phone.isOn && <span>
        {resume.phone.val}
      </span>}
      {resume.email.isOn && <span>
        {resume.email.val}
      </span>}
      {profiles.map((profile, idx) => {
        return <span key={`profile-${idx}`}><a className='underline' href={profile.url}>{profile.network}</a></span>
      })}
    </div>
  </>

}
