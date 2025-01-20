
export default interface Togglable<T> {
  val: T,
  isOn: boolean
}

export type TogglableList<T> = Togglable<Togglable<T>[]>;

export function togglable<T>(val: T): Togglable<T> {
  return {
    val,
    isOn: true
  }
}

export function togglableList<T>(vals: T[] | undefined): TogglableList<T> {
  const togglableVals: Togglable<T>[] = vals ? vals.map((val) => {
    return {
      val,
      isOn: true
    };
  }) : [];
  return {
    val: togglableVals,
    isOn: true
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
    'isOn' in value
  )
}
