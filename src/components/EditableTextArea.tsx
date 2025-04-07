import { type Dispatch, useState } from "react";

type EditableTextAreaProps = {
  defaultVal: string;
  dispatch: (val: string) => void;
  label: string;
  remove?: CallableFunction;
  className?: string;
  width: number;
  height: number;
};

export default function EditableText(props: EditableTextAreaProps) {
  const { defaultVal, dispatch, label, remove, className, width, height } =
    props;

  const [isInEditMode, dispatchEdit] = useState<boolean>(false);
  const [currVal, setVal] = useState(defaultVal);

  return (
    <div className={className}>
      {isInEditMode ? (
        <EditField
          val={currVal}
          setVal={setVal}
          dispatch={dispatch}
          label={label}
          dispatchEdit={dispatchEdit}
          width={width}
          height={height}
        />
      ) : (
        <EditFieldDisplay
          val={currVal}
          remove={remove}
          dispatchEdit={dispatchEdit}
          label={label}
        />
      )}
    </div>
  );
}

type EditFieldProps = {
  val: string;
  setVal: Dispatch<string>;
  dispatch: Dispatch<string>;
  dispatchEdit: Dispatch<boolean>;
  label: string;
  width: number;
  height: number;
};

function EditField(props: EditFieldProps) {
  const { val, setVal, dispatch, dispatchEdit, label, width, height } = props;

  const [currVal, setCurrVal] = useState(val);
  const saveField = () => {
    setVal(currVal);
    dispatch(currVal);
    dispatchEdit(false);
  };

  return (
    <div>
      <textarea
        defaultValue={currVal}
        className="textarea textarea-bordered resize-none text-xl max-w-full"
        onChange={(e) => {
          setCurrVal(e.target.value);
        }}
        placeholder={label}
        cols={width}
        rows={height}
      />
      <br />
      <button
        type="button"
        className="btn btn-main btn-sm btn-secondary mt-2"
        onClick={saveField}
      >
        Save
      </button>
      <button
        className="btn btn-main btn-sm btn-warning ml-4"
        onClick={() => {
          dispatchEdit(false);
        }}
      >
        Cancel
      </button>
    </div>
  );
}

type EditFieldDisplayProps = {
  val: string;
  dispatchEdit: Dispatch<boolean>;
  remove?: CallableFunction;
  label: string;
};

function EditFieldDisplay(props: EditFieldDisplayProps) {
  const { val, dispatchEdit, remove, label } = props;
  return (
    <div>
      <label className="text-xs">{label}</label>
      <br />
      <label className="font-bold">{val}</label>
      <br />
      <button
        className="btn btn-info btn-xs"
        onClick={() => {
          dispatchEdit(true);
        }}
      >
        Edit
      </button>
      {remove && (
        <button onClick={() => remove()} className="btn btn-error btn-xs ml-4">
          Remove
        </button>
      )}
    </div>
  );
}
