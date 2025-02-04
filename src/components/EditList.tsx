
const DEFAULT_ADD_BTN_TEXT = 'Add'

export type ListItemProps<T> = {
  val: T,
  vals: T[],
  setList: (newVals: T[]) => void
  idx: number,
  confirmThenRemove: () => boolean
}

export type ListItem<T> = (props: ListItemProps<T>) => React.ReactNode

type EditListProps<T> = {
  vals: T[]
  setList: (newList: T[]) => void,
  RenderItem: ListItem<T>,
  defaultChild: T,
  addBtnText?: string
};

export default function EditList<T>(props: EditListProps<T>) {
  const { vals, setList, RenderItem, defaultChild, addBtnText } = props;

  const addNew = () => {
    setList([
      ...vals,
      defaultChild
    ]);
  }

  const confirmThenRemoveAtIdx = (idxToRemove: number) => () => {
    const confirmPrompt = 'This will permanently remove this item from the resume, please confirm if you would like to remove this.'
    const shouldUpdate = window.confirm(confirmPrompt);
    if (!shouldUpdate)
      return false;
    const updatedChildren = vals.filter((_, idx) => idx != idxToRemove);
    setList(updatedChildren);
    return true;
  }
  return <div className='w-full'>
    {vals.map((val, idx) => {
      return <div className='flex items-center border-solid border-slate-500 border-2 my-4 p-4' key={`edit-list-${idx}`}>
        <RenderItem val={val}
          vals={vals}
          setList={setList}
          confirmThenRemove={confirmThenRemoveAtIdx(idx)}
          idx={idx} />
      </div>
    })}
    <button onClick={addNew}
      className='btn btn-primary'
    >{addBtnText || DEFAULT_ADD_BTN_TEXT}</button>
  </div>
}
