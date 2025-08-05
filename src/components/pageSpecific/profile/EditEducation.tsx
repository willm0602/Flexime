import EditList, { type ListItem } from '@/components/EditList';
import { useContext, useState } from 'react';
import type { Education } from '@/lib/jsonResume';
import EditableText from '@/components/EditableText';
import TitleWithRemove from './TitleWithRemove';
import EditableNumber from '@/components/EditableNumber';
import EditDate from '@/components/EditDate';
import JSONResumeContext from './JSONResumeContext';
import Input from '@/components/Input';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

const DEFAULT_EDUCATION: Education = {
    institution: 'Untitled School',
    area: 'Area',
    studyType: 'Type of Study',
    startDate: '',
};

const EditDegree: ListItem<Education> = (props) => {
    const { val, setItem, removeItem } = props;

    return (
        <>
            <div className='flex'>
                <TitleWithRemove title={val.institution} remove={removeItem} />
            </div>

            <div className='flex gap-x-24 flex-wrap gap-y-12'>
                <EditableText
                    defaultVal={val.institution}
                    dispatch={(newInstitutionName) => {
                        setItem({
                            ...val,
                            institution: newInstitutionName,
                        });
                    }}
                    label={'Institution Name'}
                />

                <EditableText
                    defaultVal={val.area}
                    dispatch={(area) => {
                        setItem({
                            ...val,
                            area,
                        });
                    }}
                    label={'Area'}
                />

                <EditableText
                    defaultVal={val.studyType}
                    dispatch={(studyType) => {
                        setItem({
                            ...val,
                            studyType,
                        });
                    }}
                    label={'Study Type'}
                />

                <EditableNumber
                    defaultVal={Number.parseFloat(val.score || '4')}
                    dispatch={(newGPA) => {
                        setItem({
                            ...val,
                            score: `${newGPA} / 4.0`,
                        });
                    }}
                    label='GPA'
                    step={0.1}
                    digits={2}
                    minVal={0}
                    maxVal={5}
                />

                <div className='flex flex-wrap max-w-full gap-x-8'>
                    <EditDate
                        dispatch={(startDate) => {
                            setItem({
                                ...val,
                                startDate,
                            });
                        }}
                        label='Start Date'
                        defaultDate={val.startDate}
                    />

                    <EditDate
                        dispatch={(endDate) => {
                            setItem({
                                ...val,
                                endDate,
                            });
                        }}
                        label='End Date'
                        defaultDate={val.endDate}
                    />
                </div>
            </div>
        </>
    );
};

export default function EditEducation() {
    const { resume, setResume } = useContext(JSONResumeContext);
    const [degrees, dispatchDegrees] = useState(resume.education);

    const setDegrees = (newDegrees: Education[]) => {
        dispatchDegrees(newDegrees);
        setResume({
            ...resume,
            education: newDegrees,
        });
    };

    return (
        <div role='tabpanel' className='mt-12'>
            <h2>Edit Education</h2>
            <EditList
                vals={degrees}
                setList={setDegrees}
                RenderItem={EditDegree}
                NewItemFormBody={
                    <>
                        <h4>Add Education</h4>
                        <div className='flex gap-4'>
                            <Input
                                label='Institution'
                                required
                                name='institution'
                            />
                            <Input label='Area' required name='area' />
                            <fieldset className='fieldset'>
                                <legend className='fieldset-legend'>
                                    Study Type
                                </legend>
                                <select
                                    name='studyType'
                                    className='select select-bordered w-full max-w-xs'
                                    defaultValue="Bachelor's degree"
                                >
                                    <option value='High School'>
                                        High School
                                    </option>
                                    <option value="Associate's degree">
                                        Associate's degree
                                    </option>
                                    <option value="Bachelor's degree">
                                        Bachelor's degree
                                    </option>
                                    <option value="Master's degree">
                                        Master's degree
                                    </option>
                                    <option value='Doctorate'>Doctorate</option>
                                    <option value='Certificate'>
                                        Certificate
                                    </option>
                                    <option value='Diploma'>Diploma</option>
                                    <option value='Bootcamp'>Bootcamp</option>
                                    <option value='Online Course'>
                                        Online Course
                                    </option>
                                    <option value='Self-taught'>
                                        Self-taught
                                    </option>
                                </select>
                            </fieldset>
                            <Input
                                label='Start Date'
                                type='date'
                                required
                                name='startDate'
                            />
                            <Input
                                label='End Date'
                                type='date'
                                name='endDate'
                            />
                        </div>
                    </>
                }
                addBtnText='Add Education'
                defaultItem={DEFAULT_EDUCATION}
            />
        </div>
    );
}
