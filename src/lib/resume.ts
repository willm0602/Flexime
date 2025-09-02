/**
 * Custom format for resumes to be more compact and easier to edit
 */

import type JSONResume from './jsonResume';
import type {
    Education,
    Profile,
    Skill,
    Project,
    Work,
    Location,
} from './jsonResume';
import type Togglable from '@/lib/togglable';
import { getUsedVal } from '@/lib/togglable';
import type { TogglableList } from '@/lib/togglable';
import { togglable } from './togglable';
import { DEFAULT_RESUME } from './resumeUtils';

export type TogglableRole = Togglable<Work, string>;
export type TogglableWork = TogglableList<Work>;
type TogglableProject = TogglableList<Project>;

function truncate(text: string, maxLen: number): string {
    if (text.length < maxLen) return text;
    return `${text.substring(0, maxLen)}...`;
}

export default interface Resume {
    name: string;
    profiles: TogglableList<Profile>;
    title: Togglable<string | undefined>;
    summary: Togglable<string | undefined>;
    email: Togglable<string | undefined>;
    phone: Togglable<string | undefined>;
    location: Togglable<Location | undefined>;
    education: TogglableList<Education>;
    skills: TogglableList<Skill>;
    workExperience: TogglableWork;
    personalProjects: TogglableProject;
}

export function resumeFromJSONResume(
    jsonResume: JSONResume | undefined = DEFAULT_RESUME,
): Resume {
    const name: string = jsonResume.basics?.name || 'Name';
    const profiles: TogglableList<Profile> = togglable(
        undefined,
        'Profiles',
        (jsonResume.basics?.profiles || []).map((profile) => {
            return togglable(profile, profile.network);
        }),
    );
    if (jsonResume.basics?.url) {
        if (!profiles.children) {
            profiles.children = [];
        }
        profiles.children.push({
            val: {
                network: 'Personal Site',
                url: jsonResume.basics.url,
            },
            isOn: true,
            title: 'Personal Site',
            id: 'Personal Site',
        });
    }
    const title = togglable(jsonResume.basics?.label, 'Title');
    const summary = togglable(jsonResume.basics.summary, 'Summary');
    const location = togglable(jsonResume.basics?.location, 'Location');
    const email = togglable(jsonResume.basics?.email, 'Email');
    const phone = togglable(jsonResume.basics?.phone, 'Phone');

    const education = togglable(
        undefined,
        'Education',
        (jsonResume.education || []).map((education: Education) => {
            return togglable(education, education.institution);
        }),
    );
    const skills = togglable(
        undefined,
        'Skills',
        (jsonResume.skills || []).map((skill) => {
            return togglable(skill, skill.name);
        }),
    );
    const workExperience: TogglableWork = togglable(
        undefined,
        'Work Experience',
        (jsonResume.work || []).map((position) => {
            return togglable(
                position,
                `${position.name} (${position.position})`,
                (position.highlights || []).map((highlight) => {
                    return togglable(highlight, truncate(highlight, 30));
                }),
            );
        }),
    );
    const personalProjects = togglable(
        undefined,
        'Personal Projects',
        (jsonResume.projects || []).map((project) => {
            return togglable(
                project,
                project.name,
                (project.highlights || []).map((highlight) => {
                    return togglable(highlight, truncate(highlight, 30));
                }),
            );
        }),
    );

    return {
        name,
        profiles,
        title,
        location,
        email,
        phone,
        summary,
        education,
        skills,
        workExperience,
        personalProjects,
    };
}

