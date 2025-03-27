import type { Tagged } from 'type-fest';
import type { Maybe, Nullable, Optional } from './types.js';

export type ValidDate = Tagged<Date, 'valid'>;

export function getDateString(date: ValidDate): string;
export function getDateString(
	date?: Maybe<Date | string | number>,
): Optional<string>;
export function getDateString(
	date?: Maybe<Date | string | number>,
): Optional<string> {
	if (date == null) return undefined;

	// Convert to Date
	if (!(date instanceof Date)) date = new Date(date);

	// Invalid Date
	if (Number.isNaN(date.getTime())) return undefined;

	return date.toISOString().split('T')[0];
}

export function toDate(value: Maybe<string | number | Date>) {
	if (value == null) return undefined;
	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? undefined : date;
}

export function isBetween(date: Date, min: Date, max: Date): boolean {
	return min <= date && date <= max;
}
