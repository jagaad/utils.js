import type { Arrayable } from 'type-fest';
import type { Choice, Maybe, Optional, ReadonlyArrayStrict } from './types.js';

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

export function getIndexMeta(
	index: number,
	list: ReadonlyArrayStrict<unknown>,
) {
	return {
		/**
		 * The total number of items in the list.
		 */
		get count() {
			return list.length;
		},
		/**
		 * The current index (1-based).
		 */
		get current() {
			return index + 1;
		},
		/**
		 * Whether this is the first item in the list.
		 */
		get first() {
			return index === 0;
		},
		/**
		 * Whether this is the last item in the list.
		 */
		get last() {
			return index === list.length - 1;
		},
		/**
		 * Whether the index is odd (0-based).
		 */
		get odd() {
			return index % 2 === 1;
		},
		/**
		 * Whether the index is even (0-based).
		 */
		get even() {
			return index % 2 === 0;
		},
	};
}

export function choicesToRecord(
	choices: Maybe<ReadonlyArrayStrict<Choice>>,
): Record<string, string> {
	return Object.fromEntries(
		(choices ?? []).map((choice) => [choice.id, choice.name]),
	);
}
