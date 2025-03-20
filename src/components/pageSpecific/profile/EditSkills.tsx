import { useEffect, useState } from 'react';
import type EditProfileProps from './EditProfileProps';
import type { Skill } from '@/lib/jsonResume';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { ReactSortable } from 'react-sortablejs';

function getAnnotatedSkills(skills: Skill[]) {
    return skills.map((skill, idx) => {
        return {
            data: skill,
            id: `edit-skill-${idx}`,
        };
    });
}

export default function EditSkills(props: EditProfileProps) {
    const { resume, dispatchResume } = props;
    const [skills, dispatchSkills] = useState(resume.skills || []);
    const [skillToAdd, setSkillToAdd] = useState<string>('');

    const setSkills = (skills: Skill[]) => {
        dispatchSkills(skills);
        dispatchResume({
            ...resume,
            skills,
        });
    };

    type AnnotatedSkill = {
        data: Skill;
        id: string;
    };

    const [annotatedSkills, dispatchAnnotatedSkills] = useState<
        AnnotatedSkill[]
    >(getAnnotatedSkills(skills));
    useEffect(() => {
        dispatchAnnotatedSkills(getAnnotatedSkills(skills));
    }, [skills]);

    const addSkill = () => {
        const skill: Skill = {
            name: skillToAdd,
        };
        const newSkills = [...skills, skill];
        setSkills(newSkills);
        setSkillToAdd('');
    };

    const setAnnotatedSkills = (newAnnotatedSkills: AnnotatedSkill[]) => {
        setSkills(newAnnotatedSkills.map((annotated) => annotated.data));
    };

    return (
        <>
            <h2>Edit Skills</h2>
            <ReactSortable
                className='flex flex-wrap mb-8 gap-y-4'
                list={annotatedSkills}
                setList={setAnnotatedSkills}
            >
                {skills.map((skill, idx) => {
                    return (
                        <div
                            key={`skill-${idx}`}
                            className='badge badge-primary mr-2 rounded-lg cursor-pointer'
                        >
                            <button
                                onClick={() => {
                                    const updatedSkills = skills;
                                    updatedSkills.splice(idx, 1);
                                    setSkills(updatedSkills);
                                    setAnnotatedSkills(
                                        updatedSkills.map((skill, idx) => {
                                            return {
                                                data: skill,
                                                id: `skill-${idx}`,
                                            };
                                        }),
                                    );
                                }}
                            >
                                <XCircleIcon className='w-4 h-4 mr-2' />
                            </button>
                            <span>{skill.name}</span>
                        </div>
                    );
                })}
            </ReactSortable>
            <div className='input input-bordered w-40 px-0 flex'>
                <input
                    type='text'
                    className='h-full flex-1 max-w-full px-4'
                    placeholder='Enter Skill Here'
                    onChange={(e) => {
                        setSkillToAdd(e.target.value);
                    }}
                    value={skillToAdd}
                />
                <button
                    className='btn btn-main btn-info'
                    onClick={() => {
                        addSkill();
                    }}
                >
                    Add
                </button>
            </div>
        </>
    );
}
