'use client';

import LoadingSpinner from '@/components/LoadingSpinner';
import useProfile from '@/lib/auth/getProfile';
import { overwriteConfig } from '@/lib/configurations';
import useResume from '@/lib/hooks/useResume';
import Resume from '@/lib/jsonResume';
import { resyncFromJSONResume } from '@/lib/resume';
import { DEFAULT_RESUME } from '@/lib/resumeUtils';
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
    const [resume] = useResume();

    const resyncConfig = async () => {
        const resyncedResume = resyncFromJSONResume(
            config.resume,
            resume || DEFAULT_RESUME,
        );
        await overwriteConfig(resyncedResume, idx, config.id, configurations);
    };

    const ResyncButton = (
        <button
            type='button'
            className='btn btn-square'
            onClick={() => {
                setIsResyncing(true);
                resyncConfig()
                    .catch(console.error)
                    .finally(() => {
                        setIsResyncing(false);
                    });
            }}
        >
            {isResyncing ? (
                <LoadingSpinner className='w-24 h-24' />
            ) : (
                <ArrowPathIcon width={24} height={24} />
            )}
        </button>
    );
    return (
        <tr>
            <td className='w-24'>{ResyncButton}</td>
            <td />
            <td>{config.name}</td>
        </tr>
    );
}
