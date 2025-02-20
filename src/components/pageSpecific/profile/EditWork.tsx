import EditableText from '@/components/EditableText'
import EditList, { ListItem } from '@/components/EditList'
import { Work } from '@/lib/jsonResume'
import { useState } from 'react'
import EditProfileProps from './EditProfileProps'
import EditDate from '@/components/EditDate'
import EditableTextArea from '@/components/EditableTextArea'
import MoveUpButton from '@/components/MoveUpButton'
import MoveDownButton from '@/components/MoveDownButton'
import MoveInListButtons from '@/components/MoveInListButtons'

const EditHighlight: ListItem<string> = (props) => {
    const { setItem, removeItem, swapWith, idx, vals } = props

    const highlight = props.val

    return (
        <>
            <EditableTextArea
                defaultVal={highlight}
                dispatch={setItem}
                label="Highlight"
                remove={removeItem}
                width={100}
                height={4}
            />
            <div>
                <MoveInListButtons idx={idx}
                    swapWith={swapWith} listSize={vals.length} fieldName={`Highlight ${highlight}`} />
            </div>
        </>
    )
}

function parseDate(date: string | undefined): string {
    if (!date) return ''

    // assumes that the date is in the format of year-day
    const numOfVals = date.split('-').length
    if (numOfVals == 2) return `${date}-01`
    return `${date}`
}

const EditPosition: ListItem<Work> = (props) => {
    const job = props.val
    const { setItem, removeItem, idx, swapWith, vals } = props

    const setHighlights = (newHighlights: string[]) => {
        setItem({
            ...job,
            highlights: newHighlights,
        })
    }

    return (
        <>
            <div className="flex max-w-full flex-wrap">
                <h2 className="mt-0">
                    {job.name} ({job.position})
                </h2>
                <button
                    className="btn btn-error ml-8"
                    onClick={() => removeItem()}
                >
                    Delete
                </button>
            </div>
            <div className='flex mb-4'>
                <MoveInListButtons idx={idx} swapWith={swapWith} listSize={vals.length} fieldName={`${job.position} at ${job.name}`} />
            </div>
            <div className="flex gap-x-12 max-w-full flex-wrap">
                <EditableText
                    defaultVal={job.name}
                    dispatch={(newName) => {
                        setItem({
                            ...job,
                            name: newName,
                        })
                    }}
                    label="Company Name"
                />
                <EditableText
                    defaultVal={job.position}
                    dispatch={(positionName) => {
                        setItem({
                            ...job,
                            position: positionName,
                        })
                    }}
                    label="Role"
                />
                <div className="flex-col flex">
                    <EditDate
                        defaultDate={parseDate(job.startDate)}
                        dispatch={(startDate) => {
                            setItem({
                                ...job,
                                startDate,
                            })
                        }}
                        label="Start Date"
                    />
                </div>

                <div className="flex-col flex">
                    <EditDate
                        defaultDate={parseDate(job.endDate)}
                        dispatch={(endDate) => {
                            setItem({
                                ...job,
                                endDate,
                            })
                        }}
                        label="End Date"
                    />
                </div>
            </div>
            <h3 className="mb-0">Highlights</h3>
            <EditList
                vals={job.highlights}
                setList={setHighlights}
                RenderItem={EditHighlight}
                itemWrapperClass="bg-base-300 mb-0 mt-3"
                defaultChild={''}
                addBtnText="Add Highlight"
            />
        </>
    )
}

export { EditPosition }

export default function EditWork(props: EditProfileProps) {
    const { resume, dispatchResume } = props
    const [work, dispatchWork] = useState(resume.work)

    const setWork = (newWork: Work[]) => {
        dispatchWork(newWork)
        dispatchResume({
            ...resume,
            work: newWork,
        })
    }

    return (
        <div role="tabpanel" className="mt-12">
            <h2>Edit Work Experience</h2>
            {/* TODO: update this in the future to use companies instead of individual positions */}
            <EditList
                vals={work}
                setList={setWork}
                RenderItem={EditPosition}
                addBtnText="Add Job"
                itemWrapperClass="bg-base-200"
                defaultChild={{
                    name: 'Untitled Company',
                    position: resume.basics.label || 'Job',
                    startDate: '',
                    highlights: [],
                }}
            />
        </div>
    )
}
