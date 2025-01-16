/**
 * Custom format for resumes to be more compact and easier to edit
*/

import JSONResume, { Education, Profile, Work, Skill } from './jsonResume';
import Togglable from '@/lib/togglable';
import { TogglableList } from '@/lib/togglable';

interface CompanyExperience {
    companyName: string,
    positions: TogglableList<Work>
    skills: Skill[]
}

export default interface Resume {
    name: string,
    profiles: TogglableList<Profile>,
    title: Togglable<string | undefined>,
    email: Togglable<string | undefined>,
    phone: Togglable<string>,
    education: TogglableList<Education>
    skills: TogglableList<Skill>
    workExperience: TogglableList<CompanyExperience>
}

export function resumeFromJSONResume(jsonResume: JSONResume): Resume {
    const name: string = jsonResume.basics.name;
    const profiles = new TogglableList(jsonResume.basics.profiles);
    const title = new Togglable(jsonResume.basics.label);
    const email = new Togglable(jsonResume.basics.email);
    const phone = new Togglable(jsonResume.basics.phone);
    const education = new TogglableList(jsonResume.education);
    const skills = new TogglableList(jsonResume.skills);


    return {
        name,
        profiles,
        title,
        email,
        phone,
    }
}
