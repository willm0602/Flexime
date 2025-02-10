import type Togglable from "@/lib/togglable";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { ChevronUpIcon } from '@heroicons/react/24/solid';

type ToggleFieldProps<P, F extends keyof P, C> = {
  parent: P;
  fieldName: F & string;
  togglable: Togglable<P[F], C>;
  setParent: (parent: P) => void;
  indent?: number; // Optional indentation for nested fields
};  


export default function ToggleField<P, F extends keyof P, C = unknown>(props: ToggleFieldProps<P, F, C>) {
  const { parent, togglable, fieldName, setParent, indent = 0 } = props;
  const [currTogglable, $setCurrentTogglable] = useState<Togglable<P[F], C>>(togglable);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const setCurrentTogglable = (updatedTogglable: Togglable<P[F]>) => {
    $setCurrentTogglable(updatedTogglable);

    const updatedParent = {
      ...parent,
      [fieldName]: updatedTogglable,
    };

    setParent(updatedParent);
  };

  const toggleField = () => {
    const updatedTogglable: Togglable<P[F], C> = {
      ...currTogglable,
      isOn: !currTogglable.isOn,
    };

    setCurrentTogglable(updatedTogglable);
  };

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <>
      <div style={{ marginLeft: `${indent}em`}} className="flex">
        <input
          id={`toggle-field-${fieldName}`}
          type="checkbox"
          checked={currTogglable.isOn}
          onChange={toggleField}
        />
        <label className="font-bold ml-2 capitalize flex flex-1 cursor-pointer" onClick={toggleField}>{togglable.title}</label>
        <button
          onClick={toggleCollapsed}
          type="button"
        >{currTogglable.children && (isCollapsed ? <ChevronDownIcon width={24} height={24}/> : <ChevronUpIcon width={24} height={24}/>)}</button>
      </div>

      {/* Render nested fields if currTogglable.val is a TogglableList */}
      <div className={isCollapsed ? 'hidden' : ''}>
        {currTogglable.children && currTogglable.children.map((togglable, idx) => {
          return <ToggleChildField
            togglable={currTogglable}
            index={idx}
            setTogglable={setCurrentTogglable}
            indent={indent + 1}
            fieldName={fieldName}
            key={`togglable-${idx}`}
            />
          })}
      </div>

    </>
  );
}

type ToggleChildFieldProps<C> = {
  togglable: Togglable<unknown, C>,
  index: number,
  setTogglable: CallableFunction,
  indent: number,
  fieldName: string,
}

function ToggleChildField<C>(props: ToggleChildFieldProps<C>) {
  const { indent, togglable, setTogglable, index, fieldName } = props;
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  function toggleIsCollapsed(){
    setIsCollapsed(!isCollapsed);
  }

  const toggleField = () => {
    const childToUpdate = (togglable.children || [])[index];
    childToUpdate.isOn = !childToUpdate.isOn;
    const children = togglable.children || [];
    children[index] = childToUpdate;
    const updatedTogglable: Togglable<unknown, C> = {
      ...togglable,
      children
    };
    setTogglable(updatedTogglable);
  }

  const setChild = (child: Togglable<C>) => {
    const children = togglable.children || [];
    const updatedChildren = children;
    updatedChildren[index] = child;
    const updatedTogglable = {
      ...togglable,
      children: updatedChildren
    };
    setTogglable(updatedTogglable);
  }

  const child = (togglable.children || [])[index];
  const subchildren = child.children || [];

  return (
    <div style={{ marginLeft: `${indent / 2}em` }}>
      <div className="flex">
        <input
          type="checkbox"
          checked={togglable.children?.[index]?.isOn || false}
          onChange={toggleField}
          id={`toggle-field-${fieldName}-${index}`}
        />
        <label className="font-bold ml-2 capitalize flex flex-1 cursor-pointer"
               htmlFor={`toggle-field-${fieldName}-${index}`}
        >{togglable.children?.[index]?.title}</label>
        <button type="button" onClick={toggleIsCollapsed}>{(subchildren.length > 0) && (isCollapsed ? <ChevronDownIcon width={24} height={24}/> : <ChevronUpIcon width={24} height={24}/>)}</button>
      </div>
      <div className={isCollapsed ? 'hidden' : ''}>
        {subchildren.map((subchild, subindex) => {
          return <ToggleChildField key={`togglable-${subindex}`}
          togglable={child}
          fieldName={`${fieldName}-${index}-${subindex}`}
          setTogglable={setChild}
            indent={indent + 1}
            index={subindex}
            />
          })}
      </div>
    </div>
  );
}
