import { type MouseEventHandler, useContext, useState } from 'react';
import ResumeContext from './ResumeContext';
import { jsonResumeFromResume } from '@/lib/resume';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import Templates, { TemplateNames } from '@/lib/templates';

export default function DownloadResume() {
    const { resume, setResume } = useContext(ResumeContext);

    const [resumeName, dispatchResumeName] = useState('');
    const [template, setTemplate] = useState(Object.keys(Templates)[0]);

    const setResumeName = (newResumeName: string) => {
        dispatchResumeName(newResumeName);
    };

    const downloadResume: MouseEventHandler<HTMLElement> = async (e) => {
        e.preventDefault();

        // NOTE: we shouldn't *really* hit this case, this is just if somehow the download was
        // pressed before the resume was loaded (which in reality should never happen)
        if (!resume) return;

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

    return (
        <>
            <label className='input input-bordered pr-0 ml-0 md:ml-4 flex w-full md:w-60 md:mb-0 mb-4'>
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
                    type='button'
                    className='btn btn-primary'
                    onClick={downloadResume}
                >
                    <ArrowDownTrayIcon
                        width={12}
                        height={12}
                        title='Download Resume'
                    />
                </button>
            </label>
            <select
                className='select select-bordered ml-0 md:ml-8 w-full md:w-60 mb-4 md:mb-0'
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
        </>
    );
}
