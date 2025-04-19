import EditList, { type ListItem } from '@/components/EditList';
import type EditProfileProps from './EditProfileProps';
import type { Project } from '@/lib/jsonResume';
import TitleWithRemove from './TitleWithRemove';
import { useContext, useState } from 'react';
import EditableText from '@/components/EditableText';
import EditableTextArea from '@/components/EditableTextArea';
import JSONResumeContext from './JSONResumeContext';

const DefaultProject: Project = {
    name: 'Untitled Project',
    description: '',
    highlights: [],
};

const EditHighlight: ListItem<string> = (props) => {
    const { removeItem, setItem, val } = props;

    return (
        <>
            <EditableTextArea
                defaultVal={val}
                dispatch={setItem}
                label='Highlight'
                remove={removeItem}
                width={50}
                height={5}
            />
        </>
    );
};

const EditProject: ListItem<Project> = (props) => {
    const { removeItem, setItem } = props;
    const project = props.val;
    const [name, dispatchName] = useState<string>(project.name);

    const setHighlights = (newHighlights: string[]) => {
        setItem({
            ...project,
            highlights: newHighlights,
        });
    };

    const setName = (newName: string) => {
        setItem({
            ...project,
            name: newName,
        });
        dispatchName(newName);
    };

    const setURL = (url: string) => {
        setItem({
            ...project,
            url,
        });
    };

    const setSourceCode = (repository: string) => {
        setItem({
            ...project,
            repository,
        });
    };

    return (
        <>
            <TitleWithRemove title={name} remove={removeItem} />
            <div className='flex max-w-full flex-wrap'>
                <EditableText
                    className='mr-12'
                    defaultVal={name}
                    dispatch={setName}
                    label='Title'
                />
                <EditableText
                    className='mr-12'
                    defaultVal={project.url || ''}
                    dispatch={setURL}
                    label='Project URL'
                />
                <EditableText
                    className='mr-12'
                    defaultVal={project.repository || ''}
                    dispatch={setSourceCode}
                    label='Source Code'
                />
            </div>
            <EditList
                vals={project.highlights}
                setList={setHighlights}
                RenderItem={EditHighlight}
                defaultChild='Untitled Highlight'
                addBtnText='Add Highlight'
                containerClassName='mb-4'
                itemWrapperClass='mb-0 mt-2'
            />
        </>
    );
};

export default function EditProjects(props: EditProfileProps) {
    const {resume, setResume} = useContext(JSONResumeContext);
    const projects = resume.projects || [];

    const setProjects = (newProjects: Project[]) => {
        setResume({
            ...resume,
            projects: newProjects,
        });
    };
    return (
        <div role='tabpanel' className='mt-12'>
            <h2>Edit Projects</h2>
            <EditList
                vals={projects}
                setList={setProjects}
                RenderItem={EditProject}
                addBtnText='Add Project'
                defaultChild={DefaultProject}
            />
        </div>
    );
}
