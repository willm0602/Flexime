import ConfigureProfile from "@/components/pageSpecific/profile/ConfigureProfile";
import getResume from "@/lib/auth/getResume";

export default async function ConfigureProfilePage(){
    const resume = await getResume();
    return <ConfigureProfile
        resume={resume}
    />
}