
export type ListItemProps<T> = {
  val: T,
  vals: T[],
  setList: (newVals: T[]) => void,
  idx: number
}

export type ListItem<T> = (props: ListItemProps<T>) => React.ReactNode

type EditListProps<T> = {
  vals: T[]
  setList: (newList: T[]) => void,
  RenderItem: ListItem<T>,
  defaultChild: T
};

export default function EditList<T>(props: EditListProps<T>) {
  const { vals, setList, RenderItem, defaultChild } = props;

  const addNew = () => {
    const newChild = { ...defaultChild };
    setList([
      ...vals,
      newChild
    ]);
  }

  const confirmThenRemove = (idxToRemove: number) => {
    // TODO: replace with a custom dialog
    const shouldRemove = window.confirm('This will remove this permanently from your resume, are you sure you wish to proceed?')

    if (shouldRemove) {
      const updatedChildren = vals.filter((_, idx) => {
        return idx != idxToRemove;
      });
      setList(updatedChildren);
    }
  }

  return <div>
    {vals.map((val, idx) => {
      return <div className='flex items-center border-solid border-slate-500 border-2 my-4 p-4' key={`edit-list-${idx}`}>
        <button className='btn btn-xs btn-warning mr-12'
          onClick={() => { confirmThenRemove(idx) }}
        >Remove</button>
        <RenderItem val={val}
          vals={vals}
          setList={setList}
          idx={idx} />
      </div>
    })}
    <button onClick={addNew}>Add</button>
  </div>
}
