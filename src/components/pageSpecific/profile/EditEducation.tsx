import EditList, { ListItem, ListItemProps } from '@/components/EditList'
import EditProfileProps from './EditProfileProps'
import { useState } from 'react'
import { Education } from '@/lib/jsonResume'
import EditableText from '@/components/EditableText'
import TitleWithRemove from './TitleWithRemove'
import EditableNumber from '@/components/EditableNumber'
import EditDate from '@/components/EditDate'

const DEFAULT_EDUCATION: Education = {
    institution: 'Untitled School',
    area: 'Area',
    studyType: 'Type of Study',
    startDate: '',
}

const EditDegree: ListItem<Education> = (props) => {
    const { val, setItem, removeItem } = props

    return (
        <>
            <TitleWithRemove
                title={val.institution}
                remove={removeItem}
            />

            <div className='flex gap-x-24 flex-wrap gap-y-12'>
                <EditableText
                    defaultVal={val.institution}
                    dispatch={(newInstitutionName) => {
                        setItem({
                            ...val,
                            institution: newInstitutionName,
                        })
                    }}
                    label={'Institution Name'}
                />

                <EditableText
                    defaultVal={val.area}
                    dispatch={(area) => {
                        setItem({
                            ...val,
                            area,
                        })
                    }}
                    label={'Area'}
                />

                <EditableText
                    defaultVal={val.studyType}
                    dispatch={(studyType) => {
                        setItem({
                            ...val,
                            studyType,
                        })
                    }}
                    label={'Study Type'}
                />

                <EditableNumber
                    defaultVal={parseFloat(val.score || '4')}
                    dispatch={(newGPA) => {
                        setItem({
                            ...val,
                            score: `${newGPA} / 4.0`
                        });
                    }}
                    label='GPA'
                    step={0.1}
                    digits={1}
                    minVal={0}
                    maxVal={5}              
                />

                <EditDate
                    dispatch={(startDate) => {
                        setItem({
                            ...val,
                            startDate
                        });
                    }}
                    label='Start Date'
                    defaultDate={val.startDate}
                />
            </div>
        </>
    )
}

export default function EditEducation(props: EditProfileProps) {
    const { resume, dispatchResume } = props
    const [degrees, dispatchDegrees] = useState(resume.education)

    const setDegrees = (newDegrees: Education[]) => {
        dispatchDegrees(newDegrees)
        dispatchResume({
            ...resume,
            education: newDegrees,
        })
    }

    return (
        <div role="tabpanel" className="mt-12">
            <h2>Edit Education</h2>
            <EditList
                vals={degrees}
                setList={setDegrees}
                RenderItem={EditDegree}
                addBtnText='Add Education'
                defaultChild={DEFAULT_EDUCATION}
            />
        </div>
    )
}
