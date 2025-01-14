/**
 * Custom format for resumes to be more compact and easier to edit
*/

import JSONResume, { Education, Profile, Work } from './jsonResume';

interface CompanyExperience {
    companyName: string,
    positions: Work[],
    skills: string[]
}

export default interface Resume {
    name: string,
    profiles: Profile[],
    title?: string,
    email?: string,
    phone?: string,
    education: Education[],
    skills: string[],
    workExperience: CompanyExperience[]
}

export function resumeFromJSONResume(jsonResume: JSONResume) {
    const name: string = jsonResume.basics.name;
    const profiles: Profile[] = jsonResume.basics.profiles;
    const title: string | undefined = jsonResume.basics.label;
    const email: string = jsonResume.basics.email;
    const phone: string

    return {
        name,
        profiles,
        title,
        email,
        phone,
    }
}
