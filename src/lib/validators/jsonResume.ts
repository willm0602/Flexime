import { z } from 'zod';

const jsonResumeSchema = z.object({
    basics: z.object({
        name: z.string(),
        profiles: z.array(
            z.object({
                network: z.string(),
                url: z.string().url(),
            }),
        ),
        location: z.object({
            city: z.string(),
            countryCode: z.string(),
            region: z.string(),
            label: z.string().optional(),
        }),
        email: z.string().email(),
        phone: z.string(),
    }),
    education: z.array(
        z.object({
            institution: z.string(),
            area: z.string(),
            studyType: z.string(),
            startDate: z.string().optional(), // ISO date string
            endDate: z.string().optional(), // ISO date string
            score: z.string().optional(),
        }),
    ),
    work: z.array(
        z.object({
            name: z.string(),
            position: z.string(),
            startDate: z.string(), // ISO date string
            endDate: z.string(), // ISO date string
            highlights: z.array(z.string()),
        }),
    ),
    projects: z.array(
        z.object({
            name: z.string(),
            highlights: z.array(z.string()),
            url: z.string().optional(),
            description: z.string().optional(),
            repository: z.string().optional(),
            startDate: z.string().optional(), // ISO date string
            endDate: z.string().optional(), // ISO date string
        }),
    ),
    skills: z.array(
        z.object({
            name: z.string(),
        }),
    ),
});

export default jsonResumeSchema;
