import { useContext, useState } from 'react';
import ResumeContext from './ResumeContext';
import ResumeConfigureModal from './ResumeConfigureModal';
import ResumeConfigureSection from './ResumeConfigureSection';
import { document } from 'pdfkit/js/page';
import { Profile } from '../../../lib/jsonResume';

export default function ToggleList() {
    const [activeSection, setActiveSection] = useState(
        ResumeConfigureSection.Basics,
    );

    const [modalIsOpen, setModalIsOpen] = useState(false);

    type ModalTriggerProps = {
        section: ResumeConfigureSection;
    } & React.ButtonHTMLAttributes<HTMLButtonElement>;

    const ModalTrigger = (props: ModalTriggerProps) => {
        const { children, section, ...rest } = props;
        return (
            <button
                type='button'
                onClick={() => {
                    setActiveSection(section);
                    setModalIsOpen(true);
                }}
                {...rest}
            >
                {children}
            </button>
        );
    };

    return (
        <div className='flex flex-col'>
            <ResumeConfigureModal
                activeSection={activeSection}
                isOpen={modalIsOpen}
                setIsOpen={setModalIsOpen}
            />
            <ModalTrigger
                section={ResumeConfigureSection.Basics}
                className='btn btn-primary mt-4'
            >
                Edit Basics
            </ModalTrigger>

            <ModalTrigger
                section={ResumeConfigureSection.Education}
                className='btn btn-primary mt-4'
            >
                Edit Education
            </ModalTrigger>
            <ModalTrigger
                section={ResumeConfigureSection.Profiles}
                className='btn btn-primary mt-4'
            >
                Edit Profiles
            </ModalTrigger>
            <ModalTrigger
                section={ResumeConfigureSection.Projects}
                className='btn btn-primary mt-4'
            >
                Edit Projects
            </ModalTrigger>
            <ModalTrigger
                section={ResumeConfigureSection.Skills}
                className='btn btn-primary mt-4'
            >
                Edit Skills
            </ModalTrigger>
            <ModalTrigger
                section={ResumeConfigureSection.Work}
                className='btn btn-primary mt-4'
            >
                Edit Work
            </ModalTrigger>
        </div>
    );
}
