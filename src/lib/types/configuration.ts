import type Resume from '@/lib/resume';

export type Configuration = {
    id: number;
    user_id: string;
    resume: Resume;
    name: string;
};
