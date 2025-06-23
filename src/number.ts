import type { Maybe, Optional } from './types.js';

/**
 * Parses a string into a number.
 * If the string is empty or cannot be parsed, returns undefined.
 *
 * ```ts
 * parseNumber('42'); // 42
 * parseNumber('3.14'); // 3.14
 * parseNumber(''); // undefined
 * parseNumber('abc'); // undefined
 * parseNumber('123abc'); // undefined
 * parseNumber(null); // undefined
 * parseNumber(undefined); // undefined
 * parseNumber('NaN'); // undefined
 * parseNumber('Infinity'); // Infinity
 * parseNumber('0'); // 0
 */
export function parseNumber(value: Maybe<string>): Optional<number> {
	if (!value) return undefined;
	const parsed = Number(value);
	if (Number.isNaN(parsed)) return undefined;
	return parsed;
}

/**
 * Clamps a number between a minimum and maximum value.
 *
 * ```ts
 * clamp(5, 1, 10); // 5
 * clamp(0, 1, 10); // 1
 * clamp(15, 1, 10); // 10
 * clamp(-5, -10, -1); // -5
 * ```
 *
 * @deprecated Use `clamp` from `es-toolkit` instead.
 */
export function clamp(val: number, min: number, max: number): number {
	return Math.max(min, Math.min(max, val));
}

export function wrap(val: number, min: number, max: number): number {
	return ((((val - min) % (max - min)) + (max - min)) % (max - min)) + min;
}

/**
 * Checks if a value is within a specified range.
 *
 * ```ts
 * inRange(5, 1, 10); // true
 * inRange(0, 1, 10); // false
 * inRange(15, 1, 10); // false
 * inRange(-5, -10, -1); // true
 * ```
 *
 * @deprecated Use `inRange` from `es-toolkit` instead.
 */
export function inRange(val: number, min: number, max: number): boolean {
	return Math.min(min, max) <= val && val <= Math.max(min, max);
}

/**
 * Calculates the percentage of a value relative to a maximum.
 *
 * ```ts
 * percentage(50, 200); // 25
 * percentage(0, 100); // 0
 * percentage(100, 0); // 0 (avoids division by zero)
 * percentage(75, 300); // 25
 * ```
 */
export function percentage(val: number, max: number): number {
	if (max === 0) return 0; // Avoid division by zero
	return (val * 100) / max;
}

/**
 * Converts a size in bytes to a string representation in megabytes.
 */
export function bytesToMegabytes(size: number): string {
	return (size / 1024 / 1024).toFixed(2);
}

/**
 * Normalizes a value to a ratio between 0 and 1 based on a minimum and maximum range.
 *
 * ```ts
 * normalizeRatio(5, 0, 10); // 0.5
 * normalizeRatio(0, 0, 10); // 0
 * normalizeRatio(10, 0, 10); // 1
 * normalizeRatio(-5, -10, 0); // 0.5
 * normalizeRatio(15, 10, 20); // 0.5
 * ```
 */
export function normalizeRatio(val: number, min: number, max: number): number {
	return (val - min) / (max - min);
}

/**
 * Generates a range of numbers from `start` to `end` with an optional `step`.
 *
 * ```ts
 * [...range(1, 5)]; // [1, 2, 3, 4, 5]
 * [...range(1, 10, 2)]; // [1, 3, 5, 7, 9]
 * [...range(5, 1)]; // [5, 4, 3, 2, 1]
 * [...range(5, 5)]; // [5]
 * [...range(0, 0)]; // [0]
 * [...range(0, 10, 3)]; // [0, 3, 6, 9]
 * [...range(10, 0, -2)]; // [10, 8, 6, 4, 2]
 * ```
 *
 * @deprecated Use `range` from `es-toolkit` instead.
 */
export function* range(
	start: number,
	end: number,
	step = 1,
): Generator<number> {
	const delta = Math.abs(start - end);
	const direction = start < end ? 1 : -1;
	for (let i = 0; i <= delta; i += step) {
		yield start + i * direction;
	}
}

export const payRateUnits = ['hour', 'day', 'week', 'month', 'year'] as const;
export type PayRateUnit = (typeof payRateUnits)[number];
export interface PayRate {
	value: number;
	unit: PayRateUnit;
}

const HOURS_PER_DAY = 8;
const DAYS_PER_WEEK = 5;
const WEEKS_PER_YEAR = 52;
const MONTHS_PER_YEAR = 12;
const HOURS_PER_WEEK = HOURS_PER_DAY * DAYS_PER_WEEK;
const HOURS_PER_YEAR = HOURS_PER_DAY * DAYS_PER_WEEK * WEEKS_PER_YEAR;
const HOURS_PER_MONTH = HOURS_PER_YEAR / MONTHS_PER_YEAR;

const toHour: Record<PayRateUnit, number> = {
	hour: 1,
	day: HOURS_PER_DAY,
	week: HOURS_PER_WEEK,
	month: HOURS_PER_MONTH,
	year: HOURS_PER_YEAR,
};

/**
 * Converts a pay rate from one unit to another considering a standard work week of 40 hours.
 *
 * ```ts
 * convertPayRate({ value: 100, unit: 'hour' }, 'day'); // { value: 800, unit: 'day' }
 * convertPayRate({ value: 100, unit: 'day' }, 'hour'); // { value: 12.5, unit: 'hour' }
 * convertPayRate({ value: 100, unit: 'week' }, 'month'); // { value: 433.33, unit: 'month' }
 * convertPayRate({ value: 100, unit: 'year' }, 'week'); // { value: 1.92, unit: 'week' }
 * convertPayRate({ value: 100, unit: 'month' }, 'year'); // { value: 1200, unit: 'year' }
 * ```
 */
export function convertPayRate(
	payRate: PayRate,
	payRateUnit: PayRateUnit,
): PayRate {
	const hourlyValue = payRate.value / toHour[payRate.unit];
	const newValue = hourlyValue * toHour[payRateUnit];
	return { value: parseFloat(newValue.toFixed(2)), unit: payRateUnit };
}
