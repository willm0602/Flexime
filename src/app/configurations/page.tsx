import getUser from "@/lib/auth/getUser";
import UserConfigurations from '@/components/pageSpecific/configurations/UserConfigurations';
import getResume from "@/lib/auth/getResume";
import { DEFAULT_RESUME } from "@/lib/resumeUtils";
import { resumeFromJSONResume } from "@/lib/resume";

export default async function UserConfigurationsPage(){
    const user = await getUser();
    const resume = await getResume() || {...DEFAULT_RESUME};
    return <UserConfigurations
        user={user}
        resume={resumeFromJSONResume(resume)}
    />
}