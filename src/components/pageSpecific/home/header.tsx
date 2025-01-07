import Resume from "@/lib/resume";
import resumeIsValid from "@/lib/validateResume";
import { InformationCircleIcon } from "@heroicons/react/16/solid";
import { ChangeEventHandler } from "react";

type HomePageHeaderProps = {
    setResume: (resume: Resume) => void
}

export default function HomePageHeader(props: HomePageHeaderProps) {

    const {setResume} = props;

    const onResumeFileLoaded: ChangeEventHandler<HTMLInputElement> = (e) => {
        const files = e.target.files || [];
        if(files.length){
            const file: File = files[0];
            file.text().then((text) => {
                try{

                    const data = JSON.parse(text);
                    if(resumeIsValid(data)){
                        const resume = data as Resume;
                        console.log('UPDATING THE RESUME TO', resume);
                        setResume(resume);
                    } else{
                        console.error('Resume is not valid');
                    }
                } catch {
                    window.alert('file is invalid');
                }
            })
        }
    }

    return <>
        <h1 className="text-5xl">Your Best Self</h1>
        
        <label htmlFor="load-resume">Load in a JSON Resume</label>
        <div className="flex mb-12">
        <input type="file"
               id="load-resume"
               accept=".json"
               className="file-input file-input-bordered"
               onChange={onResumeFileLoaded}
        />
        <a target="_blank" href="https://jsonresume.org/" className="flex justify-center items-center ml-4">
            <InformationCircleIcon className="w-4 h-4 tooltip" data-tip="Learn about the JSON Resume format here"/>
        </a>
        </div>
    </>

}