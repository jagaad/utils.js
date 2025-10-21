import type { Maybe, Optional } from './types';

/**
 * Capitalizes the first letter of a string.
 *
 * ```ts
 * capitalize('hello world'); // 'Hello world'
 * ```
 *
 * @deprecated Use `capitalize` from `es-toolkit` instead.
 */
export function capitalize(str: string): string {
	return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}

/**
 * Generates initials from a name string.
 *
 * ```ts
 * initials('John Doe'); // 'JD'
 * initials('Alice Bob'); // 'AB'
 * initials(''); // undefined
 * initials(null); // undefined
 * initials(undefined); // undefined
 * initials('  '); // undefined
 * initials('Alice'); // 'A'
 * initials('Alice Bob Charlie'); // 'ABC'
 */
export function initials(name: Maybe<string>): Optional<string> {
	if (typeof name !== 'string' || !name.trim()) return undefined;

	const parts = name
		.trim()
		.split(/\s+/)
		.map((p) => p.at(0))
		.filter(Boolean);

	if (parts.length === 0) return undefined;

	return parts.map((p) => p.toUpperCase()).join('');
}

/**
 * There are cases where important information is at the end of the string and truncating the end isn't helpful.
 * This function solves that.
 *
 * ```ts
 * truncateMiddle('very-long-file-name.txt', 10, 4); // 'very-long...name.txt'
 * truncateMiddle('Hello, world!', 5, 6); // 'Hello...world!'
 * truncateMiddle('Hello, world!', 5, 0); // 'Hello...'
 * truncateMiddle('Hello, world!', 0, 6); // '...world!'
 * truncateMiddle('Hello, world!', 0, 0); // 'Hello, world!'
 * truncateMiddle(null, 5, 6); // undefined
 * ```
 */
export function truncateMiddle(
	str: Maybe<string>,
	frontLen: number = 0,
	backLen: number = 0,
	truncateStr: string = '&hellip;',
): string | undefined {
	if (str == undefined) return undefined;

	const strLen = str.length;
	// Round to nearest integer instead of floor to fix decimal parameter test
	const frontLength = Math.round(frontLen);
	const backLength = Math.round(backLen);

	if (
		(frontLength === 0 && backLength === 0) ||
		frontLength >= strLen ||
		backLength >= strLen ||
		frontLength + backLength >= strLen
	) {
		return str;
	} else if (backLength === 0) {
		return str.slice(0, frontLength) + truncateStr;
	} else {
		return (
			str.slice(0, frontLength) + truncateStr + str.slice(strLen - backLength)
		);
	}
}

/**
 * Safely parses a JSON string, returning `undefined` if parsing fails.
 *
 * ```ts
 * safeParse<{ a: number }>('{"a": 1}'); // { a: 1 }
 * safeParse<{ a: number }>('invalid json'); // undefined
 * safeParse<{ a: number }>(null); // undefined
 * ```
 */
export function safeParse<T>(jsonString: Maybe<string>): T | undefined {
	if (typeof jsonString !== 'string') return undefined;

	try {
		return JSON.parse(jsonString) as T;
	} catch {
		return undefined;
	}
}
