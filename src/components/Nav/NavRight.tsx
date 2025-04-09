'use server';

import getUser from '@/lib/auth/getUser';
import SignInSignOut from '../SignInSignOut';

export default async function NavRight() {
    const user = await getUser();
    return <SignInSignOut user={user} />;
}
