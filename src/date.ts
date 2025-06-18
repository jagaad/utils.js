import type { Tagged } from 'type-fest';
import type { Maybe, Optional } from './types.js';

/**
 * Represents a valid Date object.
 * This type is used to ensure that the date is a valid instance of Date and not an invalid date.
 */
export type ValidDate = Tagged<Date, 'valid'>;

/**
 * Checks if a value is a valid Date object.
 *
 * ```ts
 * isValidDate(new Date()); // true
 * isValidDate(new Date('2023-10-01')); // true
 * isValidDate(new Date('invalid-date')); // false
 * isValidDate('2023-10-01'); // false
 * ```
 */
export function isValidDate(date: Date): date is ValidDate {
	return date instanceof Date && !Number.isNaN(date.getTime());
}

/**
 * Gets the date string in ISO format (YYYY-MM-DD) from a Date object or a date-like value.
 *
 * ```ts
 * getDateString(new Date('2023-10-01')); // '2023-10-01'
 * getDateString('2023-10-01'); // '2023-10-01'
 * getDateString(1738358400000); // '2023-10-01'
 * getDateString(new Date('invalid-date')); // undefined
 * getDateString(null); // undefined
 * getDateString(undefined); // undefined
 * ```
 */
export function getDateString(date: ValidDate): string;
export function getDateString(
	date: Maybe<Date | string | number>,
): Optional<string>;
export function getDateString(
	date: Maybe<Date | string | number>,
): Optional<string> {
	if (date == null) return undefined;

	// Convert to Date
	if (!(date instanceof Date)) date = new Date(date);

	// Invalid Date
	if (Number.isNaN(date.getTime())) return undefined;

	return date.toISOString().split('T')[0];
}

/**
 * Gets the date and time string in ISO format (YYYY-MM-DDTHH:mm:ss) from a Date object or a date-like value.
 *
 * ```ts
 * getDateTimeString(new Date('2023-10-01T12:34:56')); // '2023-10-01T12:34:56'
 * getDateTimeString('2023-10-01T12:34:56'); // '2023-10-01T12:34:56'
 * getDateTimeString(1738358400000); // '2023-10-01T00:00:00'
 * getDateTimeString(new Date('invalid-date')); // undefined
 * getDateTimeString(null); // undefined
 * getDateTimeString(undefined); // undefined
 * ```
 */
export function getDateTimeString(date: ValidDate): string;
export function getDateTimeString(
	date: Maybe<Date | string | number>,
): Optional<string>;
export function getDateTimeString(
	date: Maybe<Date | string | number>,
): Optional<string> {
	if (date == null) return undefined;

	// Convert to Date
	if (!(date instanceof Date)) date = new Date(date);

	// Invalid Date
	if (Number.isNaN(date.getTime())) return undefined;

	return date.toISOString().split('.')[0];
}

/**
 * Converts a value to a Date object.
 *
 * ```ts
 * toDate('2023-10-01'); // Date object for October 1, 2023
 * toDate(1738358400000); // Date object for October 1, 2023
 * toDate(new Date('2023-10-01')); // Date object for October 1, 2023
 * toDate('invalid-date'); // undefined
 * toDate(null); // undefined
 * toDate(undefined); // undefined
 * ```
 */
export function toDate(value: Maybe<string | number | Date>): Date | undefined {
	if (value == null) return undefined;
	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? undefined : date;
}

/**
 * Checks if a date is between two other dates (inclusive).
 *
 * ```ts
 * isBetween(new Date('2023-10-01'), new Date('2023-09-01'), new Date('2023-11-01')); // true
 * isBetween(new Date('2023-10-01'), new Date('2023-10-01'), new Date('2023-10-01')); // true
 * isBetween(new Date('2023-10-01'), new Date('2023-11-01'), new Date('2023-09-01')); // false
 * isBetween(new Date('2023-10-01'), new Date('2023-10-02'), new Date('2023-10-02')); // false
 * ```
 */
export function isBetween(date: Date, min: Date, max: Date): boolean {
	return min <= date && date <= max;
}

const defaultOptions: Intl.DateTimeFormatOptions = {
	dateStyle: 'short',
	timeStyle: 'short',
};

/**
 * Formats a date into a string using the specified locales and options.
 *
 * ```ts
 * formatDate(new Date('2023-10-01'), { locales: 'en-US', options: { dateStyle: 'full' } }); // "Sunday, October 1, 2023"
 * formatDate('2023-10-01', { locales: 'fr-FR', options: { dateStyle: 'long' } }); // "1 octobre 2023"
 * formatDate(1738358400000, { locales: 'de-DE', options: { timeStyle: 'short' } }); // "01.10.2023, 00:00"
 * formatDate(new Date('invalid-date')); // "Invalid Date"
 * formatDate(null); // undefined
 * formatDate(undefined); // undefined
 * ```
 */
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
