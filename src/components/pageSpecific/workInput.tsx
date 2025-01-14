import Resume, { Work } from '@/lib/resume'
import ResumeStringSetter from './home/resumeStringSetter'
import { useState } from 'react'

type WorkInputProps = {
    work: Work
    idx: number
    setResume: (resume: Resume) => void
    resume: Resume
}

export default function WorkInput(props: WorkInputProps) {
    const { idx, setResume, resume } = props
    const defaultWork = props.work;

    const [work, $setWork] = useState<Work>(defaultWork);
    const setWork = (work: Work) => {
        $setWork(work);
        const newWork = resume.work;
        newWork[idx] = work;
        setResume({
            ...resume,
            work: newWork
        });
    }

    const removeWork = () => {
        const remainingWork = resume.work.filter((work, workIdx) => {
            return idx != workIdx
        });

        setResume({
            ...resume,
            work: remainingWork
        })
    }

    const promptThenRemove = () => {
        const shouldRemove = window.confirm(`Are you sure you want to remove ${work.name} from your work history? This cannot be undone`);
        if (shouldRemove) {
            removeWork();
        }
    }

    const StringSetter = (props: { fieldName: keyof Work & string, defaultVal: string }) => {
        const { fieldName, defaultVal } = props;
        return <ResumeStringSetter<Work>
            parent={work}
            fieldName={fieldName}
            defaultVal={defaultVal}
            setParent={setWork}
        />
    }

    return (
        <div
            className='w-full border-2 border-secondary p-4 mb-4'
        >
            <div className='w-full flex justify-between'>
                <button className='btn btn-error btn-xs'
                    onClick={() => { promptThenRemove(); }}
                >Remove</button>
            </div>
            <StringSetter fieldName="name" defaultVal={work.name} />
            <StringSetter fieldName="position" defaultVal={work.position} />
        </div>
    )
}
