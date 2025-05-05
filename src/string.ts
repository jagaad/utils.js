import type { Maybe } from './types';

export function capitalize(str: string): string {
	return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}

export function initials(name: Maybe<string>): string | undefined {
	if (typeof name !== 'string' || !name.trim()) return undefined;

	const parts = name
		.trim()
		.split(/\s+/)
		.map((p) => p.at(0))
		.filter(Boolean);

	if (parts.length === 0) return undefined;

	return parts.map((p) => p.toUpperCase()).join('');
}
