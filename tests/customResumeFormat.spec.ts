// tests for the custom resume format to ensure that they work properly

import { test, expect } from '@playwright/test'
import JSONResume, { Project } from '@/lib/jsonResume'
import { resumeFromJSONResume } from '@/lib/resume'

test.describe('resumeFromJSONResume', () => {
    test('should correctly convert JSONResume to Resume with default values', () => {
        const jsonResume: JSONResume = {
            basics: {
                name: 'John Doe',
                profiles: [],
            },
            education: [],
            skills: [],
            work: [],
            projects: [],
        }

        const resume = resumeFromJSONResume(jsonResume)

        expect(resume.name).toBe('John Doe')
        expect(resume.profiles.children).toHaveLength(0)
        expect(resume.education.children).toHaveLength(0)
        expect(resume.skills.children).toHaveLength(0)
        expect(resume.workExperience.children).toHaveLength(0)
        expect(resume.personalProjects.children).toHaveLength(0)
    })

    test('should include personal site when url is present', () => {
        const jsonResume: JSONResume = {
            basics: {
                name: 'John Doe',
                url: 'https://johndoe.com',
                profiles: [],
            },
            education: [],
            skills: [],
            work: [],
            projects: [],
        }

        const resume = resumeFromJSONResume(jsonResume)
        const personalSite = resume.profiles.children?.find(
            (p) => p.title === 'Personal Site'
        )
        expect(personalSite).toBeDefined()
        expect(personalSite?.val.url).toBe('https://johndoe.com')
    })

    test('should properly convert work experience', () => {
        const jsonResume: JSONResume = {
            basics: { name: 'John Doe', profiles: [] },
            work: [
                {
                    name: 'Tech Corp',
                    position: 'Software Engineer',
                    startDate: '2020-01-01',
                    highlights: [
                        'Developed key features',
                        'Improved performance',
                    ],
                },
            ],
        }

        const resume = resumeFromJSONResume(jsonResume)
        expect(resume.workExperience.children).toHaveLength(1)
        expect(resume.workExperience.children?.[0].title).toBe(
            'Tech Corp (Software Engineer)'
        )
        expect(resume.workExperience.children?.[0].children).toHaveLength(2)
        expect(
            typeof resume.workExperience.children?.[0].children?.[0].val
        ).toBe('string')
    })
})
