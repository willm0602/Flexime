'use client';

import LoadingSpinner from "@/components/LoadingSpinner";
import type { Configuration } from "@/lib/types/configuration";
import type { User } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";
import NewConfigurationModal from "./NewConfigurationModal";
import type Resume from "@/lib/resume";
import ConfigurationRow from "./ConfigurationRow";
import ConfigrationModalsContext from "./ConfigurationsModalsContext";
import PreviewConfigurationModal from "./PreviewConfigurationModal";
import ModifyConfigurationResume from "./ModifyConfigurationResume";

interface UserConfigurationsProps {
    user: User | null,
    resume: Resume
}

export default function UserConfigurations({user, resume}: UserConfigurationsProps){
    const [configurations, setConfigurations] = useState<Configuration[] | undefined>(undefined);
    const [configuration, setConfiguration] = useState<Configuration | undefined>();

    const previewModal = useRef<HTMLDialogElement | null>(null);
    const configureModal = useRef<HTMLDialogElement | null>(null);

    const addConfiguration = (name: string) => {
        const id = configurations ? configurations[configurations.length-1].id + 1 : 1;
        const configuration: Configuration = {
            id,
            user_id: user?.id || '',
            name,
            resume
        };
        setConfigurations([...configurations || [], configuration]);
        window.localStorage.setItem('resume-configurations', JSON.stringify([...configurations || [], configuration]));
    }

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        // TODO: add supabase call if the user is logged in
        
        const configurationsUnparsed = window.localStorage.getItem('resume-configurations') || '[]';
        const configurations: Configuration[] = JSON.parse(configurationsUnparsed);
        setConfigurations(configurations);
        if(configurations.length === 0){
            addConfiguration('Default');
        }
    }, [])

    if(configurations === undefined)
        return <LoadingSpinner/>
    
    return <ConfigrationModalsContext.Provider value={{configuration, setConfiguration, previewModal, configureModal}}>
        <div className="p-12 w-1/2">
        <h1 className="mb-0">Configurations</h1>
        <ul className="list bg-base-100 pl-0">
            {configurations.map((config) => {
                const key = `config-${config.id}`;
                return <ConfigurationRow key={key}
                                        configuration={config}
                                        configurations={configurations}
                                        setConfigurations={setConfigurations}
                                        />
                                    })}
        </ul>
        <NewConfigurationModal
            configurations={configurations}
            addConfiguration={addConfiguration}
        />
        <PreviewConfigurationModal/>
        <ModifyConfigurationResume/>
    </div>
    </ConfigrationModalsContext.Provider>
}