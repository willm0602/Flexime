import { useContext } from "react";
import ResumeContext from "./ResumeContext";
import { jsonResumeFromResume } from "@/lib/resume";

export default function ResumeHiddenInput() {
    const { resume } = useContext(ResumeContext);

    const jsonResume = jsonResumeFromResume(resume);

    return (
        <input
            type='hidden'
            name='resume_data'
            value={JSON.stringify(jsonResume)}
        />
    );
}