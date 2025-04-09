import { PencilSquareIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function EditResumeLink() {
    return (
        <Link
            className='btn btn-secondary text-black no-underline'
            href='/profile'
        >
            <PencilSquareIcon width={24} height={24} title='Edit Resume' />
        </Link>
    );
}
