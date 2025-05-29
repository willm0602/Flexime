import getUser from "@/lib/auth/getUser";
import UserConfigurations from '@/components/pageSpecific/configurations/UserConfigurations';


export default async function UserConfigurationsPage(){
    const user = await getUser();
    return <UserConfigurations
        user={user}
    />
}