import type { Configuration } from "@/lib/types/configuration";
import { EyeIcon, WrenchIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import ConfigurationsModalsContext from "./ConfigurationsModalsContext";

interface ConfigurationRowProps {
    configuration: Configuration,
    configurations: Configuration[],
    setConfigurations: (configurations: Configuration[]) => void

}

export default function ConfigurationRow({configuration, configurations, setConfigurations}: ConfigurationRowProps){
    
    const modalContext = useContext(ConfigurationsModalsContext);
    
    const setConfiguration = (configuration: Configuration) => {
        setConfigurations(configurations.map((c) => {
            if(c.id === configuration.id)
                return configuration;
            return c;
        }))
    };

    const previewResume = () => {
        modalContext.setConfiguration(configuration);
        const previewModal = modalContext.previewModal?.current;
        console.log(previewModal);
        if(!previewModal)
            return;
        previewModal.showModal();
    }

    const configureResume = () => {
        modalContext.setConfiguration(configuration);
        const configureModal = modalContext.configureModal?.current;
        if(!configureModal)
            return;
        configureModal.showModal();
    }

    return <li className="list-row bg-base-200 p-4 border-base-300 border-2">
        <h3 className="mt-0 mb-0 list-col-grow">{configuration.name}</h3>
        <button type='button' className="btn btn-ghost btn-xs" onClick={previewResume}>
            <EyeIcon
                width={24}
                height={24}
                title='Preview Resume'
            />
        </button>
        <button type='button' className="btn btn-ghost btn-xs" onClick={configureResume}>
            <WrenchIcon
                width={24}
                height={24}
                title='Configure Resume'
            />
        </button>
    </li>

}