import { useCallback, useState } from 'react';
import ResumeConfigureModal from './ResumeConfigureModal';
import ResumeConfigureSection from './ResumeConfigureSection';

const ConfigureSectionNames: Record<ResumeConfigureSection, string> = {
    [ResumeConfigureSection.Basics]: 'basics',
    [ResumeConfigureSection.Education]: 'education',
    [ResumeConfigureSection.Profiles]: 'profiles',
    [ResumeConfigureSection.Projects]: 'projects',
    [ResumeConfigureSection.Skills]: 'skills',
    [ResumeConfigureSection.Work]: 'work',
    [ResumeConfigureSection.Publications]: 'publications'
}

type ModalTriggerProps = {
  section: ResumeConfigureSection;
  setActiveSection: (s: ResumeConfigureSection) => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ModalTrigger = ({
  section,
  setActiveSection,
  children,
  ...rest
}: ModalTriggerProps) => {
  const open = useCallback(() => {
    setActiveSection(section);
    const dialog = document.getElementById(
      'resume-configure-modal'
    ) as HTMLDialogElement;
    dialog?.showModal();
  }, [section, setActiveSection]);

  return (
    <button type="button" onClick={open} {...rest}>
      {children}
    </button>
  );
};

export default function ToggleList() {
  const [activeSection, setActiveSection] = useState(
    ResumeConfigureSection.Basics
  );

  const sections = [
    ResumeConfigureSection.Basics,
    ResumeConfigureSection.Profiles,
    ResumeConfigureSection.Work,
    ResumeConfigureSection.Education,
    ResumeConfigureSection.Projects,
    ResumeConfigureSection.Skills,
    ResumeConfigureSection.Publications
  ];

  return (
    <div className="flex flex-col">
      <ResumeConfigureModal activeSection={activeSection} />

      {sections.map((section) => (
        <ModalTrigger
          key={section}
          section={section}
          setActiveSection={setActiveSection}
          className="btn btn-primary mt-4 capitalize"
        >
          Edit {ConfigureSectionNames[section]}
        </ModalTrigger>
      ))}
    </div>
  );
}
