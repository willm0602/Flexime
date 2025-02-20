import MoveDownButton from "./MoveDownButton";
import MoveUpButton from "./MoveUpButton";

interface MoveInListProps {
  idx: number,
  swapWith: (idx: number) => unknown,
  listSize: number,
  fieldName: string
}

export default function MoveInListButtons(props: MoveInListProps) {
  const {
    idx,
    swapWith,
    listSize,
    fieldName
  } = props;

  const hasLeft = idx > 0;

  return <>
    <MoveUpButton
      swapWith={swapWith}
      idx={idx}
      title={`Move "${fieldName}" up one`}
    />

    <MoveDownButton
      swapWith={swapWith}
      idx={idx}
      title={`Move "${fieldName}" down one`}
      listSize={listSize}
      className={hasLeft ? 'ml-4' : ''}
    />

  </>
}
