import JSONResume, { Profile, ResumeBasics } from './jsonResume';
import Resume from "./resume";

function getUsedProfiles(resume: Resume): Profile[]{
    if(!resume.profiles.isOn)
        return [];
    const allProfiles = resume.profiles.children || [];
    return allProfiles.filter((togglableProfile) => {
        return togglableProfile.isOn
    }).map((togglableProfile) => {
        return togglableProfile.val
    });
}



/**
 * Function that takes in the configured resume and outputs a version with just the fields being
 * used.
 * @param resume 
 */
export default function getUsableResume(resume: Resume): JSONResume{
    const basics: ResumeBasics = {
        name: resume.name,
        profiles: getUsedProfiles(resume)
    };
    if(resume.email && resume.email.isOn){
        basics.email = resume.email.val;
    }
    if(resume.phone && resume.phone.isOn){
        basics.phone = resume.phone.val;
    }
    if(resume.location.isOn){
        basics.location = resume.location.val;
    }


}