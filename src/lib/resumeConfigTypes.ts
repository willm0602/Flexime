import Togglable from './togglable'
import type { Education } from '@/lib/jsonResume'
import type { Skill } from '@/lib/jsonResume'
import type { Profile } from '@/lib/jsonResume'
import type { Work } from '@/lib/jsonResume'
import type { Project } from '@/lib/jsonResume'

type TogglableSection<C> = Togglable<undefined, C>

type TogglableProfilesSection = TogglableSection<Profile>
type TogglableEducationSection = TogglableSection<Education>
type TogglableSkillsSection = TogglableSection<Skill>

type CompanyData = {
    skills: Skill[]
}

type TogglableWork = Togglable<Work, string>
type TogglableCompany = Togglable<CompanyData, TogglableWork>
type TogglableExperienceSection = TogglableSection<TogglableCompany>

type TogglableProject = Togglable<Project, string>
type TogglableProjectsSection = TogglableSection<TogglableProject>

export type {
    TogglableProfilesSection,
    TogglableEducationSection,
    TogglableSkillsSection,
    TogglableExperienceSection,
    CompanyData,
    TogglableWork,
    TogglableCompany,
    TogglableProject,
    TogglableProjectsSection,
}
