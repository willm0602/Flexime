import { Fragment, useContext, useEffect, useRef } from "react";
import ConfigurationsModalsContext from "./ConfigurationsModalsContext";
import LoadingSpinner from "@/components/LoadingSpinner";

function ConfigurationPane(){
    const { configuration, setConfiguration } = useContext(ConfigurationsModalsContext);
    console.log(configuration);
    if(!configuration)
        return;

    type Tab = {
        name: string;
        content: React.ReactNode;
    }

    const tabs: Tab[] = [
        {
            name: 'Basics',
            content: <>
                <h2 className="mt-0">Edit Basics</h2>
            </>
        }
    ]
    return <>
        <h2 className="mt-0">{configuration.name}</h2>
        <div className="tabs tabs-box">
            {tabs.map(tab => {
                return <Fragment key={tab.name}>
                    <input type="radio" name="configure-resume-tabs" className="tab" aria-label={tab.name} defaultChecked/>
                    <div className="tab-content bg-base-100 border-base-300 p-6">{tab.content}</div>
                </Fragment>
            })}
        </div>
    </>
}

export default function ModifyConfigurationResume() {
    const { configureModal, configuration } = useContext(ConfigurationsModalsContext);

    return (
        <dialog className="modal" ref={configureModal}>
            <div className="modal-box">
                {configuration ? <ConfigurationPane/> : <LoadingSpinner/>}
            </div>
            <form method="dialog" className="modal-backdrop">
                <button type='submit'>close</button>
            </form>
        </dialog>
    );
}
