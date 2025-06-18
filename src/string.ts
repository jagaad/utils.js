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
