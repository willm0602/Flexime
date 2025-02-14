import JSONResume from '@/lib/jsonResume'

const DEFAULT_RESUME: JSONResume = {
    basics: {
        name: '',
        label: '',
        email: '',
        phone: '',
        profiles: [],
    },
    work: [],
    volunteer: [],
    education: [],
    awards: [],
    publications: [],
    skills: [],
    projects: [],
}

export { DEFAULT_RESUME }
