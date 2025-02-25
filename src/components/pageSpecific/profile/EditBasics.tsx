import Resume, { Profile } from '@/lib/jsonResume'
import { useState } from 'react'
import { Location } from '@/lib/jsonResume'
import EditList, { ListItem, ListItemProps } from '@/components/EditList'
import EditableText from '@/components/EditableText'
import EditLocation from '@/components/EditLocation'

type ResumeSetter = (resume: Resume) => void

type EditFieldProps = {
    defaultValue: string
    placeholder: string
    onChange: CallableFunction
    onSave: CallableFunction
}

const EditField = (props: EditFieldProps) => {
    const { defaultValue, placeholder, onChange, onSave } = props

    return (
        <label className="input input-bordered flex items-center gap-2 max-w-fit mr-4">
            <input
                type="text"
                defaultValue={defaultValue}
                placeholder={placeholder}
                onChange={(e) => {
                    onChange(e.target.value)
                }}
            />
            <button
                className="btn btn-xs btn-primary"
                onClick={() => {
                    onSave()
                }}
            >
                Save
            </button>
        </label>
    )
}

type EditBasicsProps = {
    resume: Resume
    setResume: ResumeSetter
}

const EditProfile: ListItem<Profile> = (props: ListItemProps<Profile>) => {
    const { val, vals, idx, setList, removeItem } = props

    const [profile, setCurrProfile] = useState<Profile>(val)
    const [network, $setNetwork] = useState<string>(profile.network)
    const [url, $setURL] = useState<string>(profile.url)

    const setNetwork = (newNetwork: string) => {
        $setNetwork(network)
        setCurrProfile({
            ...profile,
            network: newNetwork,
        })
    }

    const setURL = (url: string) => {
        $setURL(url)
        setCurrProfile({
            ...profile,
            url,
        })
    }

    const updateResume = () => {
        const updatedChildren = [...vals]
        updatedChildren[idx] = profile
        setList(updatedChildren)
    }

    return (
        <div>
            <h3 className="mt-0">
                {val.network}{' '}
                <button
                    className="btn btn-xs btn-error mr-2"
                    onClick={() => {
                        removeItem()
                    }}
                >
                    Remove
                </button>
            </h3>
            <div className="flex max-w-full flex-wrap gap-y-4">
                <EditField
                    defaultValue={network}
                    placeholder="Network / Site Name"
                    onChange={setNetwork}
                    onSave={updateResume}
                />
                <EditField
                    defaultValue={url}
                    placeholder="URL"
                    onChange={setURL}
                    onSave={updateResume}
                />
            </div>
        </div>
    )
}

type EditSimpleFieldProps<F extends string & keyof Resume['basics']> = {
    resume: Resume
    setResume: (resume: Resume) => void
    fieldName: F
    label: string
}

function EditSimpleBasicField<F extends string & keyof Resume['basics']>(
    props: EditSimpleFieldProps<F>
) {
    const { resume, setResume, fieldName, label } = props
    const initVal = resume['basics'][fieldName] || ''
    if (typeof initVal != 'string') {
        throw 'Resume basic fields need to be strings'
    }

    const [currVal, dispatchVal] = useState<string>(initVal)
    const setVal = (newVal: string) => {
        dispatchVal(newVal)
        setResume({
            ...resume,
            basics: {
                ...resume.basics,
                [fieldName]: newVal,
            },
        })
    }
    return <EditableText defaultVal={currVal} dispatch={setVal} label={label} />
}

export default function EditBasics(props: EditBasicsProps) {
    const { resume, setResume } = props
    const [profiles, $setProfiles] = useState<Profile[]>(
        resume.basics?.profiles || []
    )
    const setProfiles = (profiles: Profile[]) => {
        $setProfiles(profiles)
        setResume({
            ...resume,
            basics: {
                ...resume.basics,
                profiles,
            },
        })
    }

    return (
        <div role="tabpanel" className="mt-4">
            <h2>Edit Basics</h2>
            <div className="flex flex-wrap gap-y-4 gap-x-12">
                <EditSimpleBasicField
                    resume={resume}
                    setResume={setResume}
                    fieldName="name"
                    label="Full Name"
                />

                <EditSimpleBasicField
                    resume={resume}
                    setResume={setResume}
                    fieldName="label"
                    label="Title / Label"
                />

                <EditSimpleBasicField
                    resume={resume}
                    setResume={setResume}
                    fieldName="email"
                    label="Email"
                />

                <EditSimpleBasicField
                    resume={resume}
                    setResume={setResume}
                    fieldName="phone"
                    label="Phone Number"
                />

                <EditSimpleBasicField
                    resume={resume}
                    setResume={setResume}
                    fieldName="summary"
                    label="Summary"
                />
            </div>

            <h2 className="mb-0">Edit Location</h2>
            <EditLocation
                onLocationSet={(newLocation: Location) => {
                    setResume({
                        ...resume,
                        basics: {
                            ...resume.basics,
                            location: newLocation,
                        },
                    })
                }}
                placeholder="Edit Location"
                val={resume.basics.location}
            />

            <h2>Profiles</h2>
            <EditList<Profile>
                vals={profiles}
                setList={setProfiles}
                RenderItem={EditProfile}
                addBtnText="Add Profile"
                defaultChild={{
                    network: '',
                    url: '',
                }}
            />
        </div>
    )
}
