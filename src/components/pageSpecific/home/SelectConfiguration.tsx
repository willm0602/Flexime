import type { Configuration } from "@/lib/types/configuration";
import { useContext, useEffect, useState } from "react";
import ResumeContext from "./ResumeContext";

export default function SelectConfiguration(){
    
    const [configurations, setConfigurations] = useState<Configuration[]>([]);
    const {setResume} = useContext(ResumeContext);
    
    useEffect(() => {
        const storedConfigurations = window.localStorage.getItem('resume-configurations');
        if (storedConfigurations) {
            setConfigurations(JSON.parse(storedConfigurations));
        }
    }, []);

    if((configurations?.length || 0) === 0)
        return null;

    return <select id="load-resume-config" onChange={(e) => setResume(configurations[+e.target.value].resume)} className="select select-bordered w-full max-w-xs my-4">
        {configurations.map((configuration, idx) => {
            return <option key={configuration.id} value={idx}>{configuration.name}</option>
        })}
    </select>
}