import type { Arrayable } from 'type-fest';
import type { Maybe, Optional } from './types.js';

export function firstOrSelf<T>(value?: Maybe<Arrayable<T>>): Optional<T> {
	if (!value) return undefined;

	if (Array.isArray(value)) {
		return value.at(0);
	}

	return value;
}
