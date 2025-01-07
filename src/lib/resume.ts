/**
 * Resume format to follow JSON Resume format
 * https://jsonresume.org/schema
 */

export interface Location {
    address: string,
    postalCode: string,
    city: string,
    countryCode: string,
    region: string       
}

export interface Profile {
    network: string,
    username?: string,
    url: string
}

interface Experience {
    position: string,
    url?: string,
    startDate: string, // ISO 8601 format
    endDate?: string, // ISO 8601 format
    summary?: string,
    highlights: string[]
}

export interface Work extends Experience{
    name: string
}

export interface Volunteer extends Experience{
    organization: string
}

export interface Education {
    institution: string,
    url?: string,
    area: string,
    studyType: string,
    startDate: string, // ISO 8601 Format
    endDate?: string, // ISO 8601 Format
    score?: string,
    courses?: string[]
}

export interface Award {
    title: string,
    date: string, // ISO 8601 Format
    issuer?: string,
    url?: string
}

export interface Publication {
    name: string,
    publisher?: string,
    releaseDate: string, // ISO-8601 Format
    url: string,
    summary: string
}

export interface Skill {
    name: string,
    level: string,
    keywords: string[]
}

export interface Project {
    name: string,
    startDate?: string // ISO-8601 Format
    endDate?: string // ISO-8601 Format
    description: string,
    highlights: string[],
    url: string[]
}

export interface ResumeBasics {
    name: string,
    label?: string,
    image?: string,
    email: string,
    phone: string,
    url?: string,
    summary?: string,
    location?: Location,
    profiles: Profile[],
}

export interface Resume {
    basics: ResumeBasics,
    work: Work[],
    volunteer: Volunteer[],
    education: Education[],
    awards: Award[],
    publications: Publication[],
    skills: Skill[],
    projects: Project[]
}

export default Resume;