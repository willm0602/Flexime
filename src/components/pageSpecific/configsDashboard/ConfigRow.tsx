'use client';

import AsyncButton from '@/components/AsyncButton';
import LoadingSpinner from '@/components/LoadingSpinner';
import { overwriteConfig, removeConfig } from '@/lib/configurations';
import useResume from '@/lib/hooks/useResume';
import { resyncFromJSONResume } from '@/lib/resume';
import { DEFAULT_RESUME } from '@/lib/resumeUtils';
import type { Configuration } from '@/lib/types/configuration';
import { ArrowPathIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

interface ConfigRowProps {
    config: Configuration;
    configurations: Configuration[];
    idx: number;
    setConfigurations: (configs: Configuration[]) => unknown;
}
export default function ConfigRow({
    config,
    configurations,
    idx,
    setConfigurations,
}: ConfigRowProps) {
    const [resume] = useResume();

    const resyncConfig = async () => {
        const resyncedResume = resyncFromJSONResume(
            config.resume,
            resume || DEFAULT_RESUME,
        );
        await overwriteConfig(resyncedResume, idx, config.id, configurations);
    };

    const removeThisConfig = async () => {
        const newConfigs = await removeConfig(config, configurations, idx);
        window.location.reload();
    };

    const ResyncButton = (
        <AsyncButton
            type='button'
            className='btn btn-square'
            promise={resyncConfig}
        >
            <ArrowPathIcon width={24} height={24} />
        </AsyncButton>
    );

    const RemoveButton = (
        <AsyncButton
            type='button'
            className='btn btn-error btn-sm'
            promise={removeThisConfig}
        >
            <TrashIcon width={24} height={24} />
        </AsyncButton>
    );

    return (
        <tr>
            <td className='w-20'>{ResyncButton}</td>
            <td className='w-20'>{RemoveButton}</td>
            <td>{config.name}</td>
        </tr>
    );
}
