'use client';

import AsyncButton from '@/components/AsyncButton';
import EditableText from '@/components/EditableText';
import LoadingSpinner from '@/components/LoadingSpinner';
import {
    copyConfig,
    overwriteConfig,
    removeConfig,
} from '@/lib/configurations';
import useResume from '@/lib/hooks/useResume';
import { resyncFromJSONResume } from '@/lib/resume';
import { DEFAULT_RESUME } from '@/lib/resumeUtils';
import type { Configuration } from '@/lib/types/configuration';
import {
    ArrowDownTrayIcon,
    ArrowPathIcon,
    BookmarkSquareIcon,
    TrashIcon,
} from '@heroicons/react/24/solid';
import { useRef, useState } from 'react';

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
    const TitleInputElem = useRef<HTMLInputElement | null>(null);

    const resyncConfig = async () => {
        const resyncedResume = resyncFromJSONResume(
            config.resume,
            resume || DEFAULT_RESUME,
        );
        await overwriteConfig(
            { ...config, resume: resyncedResume },
            idx,
            config.id,
            configurations,
        );
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

    const CopyButton = (
        <AsyncButton
            type='button'
            className='btn btn-accent btn-sm btn-square'
            promise={async () => {
                await copyConfig(config);
                window.location.reload();
            }}
        >
            <BookmarkSquareIcon width={24} height={24} />
        </AsyncButton>
    );

    return (
        <tr>
            <td>{ResyncButton}</td>
            <td>{RemoveButton}</td>
            <td>{CopyButton}</td>
            <td>
                <div className='flex items-center join'>
                    <input
                        id={`edit-configuration-${config.name}`}
                        defaultValue={config.name}
                        className='input input-sm w-96 join-item'
                        aria-label={`Edit title of configuration ${config.name}`}
                        ref={TitleInputElem}
                    />
                    <AsyncButton
                        className='btn btn-sm btn-secondary join-item'
                        promise={async () => {
                            const elem = TitleInputElem?.current;
                            if (!elem) {
                                return;
                            }
                            const newTitle = elem.value;
                            const updatedConfig: Configuration = {
                                ...config,
                                name: newTitle,
                            };
                            await overwriteConfig(
                                updatedConfig,
                                idx,
                                config.id,
                                configurations,
                            );
                        }}
                    >
                        Save Title
                    </AsyncButton>
                </div>
            </td>
        </tr>
    );
}
