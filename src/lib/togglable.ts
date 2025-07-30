export default interface Togglable<T, C = unknown> {
    val: T;
    isOn: boolean;
    title: string;
    id: string;
    children?: Togglable<C>[];
}

type NotUndefined<T> = Exclude<T, undefined>;
export type TogglableList<C extends NotUndefined<unknown>> = Togglable<
    undefined,
    C
>;

export function togglable<T, C>(
    val: T,
    title: string,
    children: Togglable<C>[] | undefined = undefined,
): Togglable<T, C> {
    return {
        val,
        isOn: true,
        title,
        id: title,
        children,
    };
}

export function isTogglable(value: unknown): value is Togglable<unknown> {
    return (
        typeof value === 'object' &&
        'val' in (value || {}) &&
        'title' in (value || {}) &&
        'isOn' in (value || {})
    );
}

export function getUsedVal<V, C>(togglable: Togglable<V, C>): V | undefined {
    if (!togglable.isOn) return undefined;
    return togglable.val;
}
