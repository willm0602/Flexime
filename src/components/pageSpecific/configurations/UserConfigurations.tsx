'use client';

import LoadingSpinner from "@/components/LoadingSpinner";
import type { Configuration } from "@/lib/types/configuration";
import type { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

interface UserConfigurationsProps {
    user: User | null
}

export default function UserConfigurations({user}: UserConfigurationsProps){
    const [configurations, setConfigurations] = useState<Configuration[] | undefined>(undefined);

    useEffect(() => {
        // TODO: add supabase call
        setConfigurations([]);
    }, [])

    if(configurations === undefined)
        return <LoadingSpinner/>
    return <div className="p-12">
        <h1>Configurations</h1>
    </div>
}