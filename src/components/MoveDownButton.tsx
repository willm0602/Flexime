import { ArrowDownIcon } from "@heroicons/react/24/solid";
import { twMerge } from "tailwind-merge";

interface MoveDownButtonSwapProps {
  swapWith: (idx: number) => any
  idx: number
  listSize: number
  title: string
  className?: string
}

export default function MoveDownButton(props: MoveDownButtonSwapProps) {
  const {
    swapWith,
    idx,
    listSize,
    title,
    className
  } = props;

  if (idx >= (listSize - 1)) {
    return <></>
  }

  const moveUp = () => {
    swapWith(idx + 1);
  }

  return <button title={title} className={twMerge(className, 'btn btn-xs btn-accent')} onClick={moveUp}>
    <ArrowDownIcon width={8} height={8} />
  </button>
}
