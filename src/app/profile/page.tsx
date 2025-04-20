import ConfigureProfile from '@/components/pageSpecific/profile/ConfigureProfile';
import getProfile from '@/lib/auth/getProfile';
import getResume from '@/lib/auth/getResume';

export default async function ConfigureProfilePage() {
    const profile = await getProfile();
    const resume = await getResume(profile);
    return <ConfigureProfile resume={resume} profile={profile} />;
}
