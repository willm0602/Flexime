import type Resume from '@/lib/jsonResume'

export type Configuration = {
    id: number,
    user_id: string,
    resume: Resume,
    name: string
}