import { useContext, useEffect, useRef } from "react";
import ConfigurationsModalsContext from "./ConfigurationsModalsContext";
import LoadingSpinner from "@/components/LoadingSpinner";

function ConfigurationPane(){
    const { configuration, setConfiguration } = useContext(ConfigurationsModalsContext);
    console.log(configuration);
    if(!configuration)
        return;
    return <>
        <h2 className="mt-0">{configuration.name}</h2>
        <div className="tabs tabs-box">
            <input type="radio" name="my_tabs_6" className="tab" aria-label="Tab 1" />
            <div className="tab-content bg-base-100 border-base-300 p-6">Tab content 1</div>

            <input type="radio" name="my_tabs_6" className="tab" aria-label="Tab 2" defaultChecked />
            <div className="tab-content bg-base-100 border-base-300 p-6">Tab content 2</div>

            <input type="radio" name="my_tabs_6" className="tab" aria-label="Tab 3" />
            <div className="tab-content bg-base-100 border-base-300 p-6">Tab content 3</div>
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
