import { useContext, useEffect, useState } from 'react';
import ResumeConfigureSection from './ResumeConfigureSection';
import ResumeContext from './ResumeContext';
import type Resume from '@/lib/resume';
import type Togglable from '@/lib/togglable';
import { updateSession } from '@/lib/supabase/middleware';

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
    const {resume, setResume} = useContext(ResumeContext);
    const [skills, setSkills] = useState(resume.skills.children || []);

    return <>
        <h1>Configure Skills</h1>
        <div className="join mb-4">
            <label className="join-item font-bold mr-4" htmlFor='toggle-all-skills' >All Skills</label>
            <input type="checkbox" id="toggle-all-skills" defaultChecked={resume.skills.isOn} className="toggle toggle-xl"
                onChange={() => {
                    setResume({
                        ...resume,
                        skills: {
                            ...resume.skills,
                            isOn: !resume.skills.isOn
                        }
                    })
                }}
            />
        </div>
        <div className='flex max-w-full flex-wrap gap-y-2 gap-x-2'>
            {resume.skills.children?.map((togglableSkill, idx) => {
                const toggleSkill = () => {
                    const updatedSkills = [
                        ...skills,
                    ];
                    updatedSkills[idx] = {
                        ...togglableSkill,
                        isOn: !togglableSkill.isOn
                    };
                    setSkills(updatedSkills);
                    setResume({
                        ...resume,
                        skills: {
                            ...resume.skills,
                            children: updatedSkills
                        }
                    })
                }
                return <button key={togglableSkill.val.name}
                               type='button'
                               onClick={toggleSkill}
                               className={`badge badge-accent rounded-3xl ${!togglableSkill.isOn ? 'badge-outline' : ''}`}
                >{togglableSkill.val.name}</button>
            })}
        </div>
    </>
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

                {togglable.isOn && <ul className={togglable.children ? 'mb-2' : ''}>
                    {(togglable.children || []).map((child, subidx) => {
                        return <ToggleChild 
                            togglable={child}
                            idx={subidx}
                            setChild={(newChild: Togglable<unknown, unknown>) => {
                                setChild({
                                    ...togglable,
                                    children: {
                                        ...togglable.children,
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
}: {
    activeSection: ResumeConfigureSection;
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
        <dialog id='resume-configure-modal' className='modal'>
            <div className='modal-box relative'>
                <form method='dialog'>
                    <button
                        className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
                        type='submit'
                    >
                        ✕
                    </button>
                </form>
                {components[activeSection]}
            </div>
        </dialog>
    );
}
