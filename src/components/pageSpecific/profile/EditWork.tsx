import EditList, { ListItem, ListItemProps } from "@/components/EditList";
import Resume, { Work } from "@/lib/jsonResume";
import { useState } from "react";

type EditWorkProps = {
  resume: Resume,
  setResume: (newResume: Resume) => void
}

const EditHighlight: ListItem<string> = (props: ListItemProps<string>) => {
  const { val, vals, setList, idx } = props;
  const [highlight, $setHighlight] = useState(val);

  const setHighlight = (newHighlight: string) => {
    $setHighlight(newHighlight);
    const updatedVals = [...vals];
    updatedVals[idx] = newHighlight;
    setList(updatedVals);
  }

  const confirmThenRemove = () => {
    const wasRemoved = props.confirmThenRemove();
    if (wasRemoved) {
      const updatedVals = vals.filter((_, i) => idx != i);
      setList(updatedVals);
    }
  }

  return <div className='w-full'>
    <input defaultValue={highlight} className='input input-bordered w-full' onChange={(e) => {
      setHighlight(e.target.value);
    }} />
    <div className='flex mt-4'>
      <button className='btn btn-xs btn-error' onClick={confirmThenRemove}>Remove</button>
    </div>
  </div>
}

const EditPosition: ListItem<Work> = (props: ListItemProps<Work>) => {
  const { val, vals, setList, idx } = props;
  const [position, setPosition] = useState<Work>(val);
  const [companyName, setCompanyName] = useState<string>(position.name);
  const [positionName, setPositionName] = useState<string>(position.position);
  const [highlights, $setHighlights] = useState<string[]>(position.highlights);

  const saveWork = () => {
    const updatedWork: Work = {
      ...position,
      name: companyName,
      position: positionName,
      highlights
    };
    setPosition(updatedWork);
    const updatedPositions = [...vals];
    updatedPositions[idx] = updatedWork;
    setList(updatedPositions);
  }

  const setHighlights = (highlights: string[]) => {
    $setHighlights(highlights);
    saveWork();
  }

  const confirmThenRemove = () => {
    const wasRemoved = props.confirmThenRemove();
    if (wasRemoved)
      saveWork();
  }

  return <div className='w-full'>
    <h2 className='mt-0 mb-2'>{position.name} ({position.position})
      <button className='btn btn-xs btn-error ml-4' onClick={confirmThenRemove}>Remove</button>
      <button className='btn btn-xs btn-primary ml-4' onClick={saveWork}>Save</button>
    </h2>
    <div className='flex'>
      <div className='flex flex-col'>
        <label className='font-bold'>Company Name</label>
        <input type="text"
          className='input input-bordered mr-4'
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder='Company Name'
          defaultValue={companyName}
        />
      </div>
      <div className='flex flex-col'>
        <label className='font-bold'>Position</label>
        <input type="text"
          className='input input-bordered mr-4'
          onChange={(e) => setPositionName(e.target.value)}
          placeholder='Position Title'
          defaultValue={positionName}
        />
      </div>
      <div className='flex flex-col mr-4'>
        <label className='font-bold'>Start Date</label>
        <input type="date"
          defaultValue={position.startDate}
          placeholder='Start Date'
          className='input'
        />
      </div>
      <div className='flex flex-col'>
        <label className='font-bold'>End Date</label>
        <input type="date"
          defaultValue={position.endDate}
          placeholder='Start Date'
          className='input'
        />
      </div>

    </div>
    <h2>Edit Highlights</h2>
    <EditList<string>
      vals={highlights}
      setList={(highlights: string[]) => { setHighlights(highlights) }}
      RenderItem={EditHighlight}
      defaultChild=''
      addBtnText='Add Highlight'
    />
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
      addBtnText='Add Job'
      defaultChild={{
        name: 'Untitled Company',
        position: resume.basics.label || 'Job',
        startDate: '',
        highlights: []
      }}
    />
  </div>
}
