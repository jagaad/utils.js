import type { Tagged } from 'type-fest';
import type { Maybe, Optional } from './types.js';

export type ValidDate = Tagged<Date, 'valid'>;

export function isValidDate(date: Date): date is ValidDate {
	return date instanceof Date && !Number.isNaN(date.getTime());
}

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

export function getDateTimeString(date: ValidDate): string;
export function getDateTimeString(
	date?: Maybe<Date | string | number>,
): Optional<string>;
export function getDateTimeString(
	date?: Maybe<Date | string | number>,
): Optional<string> {
	if (date == null) return undefined;

	// Convert to Date
	if (!(date instanceof Date)) date = new Date(date);

	// Invalid Date
	if (Number.isNaN(date.getTime())) return undefined;

	return date.toISOString().split('.')[0];
}

export function toDate(value: Maybe<string | number | Date>) {
	if (value == null) return undefined;
	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? undefined : date;
}

export function isBetween(date: Date, min: Date, max: Date): boolean {
	return min <= date && date <= max;
}

const defaultOptions: Intl.DateTimeFormatOptions = {
	dateStyle: 'short',
	timeStyle: 'short',
};

export function formatDate(
	date: Maybe<string | number | Date>,
	params?: {
		locales?: Intl.LocalesArgument;
		options?: Intl.DateTimeFormatOptions;
	},
): string | undefined {
	if (date == null) return undefined;

	date = new Date(date);

	// Invalid Date
	if (Number.isNaN(date.getTime())) return date.toString();

	const { locales, options = defaultOptions } = params ?? {};

	const formatter = new Intl.DateTimeFormat(locales, options);

	return formatter.format(date);
}
