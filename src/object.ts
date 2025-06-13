import type { Choice, Maybe, ReadonlyArrayStrict } from './types';

export function filterUndefined<T>(
	obj: Partial<Record<string, T>>,
): Record<string, T> {
	const entries = Object.entries(obj);
	const filtered = entries.filter(
		(kv): kv is [string, T] => kv[1] !== undefined,
	);
	return Object.fromEntries(filtered);
}

export function isNonEmptyObject(obj: object): boolean {
	return Object.keys(filterUndefined(obj)).length > 0;
}

export function recordToChoices(
	record: Maybe<Readonly<Record<string, string>>>,
): Choice[] {
	return Object.entries(record ?? {}).map(([id, name]) => ({ id, name }));
}
