import type { Choice, Maybe } from './types';

/**
 * Filters out undefined values from an object.
 * Returns a new object with only defined values.
 *
 * ```ts
 * const obj = { a: 1, b: undefined, c: 3 };
 * const filtered = filterUndefined(obj);
 * console.log(filtered); // { a: 1, c: 3 }
 * ```
 */
export function filterUndefined<T>(
	obj: Partial<Readonly<Record<string, T>>>,
): Record<string, T> {
	const entries = Object.entries(obj);
	const filtered = entries.filter(
		(kv): kv is [string, T] => kv[1] !== undefined,
	);
	return Object.fromEntries(filtered);
}

/**
 * Checks if an object has any own properties.
 *
 * ```ts
 * hasOwnKeys({ a: 1, b: 2 }); // true
 * hasOwnKeys({ a: undefined }); // true
 * hasOwnKeys({ a: null }); // true
 * hasOwnKeys({}); // false
 * hasOwnKeys(undefined); // false
 * hasOwnKeys(null); // false
 * ```
 */
export function hasOwnKeys(obj: Maybe<object>): boolean {
	if (!obj) return false;
	return Object.keys(obj).length > 0;
}

/**
 * Checks if an object has any own properties with defined values.
 *
 * ```ts
 * hasOwnDefinedKeys({ a: 1, b: 2 }); // true
 * hasOwnDefinedKeys({ a: undefined }); // false
 * hasOwnDefinedKeys({ a: null }); // true
 * hasOwnDefinedKeys({}); // false
 * hasOwnDefinedKeys(undefined); // false
 * hasOwnDefinedKeys(null); // false
 * ```
 */
export function hasOwnDefinedKeys(obj: Maybe<object>): boolean {
	if (!obj) return false;
	return hasOwnKeys(filterUndefined(obj));
}

/** @deprecated Use `hasOwnDefinedKeys` instead. */
export function isNonEmptyObject(obj: object): boolean {
	return hasOwnDefinedKeys(obj);
}

/**
 * Converts a record to an array of choices.
 *
 * ```ts
 * const record = { '1': 'Option 1', '2': 'Option 2' };
 * const choices = recordToChoices(record);
 * console.log(choices); // [{ id: '1', name: 'Option 1' }, { id: '2', name: 'Option 2' }]
 * ```
 */
export function recordToChoices(
	record: Maybe<Readonly<Record<string, string>>>,
): Choice[] {
	return Object.entries(record ?? {}).map(([id, name]) => ({ id, name }));
}
