
export type ListItemProps<P, C> = {
  val: C,
  parent: P,
  setParent: (newParent: P) => void,
  idx: number,
  fieldName: keyof P
}

export type ListItem<P, C> = (props: ListItemProps<P, C>) => React.ReactNode

type EditListProps<P, C, L extends P[keyof P] & Array<C>> = {
  vals: L
  fieldName: keyof P,
  parent: P,
  setParent: (newParent: P) => void,
  RenderItem: ListItem<P, C>,
  defaultChild: C
};

export default function EditList<P, C, L extends P[keyof P] & Array<C>>(props: EditListProps<P, C, L>) {
  const { vals, fieldName, parent, setParent, RenderItem, defaultChild } = props;

  const addNew = () => {
    const newChild = { ...defaultChild };
    const newParent = { ...parent };
    newParent[fieldName].push(newChild);
    setParent(newParent);
  }

  return <div>
    {vals.map((val, idx) => {
      return <RenderItem val={val}
        parent={parent}
        setParent={setParent}
        key={`edit-list-${idx}`}
        fieldName={fieldName}
        idx={idx} />
    })}
    <button onClick={addNew}>Add</button>
  </div>
}
