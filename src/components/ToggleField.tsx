import type Togglable from "@/lib/togglable";
import { useState } from "react";
import { togglable } from '../lib/togglable';

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
      {currTogglable.children && currTogglable.children.map((togglable, idx) => {
        return <ToggleChildField
          togglable={currTogglable}
          index={idx}
          setTogglable={setCurrentTogglable}
          indent={indent + 1}
          key={`togglable-${idx}`}
        />
      })}

    </>
  );
}

type ToggleChildFieldProps<C> = {
  togglable: Togglable<unknown, C>,
  index: number,
  setTogglable: CallableFunction,
  indent: number
}

function ToggleChildField<C>(props: ToggleChildFieldProps<C>) {
  const { indent, togglable, setTogglable, index } = props;

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
      <input
        type="checkbox"
        checked={togglable.children?.[index]?.isOn || false}
        onChange={toggleField}
      />
      <label className="font-bold ml-2 capitalize">
        {togglable.children?.[index]?.title || "Unnamed"}
      </label>
      {subchildren.map((subchild, index) => {
        return <ToggleChildField key={`togglable-${index}`}
          togglable={child}
          setTogglable={setChild}
          indent={indent + 1}
          index={index}
        />
      })}
    </div>
  );
}
