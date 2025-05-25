import { useContext } from "react";
import JSONResumeContext from "./JSONResumeContext";
import EditList, { type ListItem } from "@/components/EditList";
import type { Publication } from "@/lib/jsonResume";
import EditableText from "@/components/EditableText";
import EditDate from "@/components/EditDate";
import EditableTextArea from "@/components/EditableTextArea";

const EditPublication: ListItem<Publication> = ({val, setItem}) => {
    return <div>
        <h2>{val.name}</h2>
        <div className="flex items-center gap-8">
        <EditableText
            defaultVal={val.name}
            dispatch={(name) => {
                setItem({
                    ...val,
                    name
                })
            }}
            label="Edit Title"
            />
        <EditDate
            defaultDate={val.releaseDate}
            dispatch={(releaseDate) => {
                setItem({
                    ...val,
                    releaseDate
                })
            }}
            label="Release Date"
        />
        <EditableText
            defaultVal={val.url}
            dispatch={(url) => {
                setItem({
                    ...val,
                    url
                })
            }}
            label="Edit URL"
        />
        </div>
        <EditableTextArea
            defaultVal={val.summary}
            dispatch={(summary) => {setItem({
                ...val,
                summary
            })}}
            label="Summary"
            width={40}
            height={5}
            className="mt-4"
        />
    </div>
}

export default function EditPublications(){
    const {resume, setResume} = useContext(JSONResumeContext);
    return <EditList
        vals={resume.publications || []}
        setList={(publications) => {
            setResume({
                ...resume,
                publications
            })
        }}
        RenderItem={EditPublication}
        defaultChild={{
            name: 'Untitled Publication',
            releaseDate: (new Date()).toISOString(),
            url: '',
            summary: ''
        }}
    />
}