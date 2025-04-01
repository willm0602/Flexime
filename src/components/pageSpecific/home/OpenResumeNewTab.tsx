import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';

export default function OpenResumeNewTab() {
    const openInNewTab = () => {
        const form = document.getElementById(
            'resume-config-form',
        ) as HTMLFormElement;
        if (!form) return;
        form.setAttribute('target', '_blank');
        form.submit();
        form.setAttribute('target', 'resume-preview');
    };

    return (
        <button
            type='button'
            className='btn btn-accent no-underline mr-5'
            onClick={() => {
                openInNewTab();
            }}
        >
            <ArrowTopRightOnSquareIcon
                width={24}
                height={24}
                title='Open resume in new tab'
            />
        </button>
    );
}
