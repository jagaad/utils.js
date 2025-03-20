import type { Maybe, Optional } from './types.js';

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
