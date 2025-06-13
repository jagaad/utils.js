import type { Choice, Maybe } from './types';

export function filterUndefined<T>(
	obj: Partial<Readonly<Record<string, T>>>,
): Record<string, T> {
	const entries = Object.entries(obj);
	const filtered = entries.filter(
		(kv): kv is [string, T] => kv[1] !== undefined,
	);
	return Object.fromEntries(filtered);
}

export function hasOwnKeys(obj: Maybe<object>): boolean {
	if (!obj) return false;
	return Object.keys(obj).length > 0;
}

export function hasOwnDefinedKeys(obj: Maybe<object>): boolean {
	if (!obj) return false;
	return hasOwnKeys(filterUndefined(obj));
}

/** @deprecated Use `hasOwnDefinedKeys` instead. */
export function isNonEmptyObject(obj: object): boolean {
	return hasOwnDefinedKeys(obj);
}

export function recordToChoices(
	record: Maybe<Readonly<Record<string, string>>>,
): Choice[] {
	return Object.entries(record ?? {}).map(([id, name]) => ({ id, name }));
}
