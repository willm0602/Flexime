
export default interface Togglable<T> {
  val: T,
  isOn: boolean,
  title: string
}

export type TogglableList<T> = Togglable<Togglable<T>[]>;

export function togglable<T>(val: T, title: string): Togglable<T> {
  return {
    val,
    isOn: true,
    title
  }
}

export function togglableList<T>(vals: T[] | undefined, title: string, getTitle?: (togglable: T, idx: number) => string): TogglableList<T> {
  const togglableVals: Togglable<T>[] = vals ? vals.map((val: T, idx: number) => {
    return {
      val,
      isOn: true,
      title: getTitle ? getTitle(val, idx) : `${idx}`
    };
  }) : [];
  return {
    val: togglableVals,
    isOn: true,
    title
  };
}

export function getIncludedVals<T>(togglableList?: TogglableList<T>): T[] {

  if (!togglableList)
    return [];

  if (!togglableList.isOn)
    return [];

  const togglables = togglableList.val;
  const vals = togglables.filter((val) => {
    return val.isOn
  }).map((togglable) => {
    return togglable.val
  });

  return vals;
}

export function isTogglable<T>(value: unknown): value is Togglable<T> {
  return (
    typeof value == 'object' &&
    value != null &&
    'val' in value &&
    'isOn' in value &&
    value['val'] != null
  )
}
