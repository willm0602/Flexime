import { useContext, useState } from 'react';
import ResumeConfigureSection from './ResumeConfigureSection';
import ResumeContext from './ResumeContext';
import type Resume from '@/lib/resume';
import type Togglable from '@/lib/togglable';
import { ReactSortable } from 'react-sortablejs';
import { replaceAtIndex } from '@/lib/utils'; // 👈 new helper import
import {
    ArrowDownCircleIcon,
    ArrowUpCircleIcon,
    ChevronDownIcon,
    ChevronUpIcon,
} from '@heroicons/react/24/solid';

function ConfigureBasics({
    resume,
    setResume,
}: {
    resume: Resume;
    setResume: (resume: Resume) => unknown;
}) {
    const basicsFields = [
        'title',
        'summary',
        'email',
        'phone',
        'location',
    ] as const;

    return (
        <>
            <h1>Edit Basics</h1>
            <ul className='ml-0 pl-0'>
                {basicsFields.map((field) => {
                    const togglable = resume[field] as Togglable<
                        unknown,
                        unknown
                    >;
                    const key = `edit-basics-field-${field}`;

                    return (
                        <li key={key} className='list-none'>
                            <input
                                type='checkbox'
                                className='toggle toggle-primary'
                                id={key}
                                checked={togglable.isOn}
                                onChange={() => {
                                    setResume({
                                        ...resume,
                                        [field]: {
                                            ...togglable,
                                            isOn: !togglable.isOn,
                                        },
                                    });
                                }}
                            />
                            <label
                                htmlFor={key}
                                className='ml-2 mt-2 text-up capitalize'
                            >
                                {field}
                            </label>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

function ConfigureSkills() {
    const { resume, setResume } = useContext(ResumeContext);
    const [skills, setSkills] = useState(resume.skills.children || []);

    return (
        <>
            <h1>Configure Skills</h1>
            <div className='join mb-4'>
                <label
                    className='join-item font-bold mr-4'
                    htmlFor='toggle-all-skills'
                >
                    All Skills
                </label>
                <input
                    type='checkbox'
                    id='toggle-all-skills'
                    defaultChecked={resume.skills.isOn}
                    className='toggle toggle-xl'
                    onChange={() => {
                        setResume({
                            ...resume,
                            skills: {
                                ...resume.skills,
                                isOn: !resume.skills.isOn,
                            },
                        });
                    }}
                />
            </div>
            <ReactSortable
                className='flex max-w-full flex-wrap gap-y-2 gap-x-2'
                list={skills}
                setList={(newList) => {
                    setSkills(newList);
                    setResume({
                        ...resume,
                        skills: {
                            ...resume.skills,
                            children: newList,
                        },
                    });
                }}
            >
                {skills.map((skill, idx) => {
                    const toggleSkill = () => {
                        const updatedSkills = replaceAtIndex(skills, idx, {
                            ...skill,
                            isOn: !skill.isOn,
                        });
                        setSkills(updatedSkills);
                        setResume({
                            ...resume,
                            skills: {
                                ...resume.skills,
                                children: updatedSkills,
                            },
                        });
                    };

                    return (
                        <button
                            key={skill.val.name}
                            type='button'
                            onClick={toggleSkill}
                            className={`badge badge-accent rounded-3xl ${!skill.isOn ? 'badge-outline' : ''}`}
                        >
                            {skill.val.name}
                        </button>
                    );
                })}
            </ReactSortable>
        </>
    );
}

type ListField =
    | 'profiles'
    | 'education'
    | 'workExperience'
    | 'personalProjects';

interface ToggleChildProps {
    child: Togglable<unknown, unknown>;
    idx: number;
    setChild: (child: Togglable<unknown, unknown>) => void;
    indent: number;
    lastID?: string;
}

function ToggleChild({
    child,
    idx,
    setChild,
    indent,
    lastID,
}: ToggleChildProps) {
    const id = `${lastID}-${idx}` || `edit-resume-${idx}`;
    const subchildren = child.children || [];
    const { val } = child;
    const isString = typeof val === 'string';
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className={`pl-${2 * indent}`}>
            <span className='flex'>
                <input
                    type='checkbox'
                    className='toggle toggle-primary'
                    id={id}
                    checked={child.isOn}
                    onChange={() => {
                        setChild({
                            ...child,
                            isOn: !child.isOn,
                        });
                    }}
                />
                <label
                    className='ml-2 mb-2 text-up capitalize cursor-pointer'
                    htmlFor={id}
                    title={isString ? val : undefined}
                >
                    {child.title}
                </label>
                {subchildren.length > 0 && (
                    <button
                        onClick={() => {
                            setIsCollapsed(!isCollapsed);
                        }}
                        type='button'
                        className='btn btn-xs'
                    >
                        {isCollapsed ? (
                            <ChevronUpIcon width={24} />
                        ) : (
                            <ChevronDownIcon height={24} />
                        )}
                    </button>
                )}
            </span>

            {child.isOn && !isCollapsed && subchildren.length > 0 && (
                <ReactSortable<Togglable<unknown, unknown>>
                    className='mb-2'
                    list={child.children}
                    setList={(newList) => {
                        setChild({
                            ...child,
                            children: newList,
                        });
                    }}
                >
                    {(child.children || []).map((subchild, subidx) => (
                        <ToggleChild
                            key={subchild.id}
                            child={subchild}
                            idx={subidx}
                            indent={indent + 1}
                            lastID={id}
                            setChild={(newChild) => {
                                setChild({
                                    ...child,
                                    children: replaceAtIndex(
                                        child.children || [],
                                        subidx,
                                        newChild,
                                    ),
                                });
                            }}
                        />
                    ))}
                </ReactSortable>
            )}
        </div>
    );
}

function ConfigureList({ field }: { field: ListField }) {
    const { resume, setResume } = useContext(ResumeContext);
    const togglable = resume[field];
    const fieldNames: Record<ListField, string> = {
        profiles: 'Profiles',
        education: 'Education',
        workExperience: 'Work Experience',
        personalProjects: 'Personal Projects',
    };

    return (
        <>
            <h1>Edit {fieldNames[field]}</h1>
            <span className='flex'>
                <input
                    type='checkbox'
                    className='toggle toggle-primary'
                    id={`edit-${field}-toggle`}
                    checked={togglable.isOn}
                    onChange={() => {
                        setResume({
                            ...resume,
                            [field]: {
                                ...togglable,
                                isOn: !togglable.isOn,
                            },
                        });
                    }}
                />
                <label
                    className='ml-2 mb-2 text-up capitalize'
                    htmlFor={`edit-${field}-toggle`}
                >
                    All {fieldNames[field]}
                </label>
            </span>

            {togglable.isOn && (
                <ReactSortable<Togglable<unknown, unknown>>
                    list={togglable.children || []}
                    setList={(newList) => {
                        setResume({
                            ...resume,
                            [field]: {
                                ...resume[field],
                                children: newList,
                            },
                        });
                    }}
                    className='ml-0 pl-0 list-none not-prose mt-2'
                >
                    {togglable.children?.map((child, index) => (
                        <ToggleChild
                            key={child.id}
                            idx={index}
                            child={child}
                            indent={1}
                            lastID={`edit-${field}`}
                            setChild={(newChild) => {
                                setResume({
                                    ...resume,
                                    [field]: {
                                        ...resume[field],
                                        children: replaceAtIndex(
                                            togglable.children || [],
                                            index,
                                            newChild,
                                        ),
                                    },
                                });
                            }}
                        />
                    ))}
                </ReactSortable>
            )}
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
        [ResumeConfigureSection.Education]: <ConfigureList field='education' />,
        [ResumeConfigureSection.Work]: <ConfigureList field='workExperience' />,
        [ResumeConfigureSection.Projects]: (
            <ConfigureList field='personalProjects' />
        ),
        [ResumeConfigureSection.Profiles]: <ConfigureList field='profiles' />,
        [ResumeConfigureSection.Skills]: <ConfigureSkills />,
    };

    return (
        <dialog id='resume-configure-modal' className='modal'>
            <div className='modal-box relative'>
                <form method='dialog'>
                    <button
                        type='submit'
                        className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
                    >
                        ✕
                    </button>
                </form>
                {components[activeSection]}
            </div>
            <form method='dialog' className='modal-backdrop'>
                <button type='submit'>close</button>
            </form>
        </dialog>
    );
}
