import Resume from "@/lib/resume";
import React from "react";

export type ResumeInputSectionProps = {
    setResume: (resume: Resume) => void,
    resume: Resume
}

export default function ResumeInputSection(props: {title: string, children?: React.ReactElement | React.ReactElement[]}){
    const {children, title} = props;

    return <section className="border-2 border-y-2 border-x-0 pb-8">
        <h2 className="my-4">{title}</h2>
        <div className="flex w-full flex-wrap gap-y-4">
            {children}
        </div>
    </section>
}