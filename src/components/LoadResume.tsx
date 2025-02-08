'use client';
import Resume from "@/lib/jsonResume";
import { DEFAULT_RESUME } from "@/lib/resumeUtils";
import { ChangeEventHandler, Dispatch } from "react";
import toast from "react-hot-toast";

type LoadResumeProps = {
    setResume: (newResume: Resume) => void,
}

function verifyResume(resumeContents: string): Resume{
    try{
        const resume = JSON.parse(resumeContents);
        return {
            basics: resume.basics || {
                name: 'Name',
                label: '',
                email: '',
                phone: '',
                profiles: [],
            },
            work: resume.work || [],
            volunteer: resume.volunteer || [],
            education: resume.education || [],
            awards: resume.awards || [],
            publications: resume.publications || [],
            skills: resume.skills || [],
            projects: resume.projects || []
        };
    } catch {
        return DEFAULT_RESUME;
    }
}

export default function LoadResume(props: LoadResumeProps){
    const {setResume} = props;

    const showErrorMsg = () => {
        toast('Invalid Resume File.')
    }

    const loadFile: ChangeEventHandler<HTMLInputElement> = async (e) => {
        const files = e.target.files;
        const file = files?.length ? files[0] : undefined;
        if(!file){
            showErrorMsg();
            return;
        }
        const contents = await file.text();
        try{
            const resume = verifyResume(contents);
            if(!resume){
                showErrorMsg();
                return;                
            }
            setResume(resume);
            window.location.reload();
        } catch(e){
            console.error(e);
            showErrorMsg();
            return;
        }

    }

    return <>
        <label htmlFor="load-resume"
               className="btn btn-main btn-success ml-4"
        >Load Resume</label>
        <input type="file"
               className="hidden"
               accept=".json"
               name="import-resume"
               id="load-resume"
               onChange={loadFile}
        />
    </>
}