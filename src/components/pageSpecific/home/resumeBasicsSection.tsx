import Resume, { ResumeBasics } from "@/lib/resume"
import ResumeInputSection, { ResumeInputSectionProps } from "./resumeInputSection"
import { lazy, useState } from "react";
import ResumeStringSetter from "./resumeStringSetter";

export default function ResumeBasicsSection(props: ResumeInputSectionProps){
    
    const {resume, setResume} = props;

    const defaultBasics: ResumeBasics = resume.basics;

    const setBasics = (basics: ResumeBasics) => {
        setResume({
            ...resume,
            basics
        });
    }

    type StringField = keyof ResumeBasics & string;
    function BasicsStringSetter(props: {fieldName: StringField, label?: string}){
        const {fieldName, label} = props;
        return <ResumeStringSetter<ResumeBasics>
                    parent={defaultBasics}
                    fieldName={fieldName}
                    defaultVal={defaultBasics[fieldName] as string}
                    setParent={setBasics}
                    label={label}
                />
    }

    return <ResumeInputSection title="Basics">
        <BasicsStringSetter fieldName="name"/>
        <BasicsStringSetter fieldName="email"/>
        <BasicsStringSetter fieldName="phone"/>
        <BasicsStringSetter fieldName="url" label="URL"/>
    </ResumeInputSection>
}