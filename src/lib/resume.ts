/**
 * Custom format for resumes to be more compact and easier to edit
*/

import JSONResume, { Education, Profile, Work, Skill, Project } from './jsonResume';
import Togglable, { togglableList } from '@/lib/togglable';
import type { TogglableList } from '@/lib/togglable';
import { togglable } from './togglable';
import CompanyExperience from './companyExperience';
import getCompaniesFromWork from './getCompaniesFromWork';

export default interface Resume {
    name: string,
    profiles: TogglableList<Profile>,
    title: Togglable<string | undefined>,
    email: Togglable<string | undefined>,
    phone: Togglable<string | undefined>,
    education: TogglableList<Education>,
    skills: TogglableList<Skill>,
    workExperience: TogglableList<CompanyExperience>,
    personalProjects: TogglableList<Project>
}

export function resumeFromJSONResume(jsonResume: JSONResume): Resume {
    const name: string = jsonResume.basics.name;
    const profiles: TogglableList<Profile> = togglableList(jsonResume.basics.profiles)
    if (jsonResume.basics.url) {
        profiles.val.push({
            val: {
                network: 'Personal Site',
                url: jsonResume.basics.url
            },
            isOn: true
        })
    }
    const title = togglable(jsonResume.basics.name);
    const email = togglable(jsonResume.basics.email);
    const phone = togglable(jsonResume.basics.phone);
    const education = togglableList(jsonResume.education);
    const skills = togglableList(jsonResume.skills);
    const workExperience = togglableList(getCompaniesFromWork(jsonResume.work));
    const personalProjects = togglableList(jsonResume.projects);

    return {
        name,
        profiles,
        title,
        email,
        phone,
        education,
        skills,
        workExperience,
        personalProjects
    }
}
