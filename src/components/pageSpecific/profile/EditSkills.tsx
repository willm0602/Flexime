import { useContext, useEffect, useState } from 'react';
import type { Skill } from '@/lib/jsonResume';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { ReactSortable } from 'react-sortablejs';
import JSONResumeContext from './JSONResumeContext';
import toast from 'react-hot-toast';

function getAnnotatedSkills(skills: Skill[]) {
    return skills.map((skill, idx) => {
        return {
            data: skill,
            id: `edit-skill-${idx}`,
        };
    });
}

export default function EditSkills() {
    const {resume, setResume} = useContext(JSONResumeContext);
    const [skills, dispatchSkills] = useState(resume.skills || []);
    const [skillToAdd, setSkillToAdd] = useState<string>('');

    const setSkills = (skills: Skill[]) => {
        dispatchSkills(skills);
        setResume({
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
        if(!skillToAdd){
            toast('Skill cannot be empty');
            return;
        }
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
                            key={`skill-${skill.name}`}
                            className='badge badge-primary mr-2 rounded-lg cursor-pointer'
                        >
                            <button
                                type='button'
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
            <div className='join'>
                <input
                    type='text'
                    className='input join-item input-bordered'
                    placeholder='Enter Skill Here'
                    onChange={(e) => {
                        setSkillToAdd(e.target.value);
                    }}
                    onKeyDown={(e) => {
                        const key = e.key;
                        if(key === 'Enter')
                            addSkill();
                    }}
                    value={skillToAdd}
                />
                <button
                    type='button'
                    className='btn join-item rounded-r-full btn-accent'
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
