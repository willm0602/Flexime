import Resume, { Profile, ResumeBasics } from "@/lib/jsonResume"
import { useState } from "react";
import { Location } from "@/lib/jsonResume";
import EditList, { ListItem, ListItemProps } from "@/components/EditList";

type ResumeSetter = (resume: Resume) => void

type EditFieldProps = {
  defaultValue: string,
  placeholder: string,
  onChange: CallableFunction,
  onSave: CallableFunction
}

const EditField = (props: EditFieldProps) => {
  const { defaultValue, placeholder, onChange, onSave } = props;

  return <label className='input input-bordered flex items-center gap-2 max-w-fit mr-4'>
    <input type="text"
      defaultValue={defaultValue}
      placeholder={placeholder}
      onChange={(e) => { onChange(e.target.value) }}
    />
    <button className='btn btn-xs btn-primary'
      onClick={onSave}
    >Save</button>
  </label>


}

type EditBasicsProps = {
  resume: Resume,
  setResume: ResumeSetter
};

const EditSimpleBasicField = (props: EditBasicsProps & { fieldName: keyof Resume['basics'] & string, label?: string }) => {
  const { resume, setResume, fieldName, label } = props;
  const initVal = resume.basics[fieldName] as string;
  const [currVal, setCurrVal] = useState(initVal);

  const updateResume = () => {
    const basics = resume.basics;
    basics[fieldName] = currVal;
    setResume({
      ...resume,
      basics
    })

  }

  return <label className='input input-bordered flex items-center gap-2 max-w-fit mr-4'>
    <input type="text"
      defaultValue={currVal}
      placeholder={label || fieldName}
      onChange={(e) => { setCurrVal(e.target.value) }}
    />
    <button className='btn btn-xs btn-primary'
      onClick={updateResume}
    >Save</button>

  </label>

}

const EditProfile: ListItem<ResumeBasics, Profile> = (props: ListItemProps<ResumeBasics, Profile>) => {
  const { val, idx, parent, setParent, fieldName } = props;

  const [currVal, setCurrVal] = useState(val);

  const updateResume = () => {
    const newParent: typeof parent = parent;
    newParent[fieldName][idx] = currVal;
    setParent(newParent);
  }
  return <div>
    <h3>{val.network}</h3>
    <EditField
      defaultValue={currVal.network}
      placeholder='Network / Site Name'
      onChange={setCurrVal}
      onSave={updateResume}
    />


  </div>
}

const EditLocation = (props: EditBasicsProps) => {
  const { resume, setResume } = props;

  function updateLocation<T extends keyof Resume['basics']['location'], V extends Resume['basics']['location'][T]>(fieldName: T, newVal: V) {
    const updatedLocation: Location = {
      ...resume.basics.location
    };
    updatedLocation[fieldName] = newVal;
    const updatedResume: Resume = {
      ...resume,
      basics: {
        ...resume.basics,
        location: updatedLocation
      }
    };
    setResume(updatedResume);
  }

  const [city, setCity] = useState(resume.basics.location?.city);
  const [region, setRegion] = useState(resume.basics.location?.region);
  const [countryCode, setCode] = useState(resume.basics.location?.countryCode);

  return <div>
    <h2>Location</h2>

    <div className='flex flex-wrap'>
      <EditField defaultValue={city || ''}
        placeholder='City'
        onChange={setCity}
        onSave={() => { updateLocation('city', city) }}
      />

      <EditField defaultValue={region || ''}
        placeholder='Region / State'
        onChange={setRegion}
        onSave={() => { updateLocation('region', region) }}
      />

      <EditField defaultValue={countryCode || ''}
        placeholder='Country Code'
        onChange={setCode}
        onSave={() => { updateLocation('countryCode', countryCode) }}
      />

    </div>
  </div>
}

export default function EditBasics(props: EditBasicsProps) {
  const { resume, setResume } = props;
  const [basics, $setBasics] = useState(resume.basics);

  const setBasics = (newBasics: ResumeBasics) => {
    const updatedResume: Resume = {
      ...resume,
      basics: newBasics
    };

    setResume(updatedResume);
    $setBasics(newBasics)
  }

  return <div role="tabpanel" className='mt-4'>
    <h1>Edit Basics</h1>
    <div className='flex flex-wrap gap-y-4'>
      <EditSimpleBasicField resume={resume}
        setResume={setResume}
        fieldName='name'
        label='Full Name' />

      <EditSimpleBasicField resume={resume}
        setResume={setResume}
        fieldName='label'
        label='Title / Label' />

      <EditSimpleBasicField resume={resume}
        setResume={setResume}
        fieldName='email'
        label='Email' />

      <EditSimpleBasicField resume={resume}
        setResume={setResume}
        fieldName='phone'
        label='Phone Number' />

      <EditSimpleBasicField resume={resume}
        setResume={setResume}
        fieldName='summary'
        label='Summary' />
    </div>

    <EditLocation resume={resume}
      setResume={setResume}
    />

    <h2>Profiles</h2>
    <EditList<ResumeBasics, Profile, Profile[]>
      vals={basics.profiles}
      parent={basics}
      fieldName='profiles'
      setParent={setBasics}
      RenderItem={EditProfile}
      defaultChild={{
        network: '',
        url: ''
      }}
    />
  </div>
}
