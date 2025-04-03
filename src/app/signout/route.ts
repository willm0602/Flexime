import {signout} from '@/lib/auth/actions';
import { redirect } from 'next/navigation';

export async function GET(){
    signout();
    redirect('/');
}