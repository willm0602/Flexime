/**
 * Custom format for resumes to be more compact and easier to edit
*/

import JSONResume, { Education, Profile, Skill, Project, Work, Location } from './jsonResume';
import Togglable from '@/lib/togglable';
import type { TogglableList } from '@/lib/togglable';
import { togglable } from './togglable';
import CompanyExperience from './companyExperience';
import getCompaniesFromWork from './getCompaniesFromWork';
import { DEFAULT_RESUME } from './resumeUtils';

export type TogglableRole = Togglable<Work, string>
export type TogglableCompany = Togglable<CompanyExperience, TogglableRole>
export type TogglableWork = Togglable<undefined, TogglableCompany>

type TogglableProject = Togglable<Project, string>;

function truncate(text: string, maxLen: number): string {
    if (text.length < maxLen)
        return text
    return text.substring(0, maxLen) + '...'
}

export default interface Resume {
    name: string,
    profiles: TogglableList<Profile>,
    title: Togglable<string | undefined>,
    email: Togglable<string | undefined>,
    phone: Togglable<string | undefined>,
    location: Togglable<Location | undefined>,
    education: TogglableList<Education>,
    skills: TogglableList<Skill>,
    workExperience: TogglableWork,
    personalProjects: TogglableList<TogglableProject>
}

export function resumeFromJSONResume(jsonResume: JSONResume | undefined): Resume {
    jsonResume = jsonResume || DEFAULT_RESUME;
    const name: string = jsonResume.basics?.name || 'Name';
    const profiles: TogglableList<Profile> = togglable(undefined, 'Profiles', (jsonResume.basics?.profiles || []).map((profile) => {
        return togglable(profile, profile.network);
    }))
    if (jsonResume.basics?.url) {
        if (!profiles.children) {
            profiles.children = [];
        }
        profiles.children.push({
            val: {
                network: 'Personal Site',
                url: jsonResume.basics.url
            },
            isOn: true,
            title: 'Personal Site'
        })
    }
    const title = togglable(jsonResume.basics?.label, 'Title');
    const location = togglable(jsonResume.basics?.location, 'Location');
    const email = togglable(jsonResume.basics?.email, 'Email');
    const phone = togglable(jsonResume.basics?.phone, 'Phone');
    const education = togglable(undefined, 'Education', (jsonResume.education || []).map((education: Education) => {
        return togglable(education, education.institution);
    }));
    const skills = togglable(undefined, 'Skills', (jsonResume.skills || []).map((skill) => {
        return togglable(skill, skill.name);
    }));
    const companyExperience = getCompaniesFromWork(jsonResume.work);
    const workExperience: TogglableWork = togglable(undefined, 'Work Experience', (companyExperience).map((company) => {
        return togglable(company, company.companyName, company.positions.map((work) => {
            return togglable(work, work.position, work.highlights.map((highlight) => {
                return togglable(highlight, truncate(highlight, 20))
            }))
        }))
    }));
    const personalProjects = togglable(undefined, 'Personal Projects', (jsonResume.projects || []).map((project) => {
        return togglable(project.highlights, project.name, project.highlights.map((highlight) => {
            return togglable(highlight, truncate(highlight, 25))
        }))
    }));

    return {
        name,
        profiles,
        title,
        location,
        email,
        phone,
        education,
        skills,
        workExperience,
        personalProjects
    }
}
