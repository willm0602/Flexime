import { useContext, useState } from 'react';
import ResumeConfigureSection from './ResumeConfigureSection';
import ResumeContext from './ResumeContext';
import type Resume from '@/lib/resume';
import Togglable from '@/lib/togglable';

function ConfigureBasics(props: {
    resume: Resume;
    setResume: (resume: Resume) => unknown;
}) {
    const { resume, setResume } = props;
    const basicsFields = [
        'title',
        'summary',
        'email',
        'phone',
        'location'
    ] as const;
    return (
        <div className='modal-box'>
            <h1>Edit Basics</h1>
            <ul className='ml-0 pl-0'>{basicsFields.map((field) => {
                const togglable = resume[field] as Togglable<unknown, unknown>;
                const key = `edit-basics-field-${field}`
                return <li className='list-none ' key={key}>
                    <input type='checkbox'
                            className='toggle toggle-primary'
                           id={key}
                           checked={togglable.isOn}
                           onChange={() => {
                                 togglable.isOn = !togglable.isOn;
                                 setResume({ ...resume, [field]: togglable });
                           }}
                    />
                    <label className='ml-2 text-up capitalize' htmlFor={key}>{field}</label>
                </li>
            })}</ul>
        </div>
    );
}

function ConfigureSkills(){
    return <>   </>
}

type ListField = 'profiles' | 'education' | 'workExperience' | 'personalProjects';
function ConfigureList(props: {field: ListField}) {
    const { field } = props;
    const {resume, setResume} = useContext(ResumeContext);
    const fieldNames: Record<ListField, string> = {
        profiles: 'Profiles',
        education: 'Education',
        workExperience: 'Work Experience',
        personalProjects: 'Personal Projects',
    }
    const togglable = resume[field];
    return (
        <div className='modal-box'>
            <h1>Edit {fieldNames[field]}</h1>
            <span className="flex">
                <input type='checkbox'
                       className='toggle toggle-primary'
                       id={`edit-${field}-toggle`}
                       checked={togglable.isOn}
                       onChange={() => {
                           togglable.isOn = !togglable.isOn;
                           setResume({ ...resume, [field]: togglable });
                       }}
                />
                <label className='ml-2 text-up capitalize' htmlFor={`edit-${field}-toggle`}>All {fieldNames[field]}</label>
            </span>
            <ul className='ml-0 pl-0'>
                {togglable.children?.map((child, index) => {
                    const key = `${field}-item-${index}`;
                    return (
                        <li className='list-none' key={key}>
                            <input type='checkbox'
                                   className='toggle toggle-primary'
                                   id={key}
                                   checked={child.isOn}
                                   onChange={() => {
                                        child.isOn = !child.isOn;
                                        setResume({ ...resume, [field]: togglable });
                                   }}
                            />
                            <label className='ml-2 text-up capitalize' htmlFor={key}>{child.title}</label>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default function ResumeConfigureModal({
    activeSection,
    isOpen,
    setIsOpen,
}: {
    activeSection: ResumeConfigureSection;
    isOpen: boolean;
    setIsOpen: (isNowOpen: boolean) => unknown;
}) {
    const { resume, setResume } = useContext(ResumeContext);

    const components: Record<ResumeConfigureSection, React.ReactNode> = {
        [ResumeConfigureSection.Basics]: (
            <ConfigureBasics resume={resume} setResume={setResume} />
        ),
        [ResumeConfigureSection.Education]: (
            <ConfigureList field='education' />
        ),
        [ResumeConfigureSection.Work]: (
            <ConfigureList field='workExperience' />
        ),
        [ResumeConfigureSection.Projects]: (
            <ConfigureList field='personalProjects' />
        ),
        [ResumeConfigureSection.Profiles]: (
            <ConfigureList field='personalProjects' />
        ),
        [ResumeConfigureSection.Skills]: (
            <ConfigureSkills />
        ),
    };

    return (
        <dialog id='resume-configure-modal' open={isOpen} className='modal'
                onClose={() => {setIsOpen(false)}}
        >
            <div className="modal-box">
                <form method='dialog'
                >
                    <button
                        className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
                        type='submit'
                    >
                        ✕
                    </button>
                    {components[activeSection]}
                </form>
            </div>
        </dialog>
    );
}
