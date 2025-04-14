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
        <>
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
                    <label className='ml-2 mt-2 text-up capitalize' htmlFor={key}>{field}</label>
                </li>
            })}</ul>
        </>
    );
}

function ConfigureSkills(){
    return <>   </>
}



type ListField = 'profiles' | 'education' | 'workExperience' | 'personalProjects';

interface ToggleChildProps {
    togglable: Togglable<unknown, unknown>;
    idx: number;
    setChild: CallableFunction;
    indent: number;
    lastID?: string
}

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


    function ToggleChild({togglable, idx, indent, setChild, lastID}: ToggleChildProps){
        const id = `${lastID}-${idx}` || `edit-resume-${field}-${idx}`;
        return <li className={`pl-${2*indent}`}>
            <span className="flex">
                <input type='checkbox'
                    className='toggle toggle-primary'
                    id={id}
                    checked={togglable.isOn}
                    onChange={() => {
                        togglable.isOn = !togglable.isOn;
                        setChild({
                            ...togglable,
                        })
                    }}
                />
                <label className='ml-2 mb-2 text-up capitalize cursor-pointer' htmlFor={id}>{togglable.title}</label>
            </span>

                {togglable.isOn && <ul className='mb-2'>
                    {(togglable.children || []).map((child, subidx) => {
                        return <ToggleChild 
                            togglable={child}
                            idx={subidx}
                            setChild={(newChild: Togglable<unknown, unknown>) => {
                                setChild({
                                    ...togglable,
                                    children: {
                                        [subidx]: newChild
                                    }
                                })
                            }}
                            indent={indent+1}
                            key={`${id} | ${child.title}`}
                            lastID={id}
                        />
                    })}
                </ul>}
        </li>
    }

    return (
        <>
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
                <label className='ml-2 mb-2 text-up capitalize' htmlFor={`edit-${field}-toggle`}>All {fieldNames[field]}</label>
            </span>
            {togglable.isOn && <ul className='ml-0 pl-0 list-none not-prose mt-2'>
                {togglable.children?.map((child, index) => {
                    const key = `toggle-${field}-item-${index}`;
                    return (
                        <ToggleChild key={key}
                                     idx={index}
                                     togglable={child}
                                     indent={1}
                                     setChild={(newChild: typeof child) => {
                                        setResume({
                                            ...resume,
                                            [field]: {
                                                ...resume[field],
                                                [index]: newChild
                                            }
                                        })
                                     }}
                        />
                    );
                })}
            </ul>}
        </>
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
