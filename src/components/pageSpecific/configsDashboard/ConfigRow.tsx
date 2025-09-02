'use client';

import useProfile from '@/lib/auth/getProfile';
import { overwriteConfig } from '@/lib/configurations';
import Resume from '@/lib/jsonResume';
import { resyncFromJSONResume } from '@/lib/resume';
import type { Configuration } from '@/lib/types/configuration';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

interface ConfigRowProps {
    config: Configuration;
    configurations: Configuration[];
    idx: number;
}
export default function ConfigRow({
    config,
    configurations,
    idx,
}: ConfigRowProps) {
    const [isResyncing, setIsResyncing] = useState(false);
    const ResyncButton = (
        <button
            type='button'
            className='btn btn-square'
            onClick={async () => {
                setIsResyncing(true);
                const profile = await useProfile();
                const profileResume = profile?.resume;
                if (!profileResume) {
                    setIsResyncing(false);
                    return;
                }
                config.resume = resyncFromJSONResume(
                    config.resume,
                    profileResume,
                );

                overwriteConfig(config.resume, idx, config.id, configurations);
            }}
        >
            <ArrowPathIcon width={24} height={24} />
        </button>
    );
    return (
        <tr>
            <td className='w-24'>{ResyncButton}</td>
            <td></td>
            <td>{config.name}</td>
        </tr>
    );
}
