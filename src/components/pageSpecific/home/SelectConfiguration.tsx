import type { Configuration } from '@/lib/types/configuration';
import { useContext, useEffect, useState } from 'react';
import ResumeContext from './ResumeContext';
import type { User } from '@supabase/supabase-js';
import { getSavedConfigurationsForUser } from '@/lib/configurations';

export default function SelectConfiguration({ user }: { user: User | null }) {
    const [configurations, setConfigurations] = useState<Configuration[]>([]);
    const { setResume } = useContext(ResumeContext);

    useEffect(() => {
        getSavedConfigurationsForUser(user).then((configurations) => {
            setConfigurations(configurations);
        });
    }, [user]);

    getSavedConfigurationsForUser(user).then((configurations) => {
        console.log(configurations);
    });

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
