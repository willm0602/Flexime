'use client';

import type { Configuration } from '@/lib/types/configuration';
import { useContext, useEffect, useState } from 'react';
import ResumeContext from './ResumeContext';
import type { User } from '@supabase/supabase-js';
import { getSavedConfigurationsForUser } from '@/lib/configurations';
import { DEFAULT_RESUME } from '@/lib/resumeUtils';
import { resumeFromJSONResume } from '@/lib/resume';
import getResume from '@/lib/auth/getResume';

export default function SelectConfiguration({ user }: { user: User | null }) {
    const [configurations, setConfigurations] = useState<Configuration[]>([]);
    const { setResume } = useContext(ResumeContext);

    useEffect(() => {
        if (!window) return;
        getSavedConfigurationsForUser(user).then(async (configurations) => {
            const resume = await getResume();
            const defaultConfig: Configuration = {
                id: 0,
                name: 'Everything',
                user_id: user?.id || '',
                resume: resumeFromJSONResume(resume || DEFAULT_RESUME),
            };
            setConfigurations([defaultConfig, ...configurations]);
        });
    }, [user, window]);

    if ((configurations?.length || 0) === 0) return null;

    return (
        <select
            id='load-resume-config'
            onChange={(e) => setResume(configurations[+e.target.value].resume)}
            className='select select-bordered w-full max-w-xs my-4'
            defaultValue={-1}
        >
            <option disabled value={-1}>
                Load Resume
            </option>
            {configurations.map((configuration, idx) => {
                return (
                    <option key={configuration.id} value={idx}>
                        {configuration.name}
                    </option>
                );
            })}
        </select>
    );
}
