import type Resume from '@/lib/resume';
import type JSONResume from '@/lib/jsonResume';
import Templates, { TemplateNames } from '@/lib/templates';
import ToggleField from './ToggleField';
import type Togglable from '@/lib/togglable';
import { isTogglable, togglable } from '@/lib/togglable';
import { type MouseEventHandler, useEffect, useState } from 'react';
import { jsonResumeFromResume } from '@/lib/resume';
import {
    ArrowDownTrayIcon,
    ArrowPathIcon,
    ArrowTopRightOnSquareIcon,
    PencilSquareIcon,
    SparklesIcon,
} from '@heroicons/react/24/solid';
import AITailorResumeModal from './pageSpecific/home/AITaylorResumeModal';

type ResumeConfigProps = {
    resume: Resume;
    baseResume: JSONResume;
    setResume: (resume: Resume) => void;
    template?: keyof typeof Templates;
};

export default function ResumeConfig(props: ResumeConfigProps) {
    const { resume, setResume } = props;
    const [resumeName, setResumeName] = useState<string>('');
    const [template, setTemplate] = useState(Object.keys(Templates)[0]);
    const [resumeFields, setResumeFields] = useState<[string, Togglable<unknown, unknown>][]>([]);

    useEffect(() => {
        setResumeFields(Object.entries(resume).filter(([_, val]) => {
            return isTogglable(val);
        }));
    }, [resume])

    function getResumePDFLink() {
        return '/api/pdf/';
    }

    const downloadResume: MouseEventHandler<HTMLElement> = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append(
            'resume_data',
            JSON.stringify(jsonResumeFromResume(resume)),
        );
        formData.append('download', 'true');
        formData.append('template', template);
        const pdfData = await fetch('/api/pdf', {
            method: 'POST',
            body: formData,
        });

        const status = pdfData.status;
        if (status === 429){
            window.alert('Trying to generate too many resumes too fast. Please wait 10 seconds between');
            return;
        }

        const blob = await pdfData.blob();
        const url = window.URL.createObjectURL(blob);

        const tempAnchor = document.createElement('a');
        tempAnchor.href = url;
        tempAnchor.setAttribute('download', resumeName || 'resume.pdf');
        document.body.appendChild(tempAnchor);
        tempAnchor.click();
        document.body.removeChild(tempAnchor);
        window.URL.revokeObjectURL(url);
    };

    const openInNewTab = () => {
        const form = document.getElementById(
            'resume-config-form',
        ) as HTMLFormElement;
        if (!form) return;
        form.setAttribute('target', '_blank');
        form.submit();
        form.setAttribute('target', 'resume-preview');
    };

    const loadPreview = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        fetch(getResumePDFLink(), {
            method: 'POST',
            body: formData,
            headers: {
                Accept: 'application/pdf',
            },
        })
            .then(async (response) => {
                if (response.status === 200) {
                    const iframe = document.getElementById(
                        'resume-preview',
                    ) as HTMLIFrameElement;
                    if (iframe) {
                        iframe.src = URL.createObjectURL(await response.blob());
                    }
                } else if(response.status === 429){
                    window.alert('Trying to generate too many resumes too fast. Please wait 10 seconds between generating');
                } else {
                    console.error('Failed to load preview');
                }
            })
            .catch((error) => {
                console.error('Error loading preview:', error);
            });
    }

    return (
        <>
        <AITailorResumeModal
            resume={resume}
            setResume={setResume}
        />
        <form
            className='w-full flex flex-col lg:flex-row'
            method='POST'
            action={getResumePDFLink()}
            id='resume-config-form'
            onSubmit={loadPreview}
        >
            <input
                type='hidden'
                name='resume_data'
                value={JSON.stringify(jsonResumeFromResume(resume))}
            />
            <div className='flex-4'>
                <div className='flex'>
                    <button
                        className='btn btn-accent no-underline mr-5'
                        type='button'
                        onClick={() => {
                            openInNewTab();
                        }}
                    >
                        <ArrowTopRightOnSquareIcon
                            width={24}
                            height={24}
                            title='Open resume in new tab'
                        />
                    </button>
                    <a
                        className='btn btn-secondary text-black no-underline mr-5'
                        href='/profile'
                    >
                        <PencilSquareIcon
                            width={24}
                            height={24}
                            title='Edit Resume'
                        />
                    </a>
                    <button
                        type="button"
                        className='btn btn-info text-black no-underline'
                        onClick={() => {
                            const modal = document.getElementById('tailor-with-ai-modal') as HTMLDialogElement;
                            if (!modal){
                            return;
                            }
                            modal.showModal();
                        }}
                    >
                        <SparklesIcon
                            width={24}
                            height={24}
                            title='Tailor resume to job description with AI'
                            color='white'
                        />
                    </button>
                </div>
                <div className='prose mt-4'>
                    <input
                        className='input input-bordered'
                        placeholder='Job Title'
                        value={resume.title.val}
                        onChange={(e) => {
                            const val = e.target.value;
                            setResume({
                                ...resume,
                                title: {
                                    ...resume.title,
                                    val,
                                },
                            });
                        }}
                    />
                </div>
                <ul className='pl-0 overflow-scroll max-h-[70vh]'>
                    {resumeFields.map(([key, val]) => {
                        if (
                            !(
                                (val as Togglable<unknown>).val ||
                                (val.children && val.children.length > 0)
                            )
                        )
                            return;

                        return (
                            <li
                                key={`toggle-field-${val.title}-${val.isOn}`}
                                className='list-none'
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
                        );
                    })}
                </ul>
            </div>
            <div className='flex-1'>
                <div className='flex'>
                    <button className='btn btn-primary ml-12 mb-4'
                            type="submit"
                    >
                        <ArrowPathIcon
                            width={24}
                            height={24}
                            title='Preview Resume'
                        />
                    </button>
                    <label className='input input-bordered pr-0 ml-4 flex'>
                        <input
                            type='text'
                            className='grow'
                            placeholder='Save As'
                            onChange={(e) => {
                                const newResumeName = e.target.value;
                                setResumeName(newResumeName);
                            }}
                        />
                        <button
                            className='btn btn-primary'
                            onClick={downloadResume}
                            type ='button'
                        >
                            <ArrowDownTrayIcon
                                width={12}
                                height={12}
                                title='Download Resume'
                            />
                        </button>
                    </label>
                    <select
                        className='select select-bordered ml-8'
                        name='template'
                        id='resume-template'
                        onChange={(e) => {
                            setTemplate(e.target.value);
                        }}
                    >
                        {Object.keys(Templates).map((template, idx) => {
                            const templateName = TemplateNames[template];
                            return (
                                <option
                                    className='cursor-pointer'
                                    value={template}
                                    key={`template-${idx}-${template}`}
                                >
                                    {templateName}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className='ml-12 '>
                    <iframe
                        title='Resume Preview'
                        width={'100%'}
                        className='min-h-[78vh]'
                        name='resume-preview'
                        id='resume-preview'
                    />
                </div>
            </div>
        </form>
        </>
    );
}
