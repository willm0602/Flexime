import EditableText from '@/components/EditableText'
import EditList, { ListItem, ListItemProps } from '@/components/EditList'
import Resume, { Work } from '@/lib/jsonResume'
import { useState } from 'react'
import EditProfileProps from './EditProfileProps'

const EditHighlight: ListItem<string> = (props) => {
    const { setItem, removeItem } = props

    const highlight = props.val;

    return (
        <>
            <EditableText
                defaultVal={highlight}
                dispatch={setItem}
                label="Highlight"
				remove={removeItem}
            />
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
    const { setItem, removeItem } = props

    const setHighlights = (newHighlights: string[]) => {
        setItem({
            ...job,
            highlights: newHighlights,
        })
    }

    return (
        <>
            <div className="flex mb-6">
				<h2 className="mt-0">
					{job.name} ({job.position})
				</h2>
				<button
					className='btn btn-error ml-8'
					onClick={()=>removeItem()}
				>Delete</button>
			</div>
            <div className="flex gap-x-12">
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
                    <label>Start Date</label>
                    <input
                        className="input input-sm"
                        type="date"
                        defaultValue={parseDate(job.startDate)}
						onChange={(e) => {
							const newDate = e.target.value;
							setItem({
								...job,
								startDate: newDate
							});
						}}
                    />
                </div>

                <div className="flex-col flex">
                    <label>End Date</label>
                    <input
                        className="input input-sm"
                        type="date"
                        defaultValue={parseDate(job.endDate)}
						onChange={(e) => {
							const newDate = e.target.value;
							setItem({
								...job,
								endDate: newDate
							});
						}}
                    />
                </div>
            </div>
            <h3 className="mb-0">Highlights</h3>
            <EditList
                vals={job.highlights}
                setList={setHighlights}
                RenderItem={EditHighlight}
				itemWrapperClass='bg-base-300'
                defaultChild={''}
                addBtnText="Add Highlight"
            />
        </>
    )
}

export {EditPosition};

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
				itemWrapperClass='bg-base-200'
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
