import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import type { UserProfile } from "../types";
import toast from "react-hot-toast";

export default function useProfile(){
    const auth = useAuth();

    const [profile, setProfile] = useState<UserProfile | undefined>();

    useEffect(() => {
        if(!auth){
            setProfile(undefined);
            return;
        }

        fetch('/api/profile/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (resp) => {
            const {prof} = await resp.json();
            setProfile(prof);
        }).catch((err) => {
            toast(err);
        })

    }, [auth]);
    return profile;
}