import { PencilSquareIcon } from '@heroicons/react/24/solid';

export default function EditResumeLink() {
    return (
        <a
            className='btn btn-secondary text-black no-underline'
            href='/profile'
        >
            <PencilSquareIcon width={24} height={24} title='Edit Resume' />
        </a>
    );
}