export function jsonResumeFromResume(resume: Resume): JSONResume {
    const usedProfiles: Profile[] = resume.profiles.isOn
        ? (resume.profiles.children || [])
              .filter((toggProf) => {
                  return toggProf.isOn;
              })
              .map((toggProf) => toggProf.val)
        : [];

    const usedEducation: Education[] = resume.education.isOn
        ? (resume.education.children || [])
              .filter((toggEd) => {
                  return toggEd.isOn;
              })
              .map((toggEd) => toggEd.val)
        : [];

    const usedWork: Work[] = resume.workExperience.isOn
        ? (resume.workExperience.children || [])
              .filter((toggWork) => {
                  return toggWork.isOn;
              })
              .map((toggWork) => {
                  const work: Work = toggWork.val;
                  const toggHL = (toggWork.children ||
                      []) as Togglable<string>[];
                  const highlights: string[] = (toggHL || [])
                      .filter((toggHL) => toggHL.isOn)
                      .map((toggHL) => toggHL.val);
                  return {
                      ...work,
                      highlights,
                  };
              })
        : [];

    const usedProjects: Project[] = resume.personalProjects.isOn
        ? (resume.personalProjects.children || [])
              .filter((toggProj) => {
                  return toggProj.isOn;
              })
              .map((toggProj) => {
                  const proj = toggProj.val;
                  const toggHL = (toggProj.children ||
                      []) as Togglable<string>[];
                  const highlights: string[] = (toggHL || [])
                      .filter((toggHL) => toggHL.isOn)
                      .map((toggHL) => toggHL.val);
                  return {
                      ...proj,
                      highlights,
                  };
              })
        : [];

    const usedSkills: Skill[] = resume.skills.isOn
        ? (resume.skills.children || [])
              .filter((skill) => skill.isOn)
              .map((toggSkill) => toggSkill.val)
        : [];

    const jsonResume: JSONResume = {
        basics: {
            name: resume.name,
            profiles: usedProfiles,
            label: getUsedVal(resume.title),
            location: getUsedVal(resume.location),
            email: getUsedVal(resume.email),
            phone: getUsedVal(resume.phone),
            summary: getUsedVal(resume.summary),
        },
        education: usedEducation,
        work: usedWork,
        projects: usedProjects,
        skills: usedSkills,
    };

    return jsonResume;
}

export function resyncFromJSONResume(
    togglableResume: Resume,
    jsonResume: JSONResume,
): Resume {
    function resyncList<T>(
        togglableList: TogglableList<T>,
        newItems: T[],
        getId: (item: T) => string,
        getChildren?: (item: T) => string[],
    ) {
        if (!togglableList.children) togglableList.children = [];

        // biome-ignore lint/complexity/noForEach: <explanation>
        newItems.forEach((item) => {
            const id = getId(item);
            const existing = togglableList.children?.find(
                (child) => child.id === id,
            );

            if (!existing) {
                // New item → add as togglable
                togglableList.children?.push(togglable(item, id));
            } else if (getChildren) {
                // Resync highlights or nested items
                if (!existing.children) existing.children = [];
                const highlights = getChildren(item);
                // biome-ignore lint/complexity/noForEach: <explanation>
                highlights.forEach((hl) => {
                    if (!existing?.children?.some((c) => c.val === hl)) {
                        existing?.children?.push(
                            togglable(hl, truncate(hl, 30)),
                        );
                    }
                });
            }
        });
    }

    // Resync profiles
    resyncList(
        togglableResume.profiles,
        jsonResume.basics?.profiles || [],
        (p) => p.network,
    );

    // Resync education
    resyncList(
        togglableResume.education,
        jsonResume.education || [],
        (e) => e.institution,
    );

    // Resync skills
    resyncList(togglableResume.skills, jsonResume.skills || [], (s) => s.name);

    // Resync work experience and highlights
    resyncList(
        togglableResume.workExperience,
        jsonResume.work || [],
        (w) => `${w.name} (${w.position})`,
        (w) => w.highlights || [],
    );

    // Resync projects and highlights
    resyncList(
        togglableResume.personalProjects,
        jsonResume.projects || [],
        (p) => p.name,
        (p) => p.highlights || [],
    );

    // Resync top-level fields (only if missing)
    if (!togglableResume.title.val && jsonResume.basics?.label) {
        togglableResume.title.val = jsonResume.basics.label;
    }
    if (!togglableResume.summary.val && jsonResume.basics?.summary) {
        togglableResume.summary.val = jsonResume.basics.summary;
    }
    if (!togglableResume.email.val && jsonResume.basics?.email) {
        togglableResume.email.val = jsonResume.basics.email;
    }
    if (!togglableResume.phone.val && jsonResume.basics?.phone) {
        togglableResume.phone.val = jsonResume.basics.phone;
    }
    if (!togglableResume.location.val && jsonResume.basics?.location) {
        togglableResume.location.val = jsonResume.basics.location;
    }

    return togglableResume;
}
