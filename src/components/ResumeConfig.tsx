import type Resume from '@/lib/resume'
import type JSONResume from '@/lib/jsonResume'
import Templates from '@/lib/templates'
import ToggleField from './ToggleField'
import Togglable, { isTogglable } from '@/lib/togglable'
import { MouseEventHandler, useState } from 'react'

type ResumeConfigProps = {
    resume: Resume
    baseResume: JSONResume
    setResume: (resume: Resume) => void
    template?: keyof typeof Templates
}

export default function ResumeConfig(props: ResumeConfigProps) {
    const { resume, setResume } = props
    const [resumeName, setResumeName] = useState<string>('')

    function getResumePDFLink() {
        return `/api/pdf/`
    }

    const downloadResume: MouseEventHandler<HTMLElement> = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('resume_data', JSON.stringify(resume))
        formData.append('download', 'true')

        const pdfData = await fetch('/api/pdf', {
            method: 'POST',
            body: formData,
        })

        const blob = await pdfData.blob()
        const url = window.URL.createObjectURL(blob)

        const tempAnchor = document.createElement('a')
        tempAnchor.href = url
        tempAnchor.setAttribute('download', resumeName || 'resume.pdf')
        document.body.appendChild(tempAnchor)
        tempAnchor.click()
        document.body.removeChild(tempAnchor)
        window.URL.revokeObjectURL(url)
    }

    const openInNewTab = () => {
        const form = document.getElementById(
            'resume-config-form'
        ) as HTMLFormElement
        if (!form) return
        form.setAttribute('target', '_blank')
        form.submit()
        form.setAttribute('target', 'resume-preview')
    }

    return (
        <form
            className="w-full flex"
            method="POST"
            target="resume-preview"
            action={getResumePDFLink()}
            id="resume-config-form"
        >
            <input
                type="hidden"
                name="resume_data"
                value={JSON.stringify(resume)}
            />
            <div className="flex-4">
                <div className="flex">
                    <button
                        className="btn btn-accent no-underline mr-4"
                        role="button"
                        onClick={() => {
                            openInNewTab()
                        }}
                    >
                        View Resume
                    </button>
                    <a
                        className="btn btn-secondary text-black no-underline"
                        href="/profile"
                    >
                        Modify Profile Here
                    </a>
                </div>
                <ul className="pl-0">
                    {Object.entries(resume).map(([key, val]) => {
                        if (!isTogglable(val)) {
                            return
                        }

                        return (
                            <li
                                key={`toggle-field-${key}`}
                                className="list-none"
                            >
                                <ToggleField
                                    fieldName={key as keyof Resume}
                                    // @ts-expect-error type needs to be generic
                                    togglable={
                                        val as Resume[keyof Resume] &
                                            Togglable<unknown>
                                    }
                                    parent={resume}
                                    setParent={setResume}
                                />
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="flex-1">
                <div className="flex">
                    <button className="btn btn-primary ml-12 mb-4">
                        Preview Resume
                    </button>
                    <button
                        className="btn btn-primary ml-4 mb-4"
                        onClick={downloadResume}
                    >
                        Download Resume
                    </button>
                    <input
                        className="input input-bordered"
                        placeholder="Save As"
                        onChange={(e) => {
                            const newResumeName = e.target.value
                            setResumeName(newResumeName)
                        }}
                    />
                </div>
                <div className="ml-12 min-h-full">
                    <iframe
                        width={'100%'}
                        height={'100%'}
                        className="min-h-[72em]"
                        name="resume-preview"
                        id="resume-preview"
                    />
                </div>
            </div>
        </form>
    )
}
