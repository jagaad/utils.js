/**
 * No operation function.
 * This is a utility function that does nothing when called. It can be used as a placeholder
 * or default callback when no action is needed.
 *
 * ```ts
 * noop(); // Does nothing
 * ```
 *
 * @deprecated Use `noop` from `es-toolkit` instead.
 */
export function noop() {}

/**
 * Returns the input value.
 * This is a utility function that can be used as a default callback or placeholder
 * when no transformation is needed. It simply returns the value passed to it.
 *
 * ```ts
 * const value = 42;
 * const result = identity(value);
 * console.log(result); // 42
 * ```
 *
 * @deprecated Use `identity` from `es-toolkit` instead.
 */
export function identity<T>(value: T): T {
	return value;
}

/**
 * Returns false.
 * This is a utility function that can be used as a default callback or placeholder
 * when a false value is needed. It simply returns `false`.
 *
 * ```ts
 * const result = falseFn();
 * console.log(result); // false
 * ```
 */
export function falseFn() {
	return false;
}

/**
 * Returns true.
 * This is a utility function that can be used as a default callback or placeholder
 * when a true value is needed. It simply returns `true`.
 *
 * ```ts
 * const result = trueFn();
 * console.log(result); // true
 * ```
 */
export function trueFn() {
	return true;
}

/**
 * Returns null.
 * This is a utility function that can be used as a default callback or placeholder
 * when a null value is needed. It simply returns `null`.
 *
 * ```ts
 * const result = nullFn();
 * console.log(result); // null
 * ```
 */
export function nullFn() {
	return null;
}

/**
 * Returns undefined.
 * This is a utility function that can be used as a default callback or placeholder
 * when an undefined value is needed. It simply returns `undefined`.
 *
 * ```ts
 * const result = undefinedFn();
 * console.log(result); // undefined
 * ```
 */
export function undefinedFn() {
	return undefined;
}
