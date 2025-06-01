import { BookmarkSquareIcon } from "@heroicons/react/24/solid";
import { useContext, useEffect, useRef, useState } from "react";
import ResumeContext from "./ResumeContext";
import type { Configuration } from "@/lib/types/configuration";
import type { User } from "@supabase/supabase-js";
import { addConfigurationToLS, addConfigurationToSupabase, getSavedConfigurationsForUser } from "@/lib/configurations";

export default function SaveConfig({user}: {user: User | null}) {
    const dialog = useRef<HTMLDialogElement | null>(null);
    const [configName, setConfigName] = useState<string>('');
    const resumeContext = useContext(ResumeContext);

    const [configurations, setConfigurations] = useState<Configuration[]>([]);
    const [configIDX, setConfigIDX] = useState<number>(0);

    useEffect(() => {
        getSavedConfigurationsForUser(user).then((configurations) => {
            setConfigurations(configurations);
        })
    }, [user]);

    const saveNewConfig = async () => {
        if (!configName) return;
        if(user){
            await addConfigurationToSupabase({
                user_id: user.id,
                resume: resumeContext.resume,
                name: configName,
                id: 0 // not used
            }).then((error) => {
                if(error){
                    console.error(error);
                }
                setConfigName('');
                dialog.current?.close();
            }).catch((error) => {
                console.error(error);
            });
        } else{
            addConfigurationToLS({
                user_id: '',
                resume: resumeContext.resume,
                name: configName,
                id: 0 // not used
            }).then(() => {
                setConfigName('');
                dialog.current?.close();
            }).catch((error) => {
                console.error(error);
            });
        }
    }

    const overwrite = () => {
        const newConfigurations = [...configurations];
        newConfigurations[configIDX].resume = resumeContext.resume;
        setConfigurations(newConfigurations);
        window.localStorage.setItem('resume-configurations', JSON.stringify(newConfigurations));
        dialog.current?.close();
        setConfigIDX(0);
    }


    return (
        <>
            <dialog ref={dialog} className="modal">
                <div className="modal-box">
                    {configurations.length > 0  ?
                        <>
                            <h3>Overwrite an existing configuration</h3>
                            <select className="select select-bordered w-full max-w-xs my-4" value={configIDX} onChange={(e) => setConfigIDX(Number.parseInt(e.target.value))}>    
                                {configurations.map((config, idx) => <option key={config.name} value={idx} className="min-h-4">{config.name}</option>)}
                            </select><br className="h-12"/>
                            <button type='button' className='btn btn-primary' onClick={() => overwrite()}>Save</button>
                            <hr className="mt-4 mb-4" />
                            <h3 className="font-bold text-lg mt-0">Or make a new configuration</h3>
                        </> : 
                        <h3 className="font-bold text-lg mt-0">Make a new configuration</h3>
                    }
                    <label className="floating-label">
                        <span>Configure Name</span>
                        <input type="text" className="input input-bordered my-8" value={configName} onChange={(e) => setConfigName(e.target.value)} />
                    </label>
                    <button type='button' className='btn btn-primary' onClick={() => saveNewConfig()}>Save</button>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button type="submit">close</button>
                </form>
            </dialog>
            <button type='button' className='btn btn-primary' onClick={() => dialog.current?.showModal()}>
                <BookmarkSquareIcon
                    width={24}
                    height={24}
                    title='Save Config'
                    />
            </button>
        </>
    );
}