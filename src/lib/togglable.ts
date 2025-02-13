export default interface Togglable<T, C = unknown> {
    val: T
    isOn: boolean
    title: string
    children?: Togglable<C>[]
}

type NotUndefined<T> = Exclude<T, undefined>
export type TogglableList<C extends NotUndefined<unknown>> = Togglable<
    undefined,
    C
>

export function togglable<T, C>(
    val: T,
    title: string,
    children: Togglable<C>[] | undefined = undefined
): Togglable<T, C> {
    return {
        val,
        isOn: true,
        title,
        children,
    }
}

export function getIncludedVals<T>(togglableList?: TogglableList<T>): T[] {
    if (!togglableList) return []

    if (!togglableList.isOn) return []

    const togglables = togglableList.children || []
    const vals = togglables
        .filter((val) => {
            return val.isOn
        })
        .map((togglable) => {
            return togglable.val
        })

    return vals
}

export function isTogglable(value: unknown): value is Togglable<unknown> {
    return (
        typeof value == 'object' &&
        'val' in (value || {}) &&
        'isOn' in (value || {})
    )
}
