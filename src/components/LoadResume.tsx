'use client';
import type Resume from '@/lib/jsonResume';
import resumeValidator from '@/lib/validators/jsonResume';
import type { ChangeEventHandler } from 'react';
import toast from 'react-hot-toast';
import LoadingSpinner from './LoadingSpinner';

type LoadResumeProps = {
    setResume: (newResume: Resume) => void;
    isLoadingResume: boolean;
    setIsLoadingResume: (isNowLoading: boolean) => unknown;
};

export async function parseResumeFile(file: File){
    const formData = new FormData();
    formData.append('resume', file);
    return await fetch('/api/parse_resume', {
        method: 'POST',
        body: formData,
    }).then(async (resp) => {
        const resume = await resp.json();
        return resume;
    }).catch((err) => {
        console.error('Error parsing resume file:', err);
});
}

export default function LoadResume(props: LoadResumeProps) {
    const { isLoadingResume, setIsLoadingResume, setResume } = props;

    const showErrorMsg = () => {
        toast('Invalid Resume File.');
    };

    const loadFile: ChangeEventHandler<HTMLInputElement> = async (e) => {
        const files = e.target.files;
        const file = files?.length ? files[0] : undefined;
        setIsLoadingResume(true);
        if (!file) {
            showErrorMsg();
            setIsLoadingResume(false);
            return;
        }

        const mimeType = file.type;
        if (mimeType !== 'application/json') {
            const {resume} = await parseResumeFile(file);
            setIsLoadingResume(false);
            setResume(resume);
            window.location.reload();
            return;
        }

        const contents = await file.text();
        try {
            const result = resumeValidator.safeParse(JSON.parse(contents));
            if (!result.success) {
                console.error(result.error);
                showErrorMsg();
                setIsLoadingResume(false);
                return;
            }
            const resume: Resume = result.data;
            setResume(resume);
            setIsLoadingResume(false);
            window.location.reload();
        } catch (e) {
            console.error(e);
            setIsLoadingResume(false);
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
                {isLoadingResume ? <LoadingSpinner className='w-24 h-12'/> : "Load Resume"}
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
