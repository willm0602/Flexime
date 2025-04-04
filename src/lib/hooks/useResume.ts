import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import type Resume from "../resume";
import type { User } from "@supabase/supabase-js";
import useProfile from "./useProfile";

export default function useResume(){
    const profile = useProfile();
    const [resume, setResume] = useState<Resume | undefined>();

    useEffect(() => {
        if(profile?.resume){
            setResume(profile.resume);
            return;
        } 
    }, [profile])
}