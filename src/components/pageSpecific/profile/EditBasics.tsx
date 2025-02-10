import Resume, { Profile, ResumeBasics } from "@/lib/jsonResume"
import { useState } from "react";
import { Location } from "@/lib/jsonResume";
import EditList, { ListItem, ListItemProps } from "@/components/EditList";
import EditableText from "@/components/EditableText";
import { stringAt } from "pdfkit/js/data";

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
      onClick={() => {onSave()}}
    >Save</button>
  </label>


}

type EditBasicsProps = {
  resume: Resume,
  setResume: ResumeSetter
};

const EditProfile: ListItem<Profile> = (props: ListItemProps<Profile>) => {
  const { val, vals, idx, setList, confirmThenRemove } = props;

  const [profile, setCurrProfile] = useState<Profile>(val);
  const [network, $setNetwork] = useState<string>(profile.network);
  const [url, $setURL] = useState<string>(profile.url);

  const setNetwork = (newNetwork: string) => {
    $setNetwork(network);
    setCurrProfile({
      ...profile,
      network: newNetwork
    });
  }

  const setURL = (url: string) => {
    $setURL(url);
    setCurrProfile({
      ...profile,
      url
    });
  }

  const updateResume = () => {
    const updatedChildren = [
      ...vals,
    ];
    updatedChildren[idx] = profile;
    setList(updatedChildren);
  }

  return <div>
    <h3
      className='mt-0'
    >{val.network} <button className='btn btn-xs btn-error'
      onClick={() => { confirmThenRemove() }}
    >Remove</button></h3>
    <div className='flex'>
      <EditField
        defaultValue={network}
        placeholder='Network / Site Name'
        onChange={setNetwork}
        onSave={updateResume}
      />
      <EditField
        defaultValue={url}
        placeholder='URL'
        onChange={setURL}
        onSave={updateResume}
      />
    </div>


  </div>
}

const EditLocation = (props: EditBasicsProps) => {
  const { resume, setResume } = props;

  function updateLocation(fieldName: keyof Location, newVal: string) {
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

    <div className='flex flex-wrap gap-y-4'>
      <EditField defaultValue={city || ''}
        placeholder='City'
        onChange={setCity}
        onSave={() => { updateLocation('city', city || '') }}
      />

      <EditField defaultValue={region || ''}
        placeholder='Region / State'
        onChange={setRegion}
        onSave={() => { updateLocation('region', region || '') }}
      />

      <EditField defaultValue={countryCode || ''}
        placeholder='Country Code'
        onChange={setCode}
        onSave={() => { updateLocation('countryCode', countryCode || '') }}
      />

    </div>
  </div>
}

type EditSimpleFieldProps<F extends string & keyof Resume['basics']> = {
	resume: Resume,
	setResume: (resume: Resume) => void,
	fieldName: F,
	label: string
}

function EditSimpleBasicField<F extends string & keyof Resume['basics']>(
	props: EditSimpleFieldProps<F>
){
	const {resume, setResume, fieldName, label} = props;
  const initVal = resume['basics'][fieldName] || '';
	if(typeof(initVal) != 'string'){
		throw('Resume basic fields need to be strings');
	}

	const [currVal, dispatchVal] = useState<string>(initVal);
	const setVal = (newVal: string) => {
		dispatchVal(newVal);
		setResume({
			...resume,
			[fieldName]: newVal
		});
	}
	return <EditableText
						defaultVal={currVal}
						dispatch={setVal}
						label={label}
					/>
}

export default function EditBasics(props: EditBasicsProps) {
  const { resume, setResume } = props;
  const [profiles, $setProfiles] = useState<Profile[]>(resume.basics?.profiles || []);
  const setProfiles = (profiles: Profile[]) => {
    $setProfiles(profiles);
    setResume({
      ...resume,
      basics: {
        ...resume.basics,
        profiles
      }
    })
  }

  return <div role="tabpanel" className='mt-4'>
    <h2>Edit Basics</h2>
    <div className='flex flex-wrap gap-y-4 gap-x-12'>
      <EditSimpleBasicField resume={resume}
        setResume={setResume}
        fieldName='name'
        label='Full Name'
			/>

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
    <EditList<Profile>
      vals={profiles}
      setList={setProfiles}
      RenderItem={EditProfile}
      addBtnText='Add Profile'
      defaultChild={{
        network: '',
        url: ''
      }}
    />
  </div>
}
