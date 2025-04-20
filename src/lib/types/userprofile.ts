import type Resume from '@/lib/jsonResume';

export type UserProfile = {
    created_at: string;
    id: number;
    resume: Resume;
    settings: JSON;
    user_id: string;
};
