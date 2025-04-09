import ConfigureProfile from "@/components/pageSpecific/profile/ConfigureProfile";
import getResume from "@/lib/auth/getResume";
import getUser from "@/lib/auth/getUser";

export default async function ConfigureProfilePage(){
    const resume = await getResume();
    const user = await getUser();
    return <ConfigureProfile
        resume={resume}
        user={user}
    />
}