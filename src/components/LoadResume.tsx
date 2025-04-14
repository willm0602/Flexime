'use client';
import type Resume from '@/lib/jsonResume';
import resumeValidator from '@/lib/validators/jsonResume';
import type { ChangeEventHandler } from 'react';
import toast from 'react-hot-toast';

type LoadResumeProps = {
    setResume: (newResume: Resume) => void;
};

export async function parseResumeFile(file: File){
    const formData = new FormData();
    formData.append('resume', file);
    fetch('/api/parse_resume', {
        method: 'POST',
        body: formData,
    }).then((resp) => {
        console.log(resp);
    }).catch((err) => {
        console.error('Error parsing resume file:', err);
});
}

export default function LoadResume(props: LoadResumeProps) {
    const { setResume } = props;

    const showErrorMsg = () => {
        toast('Invalid Resume File.');
    };

    const loadFile: ChangeEventHandler<HTMLInputElement> = async (e) => {
        const files = e.target.files;
        const file = files?.length ? files[0] : undefined;
        if (!file) {
            showErrorMsg();
            return;
        }

        const mimeType = file.type;
        if (mimeType !== 'application/json') {
            parseResumeFile(file);
            return;
        }

        const contents = await file.text();
        try {
            const result = resumeValidator.safeParse(JSON.parse(contents));
            if (!result.success) {
                console.error(result.error);
                showErrorMsg();
                return;
            }
            const resume: Resume = result.data;
            setResume(resume);
            window.location.reload();
        } catch (e) {
            console.error(e);
            showErrorMsg();
            return;
        }
    };

    return (
        <>
            <label
                htmlFor='load-resume'
                className='btn btn-main btn-success'
            >
                Load Resume JSON
            </label>
            <input
                type='file'
                className='hidden'
                accept='.json, .txt, .html, .doc, .docx, .pdf'
                name='import-resume'
                id='load-resume'
                onChange={loadFile}
            />
        </>
    );
}
