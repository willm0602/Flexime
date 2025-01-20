import type Togglable from "@/lib/togglable";
import { useState } from "react";

type ToggleFieldProps<P, F extends keyof P> = {
  parent: P;
  fieldName: F;
  togglable: Togglable<F>;
  setParent: (parent: P) => void;
};

const ToggleLabels: Record<string, string> = {
  'workExperience': 'Work Experience',
  'personalProjects': 'Personal Projects'
}

export default function ToggleField<P, F extends keyof P & string>(props: ToggleFieldProps<P, F>) {
  const { parent, togglable, fieldName, setParent } = props;

  const [currTogglable, $setCurrentTogglable] = useState<Togglable<F>>(togglable);

  const setCurrentTogglable = (updatedTogglable: Togglable<F>) => {
    $setCurrentTogglable(updatedTogglable);

    const updatedParent = {
      ...parent,
      [fieldName]: updatedTogglable,
    };

    setParent(updatedParent);
  };

  const toggleField = () => {
    const updatedTogglable: Togglable<F> = {
      ...currTogglable,
      isOn: !currTogglable.isOn,
    };

    setCurrentTogglable(updatedTogglable);
  };

  return (<>
    <input
      id={`toggle-field-${fieldName}`}
      type="checkbox"
      checked={currTogglable.isOn}
      onChange={toggleField}
    />
    <label
      className='font-bold ml-2 capitalize'
    >{ToggleLabels[fieldName] || fieldName}</label>
  </>
  );
}

