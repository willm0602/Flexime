import { Work } from '@/lib/resume'
import ResumeInputSection, {
    ResumeInputSectionProps,
} from './pageSpecific/home/resumeInputSection'
import WorkInput from './pageSpecific/workInput'

const DEFAULT_WORK: Work = {
    name: '',
    position: '',
    startDate: '',
    highlights: [],
}

export default function ResumeWorkSection(props: ResumeInputSectionProps) {
    const { resume, setResume } = props

    const workHistory = resume.work || []

    const addWork = () => {
        const newWork = [...workHistory, DEFAULT_WORK]
        setResume({
            ...resume,
            work: newWork,
        })
    }

    return (
        <ResumeInputSection title="Work History">
            <div className="w-full">
                {workHistory.map((work, idx) => {
                    return (
                        <WorkInput
                            work={work}
                            idx={idx}
                            key={`work-${idx}`}
                            resume={resume}
                            setResume={setResume}
                        />
                    )
                })}

                <button onClick={addWork} className='btn btn-accent'>Add Work</button>

            </div>
        </ResumeInputSection>
    )
}
