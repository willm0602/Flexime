import { useState } from 'react'
import EditProfileProps from './EditProfileProps'
import { Skill } from '@/lib/jsonResume'
import { XCircleIcon } from '@heroicons/react/24/solid'

export default function EditSkills(props: EditProfileProps) {
    const { resume, dispatchResume } = props
    const [skills, dispatchSkills] = useState(resume.skills || [])
    const [skillToAdd, setSkillToAdd] = useState<string>('')

    const setSkills = (skills: Skill[]) => {
        dispatchSkills(skills)
        dispatchResume({
            ...resume,
            skills,
        })
    }

    const addSkill = () => {
        const skill: Skill = {
            name: skillToAdd,
        }
        const newSkills = [...skills, skill]
        setSkills(newSkills)
        setSkillToAdd('')
    }

    return (
        <>
            <h2>Edit Skills</h2>
            <div className="flex flex-wrap mb-8 gap-y-4">
                {skills.map((skill, idx) => {
                    return (
                        <div
                            key={`skill-${idx}`}
                            className="badge badge-primary mr-2 rounded-lg"
                        >
                            <button
                                onClick={() => {
                                    const updatedSkills = skills
                                    updatedSkills.splice(idx, 1)
                                    setSkills(updatedSkills)
                                }}
                            >
                                <XCircleIcon className="w-4 h-4 mr-2" />
                            </button>
                            <span>{skill.name}</span>
                        </div>
                    )
                })}
            </div>
            <div className="input input-bordered w-40 px-0 flex">
                <input
                    type="text"
                    className="h-full flex-1 max-w-full px-4"
                    placeholder="Enter Skill Here"
                    onChange={(e) => {
                        setSkillToAdd(e.target.value)
                    }}
                    value={skillToAdd}
                />
                <button
                    className="btn btn-main btn-info"
                    onClick={() => {
                        addSkill()
                    }}
                >
                    Add
                </button>
            </div>
        </>
    )
}
