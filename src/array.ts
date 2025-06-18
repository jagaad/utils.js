import type { Arrayable } from 'type-fest';
import type { Choice, Maybe, Optional, ReadonlyArrayStrict } from './types.js';

/**
 * Returns the first element of an array or the value itself if it's not an array.
 *
 * ```ts
 * firstOrSelf('Hello'); // 'Hello'
 * firstOrSelf(['Hello', 'World']); // 'Hello'
 * firstOrSelf([]); // undefined
 * firstOrSelf(null); // undefined
 * firstOrSelf(undefined); // undefined
 * firstOrSelf(0); // 0
 * firstOrSelf(''); // ''
 * firstOrSelf(false); // false
 * ```
 */
export function firstOrSelf<T>(value: Maybe<Arrayable<T>>): Optional<T> {
	if (value == null) return undefined;

	if (Array.isArray(value)) {
		return value.at(0);
	}

	return value;
}

/**
 * Inserts a separator between each element of the array.
 *
 * ```ts
 * intersperse(['a', 'b', 'c'], '-'); // ['a', '-', 'b', '-', 'c']
 */
export function intersperse<T>(array: ReadonlyArray<T>, separator: T): T[] {
	return [...Array(2 * array.length - 1)].map((_, i) =>
		i % 2 ? separator : (array[i / 2] as T),
	);
}

/**
 * Returns a random item from the given array.
 *
 * ```ts
 * randomItem(['apple', 'banana', 'cherry']); // Could be 'apple', 'banana', or 'cherry'
 * ```
 *
 * @deprecated Use `sample` from `es-toolkit` instead.
 */
export function randomItem<T>(arr: ReadonlyArray<T>): T {
	return arr[Math.floor(Math.random() * arr.length)] as T;
}

/**
 * Returns metadata about the index of an item in a list.
 *
 * ```ts
 * const list = ['apple', 'banana', 'cherry'];
 * const meta = getIndexMeta(1, list);
 * console.log(meta.count); // 3
 * console.log(meta.current); // 2
 * console.log(meta.first); // false
 * console.log(meta.last); // false
 * console.log(meta.odd); // true
 * console.log(meta.even); // false
 * ```
 */
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

/**
 * Converts an array of choices into a record where the keys are the choice IDs and the values are the choice names.
 *
 * ```ts
 * const choices = [
 *   { id: '1', name: 'Choice 1' },
 *   { id: '2', name: 'Choice 2' },
 * ];
 * const record = choicesToRecord(choices);
 * console.log(record); // { '1': 'Choice 1', '2': 'Choice 2' }
 * ```
 */
export function choicesToRecord(
	choices: Maybe<ReadonlyArrayStrict<Choice>>,
): Record<string, string> {
	return Object.fromEntries(
		(choices ?? []).map((choice) => [choice.id, choice.name]),
	);
}
