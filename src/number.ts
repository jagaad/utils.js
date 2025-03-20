import type { Maybe, Optional } from './types.js';

export function parseNumber(value?: Maybe<string>): Optional<number> {
	if (!value) return undefined;
	const parsed = Number(value);
	if (Number.isNaN(parsed)) return undefined;
	return parsed;
}

export function clamp(val: number, min: number, max: number): number {
	return Math.max(min, Math.min(max, val));
}

export function wrap(val: number, min: number, max: number): number {
	return ((((val - min) % (max - min)) + (max - min)) % (max - min)) + min;
}

export function inRange(val: number, min: number, max: number) {
	return Math.min(min, max) <= val && val <= Math.max(min, max);
}

export function percentage(val: number, max: number) {
	return (val * 100) / max;
}

export function bytesToMegabytes(size: number) {
	return (size / 1024 / 1024).toFixed(2);
}

export function normalizeRatio(val: number, min: number, max: number): number {
	return (val - min) / (max - min);
}
