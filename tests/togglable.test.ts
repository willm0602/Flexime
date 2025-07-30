import { getUsedVal, isTogglable, togglable } from '@/lib/togglable';
import { describe } from 'node:test';
import { expect, test } from 'vitest';

describe('Togglable data structure tests', () => {
    const sampleTogglable = togglable('foo', 'title');
    const offTogglable = {
        ...sampleTogglable,
        isOn: false
    }
    const sampleParent = togglable('parent', 'parent', [sampleTogglable]);
    const undefinedTogglable = togglable(undefined, 'undefined');

    test('Ensure togglable method creates an object matching the Togglable data structure', () => {
        expect(sampleTogglable).toBeDefined();
        expect(sampleTogglable).toEqual({
            val: 'foo',
            isOn: true,
            title: 'title',
            children: undefined,
        });
    });

    test('Ensure togglable method creates an object with children', () => {
        expect(sampleParent.children).toBeDefined();
        expect(sampleParent).toEqual({
            val: 'parent',
            isOn: true,
            title: 'parent',
            children: [sampleTogglable],
        });
    });

    test('Ensure isTogglable method works', () => {
        expect(isTogglable(sampleParent)).toBeTruthy();
        expect(isTogglable(sampleTogglable)).toBeTruthy();
        expect(isTogglable(undefinedTogglable)).toBeTruthy();
        expect(isTogglable({})).toBeFalsy();
        expect(isTogglable('a')).toBeFalsy();
    });

    test('Ensure the used value method works', () => {
        // @ts-ignore (testing method w/ improper types)
        expect(getUsedVal('a')).toBe(undefined);
        expect(getUsedVal(offTogglable)).toBe(undefined);
        expect(getUsedVal(sampleTogglable)).toBe('foo');
        expect(getUsedVal(sampleParent)).toBe('parent')
    });
});
