import type Togglable from "@/lib/togglable";
import { useState } from "react";

type ToggleFieldProps<P, F extends keyof P> = {
  parent: P;
  fieldName: F & string;
  togglable: Togglable<P[F]>;
  setParent: (parent: P) => void;
  indent?: number; // Optional indentation for nested fields
};

type ToggleListProps<P> = {
  parent: P,
  setParent: (parent: P) => void,
}

const ToggleLabels: Record<string, string> = {
  workExperience: "Work Experience",
  personalProjects: "Personal Projects",
};

export function TogglableListElement<P extends Togglable<Togglable<unknown>[]>>(props: ToggleListProps<P>) {
  const { parent, setParent } = props;

  const toggleAtIndex = (index: number) => {
    const toggles = parent.val as P['val'];
    const oldToggle: Togglable<unknown> = toggles[index];
    const newToggle: Togglable<unknown> = {
      ...oldToggle,
      isOn: !oldToggle.isOn
    };
    toggles[index] = newToggle;
    const newParent: P = {
      ...parent,
      val: toggles
    } as P;
    setParent(newParent);
  }

  return <ul className='list-none'>
    {parent.val.map((toggle, idx) => {
      return <li key={`toggle-${idx}`}>
        <input type="checkbox"
          checked={toggle.isOn}
          onChange={() => { toggleAtIndex(idx) }} />
        <label className='ml-1'>{toggle.title}</label>
      </li>
    })}
  </ul>
}

export default function ToggleField<P, F extends keyof P>(props: ToggleFieldProps<P, F>) {
  const { parent, togglable, fieldName, setParent, indent = 0 } = props;

  const [currTogglable, $setCurrentTogglable] = useState<Togglable<P[F]>>(togglable);

  const setCurrentTogglable = (updatedTogglable: Togglable<P[F]>) => {
    $setCurrentTogglable(updatedTogglable);

    const updatedParent = {
      ...parent,
      [fieldName]: updatedTogglable,
    };

    setParent(updatedParent);
  };

  const toggleField = () => {
    const updatedTogglable: Togglable<P[F]> = {
      ...currTogglable,
      isOn: !currTogglable.isOn,
    };

    setCurrentTogglable(updatedTogglable);
  };

  return (
    <>
      <div style={{ marginLeft: `${indent}em` }}>
        <input
          id={`toggle-field-${fieldName}`}
          type="checkbox"
          checked={currTogglable.isOn}
          onChange={toggleField}
        />
        <label className="font-bold ml-2 capitalize">
          {togglable.title}
        </label>
      </div>

      {/* Render nested fields if currTogglable.val is a TogglableList */}
      {Array.isArray(currTogglable.val) && <TogglableListElement parent={togglable} setParent={setCurrentTogglable} />}

    </>
  );
}

