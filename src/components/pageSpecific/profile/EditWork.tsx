import EditableText from '@/components/EditableText';
import EditList, { type ListItem } from '@/components/EditList';
import type { Work } from '@/lib/jsonResume';
import { useContext, useState } from 'react';
import type EditProfileProps from './EditProfileProps';
import EditDate from '@/components/EditDate';
import EditableTextArea from '@/components/EditableTextArea';
import JSONResumeContext from './JSONResumeContext';
import Input from '@/components/Input';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

const EditHighlight: ListItem<string> = (props) => {
    const { setItem, removeItem } = props;

    const highlight = props.val;

    return (
        <>
            <EditableTextArea
                val={highlight}
                onSave={setItem}
                onDelete={removeItem}
                textAreaProps={{
                    className: 'textarea w-full mb-4',
                }}
            />
        </>
    );
};

function parseDate(date: string | undefined): string {
    if (!date) return '';

    // assumes that the date is in the format of year-day
    const numOfVals = date.split('-').length;
    if (numOfVals === 2) return `${date}-01`;
    return `${date}`;
}

const EditPosition: ListItem<Work> = (props) => {
    const job = props.val;
    const { setItem, removeItem } = props;

    const setHighlights = (newHighlights: string[]) => {
        setItem({
            ...job,
            highlights: newHighlights,
        });
    };

    return (
        <>
            <div className='flex max-w-full flex-wrap'>
                <h2 className='mt-0'>
                    {job.name} ({job.position})
                </h2>
                <button
                    type='button'
                    className='btn btn-error ml-8'
                    onClick={() => removeItem()}
                >
                    Delete
                </button>
            </div>
            <div className='flex gap-x-12 max-w-full flex-wrap'>
                <EditableText
                    defaultVal={job.name}
                    dispatch={(newName) => {
                        setItem({
                            ...job,
                            name: newName,
                        });
                    }}
                    label='Company Name'
                />
                <EditableText
                    defaultVal={job.position}
                    dispatch={(positionName) => {
                        setItem({
                            ...job,
                            position: positionName,
                        });
                    }}
                    label='Role'
                />
                <div className='flex-col flex'>
                    <EditDate
                        defaultDate={parseDate(job.startDate)}
                        dispatch={(startDate) => {
                            setItem({
                                ...job,
                                startDate,
                            });
                        }}
                        label='Start Date'
                    />
                </div>

                <div className='flex-col flex'>
                    <EditDate
                        defaultDate={parseDate(job.endDate)}
                        dispatch={(endDate) => {
                            setItem({
                                ...job,
                                endDate,
                            });
                        }}
                        label='End Date'
                    />
                </div>
            </div>
            <h3 className='mb-0'>Highlights</h3>
            <EditList
                vals={job.highlights}
                setList={setHighlights}
                RenderItem={EditHighlight}
                NewItemFormBody={
                    <>
                        <h4>Add Highlight</h4>
                        <textarea
                            className='textarea w-full resize-none'
                            name='text'
                            placeholder='Highlight'
                        />
                    </>
                }
                itemWrapperClass='bg-base-300 mb-0 mt-3'
                defaultItem={''}
                addBtnText='Add Highlight'
            />
        </>
    );
};

export { EditPosition };

export default function EditWork() {
    const { resume, setResume } = useContext(JSONResumeContext);
    const [work, dispatchWork] = useState(resume.work);

    const setWork = (newWork: Work[]) => {
        setResume({
            ...resume,
            work: newWork,
        });
        dispatchWork(newWork);
    };

    return (
        <div role='tabpanel' className='mt-12'>
            <h2>Edit Work Experience</h2>
            {/* TODO: update this in the future to use companies instead of individual positions */}
            <EditList
                vals={work}
                setList={setWork}
                RenderItem={EditPosition}
                NewItemFormBody={
                    <>
                        <h4>Add a new role</h4>
                        <div className='flex gap-4'>
                            <Input required name='name' label='Company Name' />
                            <Input required name='position' label='Position' />
                            <Input
                                required
                                name='startDate'
                                label='Start Date'
                                type='date'
                            />
                            <Input
                                name='endDate'
                                label='End Date'
                                type='date'
                            />
                        </div>
                    </>
                }
                addBtnText='Add Job'
                itemWrapperClass='bg-base-200'
                defaultItem={{
                    name: 'Untitled Company',
                    position: resume.basics.label || 'Job',
                    startDate: '',
                    highlights: [],
                }}
            />
        </div>
    );
}
