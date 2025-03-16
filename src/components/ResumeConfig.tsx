import type Resume from '@/lib/resume'
import type JSONResume from '@/lib/jsonResume'
import Templates, { TemplateNames } from '@/lib/templates'
import ToggleField from './ToggleField'
import Togglable, { isTogglable } from '@/lib/togglable'
import { MouseEventHandler, useState } from 'react'
import { jsonResumeFromResume } from '@/lib/resume'
import {
    ArrowDownTrayIcon,
    ArrowPathIcon,
    ArrowTopRightOnSquareIcon,
    PencilSquareIcon,
} from '@heroicons/react/24/solid'

type ResumeConfigProps = {
    resume: Resume
    baseResume: JSONResume
    setResume: (resume: Resume) => void
    template?: keyof typeof Templates
}

export default function ResumeConfig(props: ResumeConfigProps) {
    const { resume, setResume } = props
    const [resumeName, setResumeName] = useState<string>('')
    const [template, setTemplate] = useState(Object.keys(Templates)[0])

    function getResumePDFLink() {
        return `/api/pdf/`
    }

    const downloadResume: MouseEventHandler<HTMLElement> = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append(
            'resume_data',
            JSON.stringify(jsonResumeFromResume(resume))
        )
        formData.append('download', 'true')
        formData.append('template', template)

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
            className="w-full flex flex-col lg:flex-row"
            method="POST"
            target="resume-preview"
            action={getResumePDFLink()}
            id="resume-config-form"
        >
            <input
                type="hidden"
                name="resume_data"
                value={JSON.stringify(jsonResumeFromResume(resume))}
            />
            <div className="flex-4">
                <div className="flex">
                    <button
                        className="btn btn-accent no-underline mr-5"
                        role="button"
                        onClick={() => {
                            openInNewTab()
                        }}
                    >
                        <ArrowTopRightOnSquareIcon
                            width={24}
                            height={24}
                            title="Open resume in new tab"
                        />
                    </button>
                    <a
                        className="btn btn-secondary text-black no-underline"
                        href="/profile"
                    >
                        <PencilSquareIcon
                            width={24}
                            height={24}
                            title="Edit Resume"
                        />
                    </a>
                </div>
                <div className="prose mt-4">
                    <input
                        className="input input-bordered"
                        placeholder="Job Title"
                        value={resume.title.val}
                        onChange={(e) => {
                            const val = e.target.value
                            setResume({
                                ...resume,
                                title: {
                                    ...resume.title,
                                    val,
                                },
                            })
                        }}
                    />
                </div>
                <ul className="pl-0 overflow-scroll max-h-[70vh]">
                    {Object.entries(resume).map(([key, val]) => {
                        if (!isTogglable(val)) return

                        if (
                            !(
                                val.val ||
                                (val.children && val.children.length > 0)
                            )
                        )
                            return

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
                        <ArrowPathIcon
                            width={24}
                            height={24}
                            title="Preview Resume"
                        />
                    </button>
                    <label className="input input-bordered pr-0 ml-4 flex">
                        <input
                            type="text"
                            className="grow"
                            placeholder="Save As"
                            onChange={(e) => {
                                const newResumeName = e.target.value
                                setResumeName(newResumeName)
                            }}
                        />
                        <button
                            className="btn btn-primary"
                            onClick={downloadResume}
                        >
                            <ArrowDownTrayIcon
                                width={12}
                                height={12}
                                title="Download Resume"
                            />
                        </button>
                    </label>
                    <select
                        className="select select-bordered ml-8"
                        name="template"
                        id="resume-template"
                        onChange={(e) => {
                            setTemplate(e.target.value)
                        }}
                    >
                        {Object.keys(Templates).map((template, idx) => {
                            const templateName = TemplateNames[template]
                            return (
                                <option
                                    className="cursor-pointer"
                                    value={template}
                                    key={`template-${idx}-${template}`}
                                >
                                    {templateName}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div className="ml-12 ">
                    <iframe
                        width={'100%'}
                        className="min-h-[78vh]"
                        name="resume-preview"
                        id="resume-preview"
                    />
                </div>
            </div>
        </form>
    )
}
