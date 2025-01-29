import EditList, { ListItem, ListItemProps } from "@/components/EditList";
import Resume, { Work } from "@/lib/jsonResume";
import { useState } from "react";

type EditWorkProps = {
  resume: Resume,
  setResume: (newResume: Resume) => void
}

const EditPosition: ListItem<Work> = (props: ListItemProps<Work>) => {
  const { val, vals, setList, idx } = props;
  const [position, $setPosition] = useState<Work>(val);
  const [companyName, setCompanyName] = useState<string>(position.name);
  const [positionName, setPositionName] = useState<string>(position.position);

  const setPosition = (position: Work) => {
    $setPosition(position);
    const updatedChildren = [...vals];
    updatedChildren[idx] = position;
    setList(updatedChildren);
  }

  return <div>
    <h2 className='mt-0 mb-2'>{position.name}</h2>
    <div className='flex'>
      <input type="text"
        className='input input-bordered mr-4'
        onChange={(e) => setCompanyName(e.target.value)}
        placeholder='Company Name'
        defaultValue={companyName}
      />
      <input type="text"
        className='input input-bordered'
        onChange={(e) => setPositionName(e.target.value)}
        placeholder='Position Title'
        defaultValue={positionName}
      />
    </div>
  </div>
}

export default function EditWork(props: EditWorkProps) {
  const { resume, setResume } = props;
  const [work, $setWork] = useState(resume.work);

  const setWork = (newWork: Work[]) => {
    $setWork(newWork);
    setResume({
      ...resume,
      work: newWork
    })
  }

  return <div role="tabpanel" className="mt-12">
    <h1>Edit Work</h1>
    {/* TODO: update this in the future to use companies instead of individual positions */}
    <EditList
      vals={work}
      setList={setWork}
      RenderItem={EditPosition}
      defaultChild={{
        name: '',
        position: '',
        startDate: '',
        highlights: []
      }}
    />
  </div>
}
