import EditableText from '@/components/EditableText';
import EditList, { type ListItem } from '@/components/EditList';
import type { Work } from '@/lib/jsonResume';
import { useContext, useState } from 'react';
import type EditProfileProps from './EditProfileProps';
import EditDate from '@/components/EditDate';
import EditableTextArea from '@/components/EditableTextArea';
import JSONResumeContext from './JSONResumeContext';

const EditHighlight: ListItem<string> = (props) => {
    const { setItem, removeItem } = props;

    const highlight = props.val;

    return (
        <>
            <EditableTextArea
                defaultVal={highlight}
                dispatch={setItem}
                label='Highlight'
                remove={removeItem}
                width={100}
                height={4}
            />
        </>
    );
};

function parseDate(date: string | undefined): string {
    if (!date) return '';

    // assumes that the date is in the format of year-day
    const numOfVals = date.split('-').length;
    if (numOfVals == 2) return `${date}-01`;
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
                itemWrapperClass='bg-base-300 mb-0 mt-3'
                defaultChild={''}
                addBtnText='Add Highlight'
            />
        </>
    );
};

export { EditPosition };

export default function EditWork() {
    const {resume, setResume} = useContext(JSONResumeContext);
    const [work, dispatchWork] = useState(resume.work);

    const setWork = (newWork: Work[]) => {
        dispatchWork(newWork);
        setResume({
            ...resume,
            work: newWork,
        });
    };

    return (
        <div role='tabpanel' className='mt-12'>
            <h2>Edit Work Experience</h2>
            {/* TODO: update this in the future to use companies instead of individual positions */}
            <EditList
                vals={work}
                setList={setWork}
                RenderItem={EditPosition}
                addBtnText='Add Job'
                itemWrapperClass='bg-base-200'
                defaultChild={{
                    name: 'Untitled Company',
                    position: resume.basics.label || 'Job',
                    startDate: '',
                    highlights: [],
                }}
            />
        </div>
    );
}
