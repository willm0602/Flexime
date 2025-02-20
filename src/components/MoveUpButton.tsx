import { ArrowUpIcon } from "@heroicons/react/24/solid";

interface MoveUpButtonSwapProps {
  swapWith: (idx: number) => unknown
  idx: number
  title: string
}

export default function MoveUpButton(props: MoveUpButtonSwapProps) {
  const {
    swapWith,
    idx,
    title
  } = props;

  if (idx == 0) {
    return <></>
  }

  const moveUp = () => {
    swapWith(idx - 1);
  }

  return <button className='btn btn-xs btn-accent' title={title} onClick={moveUp}>
    <ArrowUpIcon width={8} height={8} />
  </button>
}
