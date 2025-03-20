import type { Arrayable } from 'type-fest';
import type { Maybe, Optional } from './types.js';

export function firstOrSelf<T>(value?: Maybe<Arrayable<T>>): Optional<T> {
	if (!value) return undefined;

	if (Array.isArray(value)) {
		return value.at(0);
	}

	return value;
}

export function intersperse<T>(array: ReadonlyArray<T>, separator: T): T[] {
	return [...Array(2 * array.length - 1)].map((_, i) =>
		i % 2 ? separator : (array[i / 2] as T),
	);
}

export function randomItem<T>(arr: ReadonlyArray<T>): T {
	return arr[Math.floor(Math.random() * arr.length)] as T;
}
