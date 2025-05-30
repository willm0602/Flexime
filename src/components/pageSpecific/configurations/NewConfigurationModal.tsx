import type { Configuration } from "@/lib/types/configuration";
import { useRef, useState } from "react";

interface NewConfigurationModalProps {
    configurations: Configuration[]
    addConfiguration: (name: string) => void
}

const NewConfigurationForm = ({configurations, addConfiguration}: NewConfigurationModalProps) => {

    const [newConfigurationName, setNewConfigurationName] = useState('');
    return <form onSubmit={(e) => {
        e.preventDefault();
        if(configurations.find((c) => c.name === newConfigurationName))
            return alert('A configuration with that name already exists');
        addConfiguration(newConfigurationName);
        setNewConfigurationName('');
        const modal = document.getElementById('new-configuration-modal') as HTMLDialogElement | null;
        if(!modal)
            return;
        modal.close();
    }}>
        <h1 className="text-3xl">Create a new Configuration</h1>
        <label className="floating-label">
            <span>Configuration Name</span>
            <input type="text"
                   value={newConfigurationName}
                   placeholder="Untitled Configuration"
                   className="input input-md validator"
                   required 
                   minLength={3}
                   maxLength={30}
                   onChange={(e) => {
                        const newConfigurationName = e.target.value;
                        setNewConfigurationName(newConfigurationName);
                   }}   
            />
        </label>
        <button className="btn btn-soft btn-accent mt-5" type='submit'>
            Create Configuration
        </button>
    </form>
}

export default function NewConfigurationModal({configurations, addConfiguration}: NewConfigurationModalProps){

    const modal = useRef<HTMLDialogElement | null>(null);

    const showModal = () => {
        if(!modal.current)
            return;
        modal.current.showModal();
    }

    return <>
        <button className="btn btn-info" 
                onClick={showModal}
                type="button"
        >Add a new Configuration</button>
        <dialog id="new-configuration-modal" className="modal" ref={modal}>
            <div className="modal-box">
                <NewConfigurationForm
                    configurations={configurations}
                    addConfiguration={addConfiguration}
                />
            </div>
            <form method="dialog" className="modal-backdrop">
                <button type='submit'>close</button>
            </form>
        </dialog>
    </>
}