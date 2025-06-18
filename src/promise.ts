/**
 * Checks if a promise result is rejected.
 * Can be used as a type guard to narrow the type of the result to `PromiseRejectedResult`.
 *
 * ```ts
 * const rejected = new Promise((_, reject) => setTimeout(() => reject(new Error('fail')), 1000));
 * const result = await settled(rejected);
 * console.log(isRejected(result)); // true
 *
 * const results = await Promise.allSettled([
 *   Promise.resolve('done'),
 *   Promise.reject(new Error('fail')),
 * ]);
 * console.log(results.filter(isRejected)); // [{ status: 'rejected', reason: Error('fail') }]
 * console.log(results.filter(isFulfilled)); // [{ status: 'fulfilled', value: 'done' }]
 * ```
 */
export function isRejected<T>(
	result: PromiseSettledResult<T>,
): result is PromiseRejectedResult {
	return result.status === 'rejected';
}

/**
 * Checks if a promise result is fulfilled.
 * Can be used as a type guard to narrow the type of the result to `PromiseFulfilledResult`.
 *
 * ```ts
 * const fulfilled = new Promise((resolve) => setTimeout(() => resolve('done'), 1000));
 * const result = await settled(fulfilled);
 * console.log(isFulfilled(result)); // true
 *
 * const results = await Promise.allSettled([
 *   Promise.resolve('done'),
 *   Promise.reject(new Error('fail')),
 * ]);
 * console.log(results.filter(isFulfilled)); // [{ status: 'fulfilled', value: 'done' }]
 * console.log(results.filter(isRejected)); // [{ status: 'rejected', reason: Error('fail') }]
 * ```
 */
export function isFulfilled<T>(
	result: PromiseSettledResult<T>,
): result is PromiseFulfilledResult<T> {
	return result.status === 'fulfilled';
}

/**
 * Returns the first settled result of a promise.
 *
 * ```ts
 * const fulfilled = new Promise((resolve) => setTimeout(() => resolve('done'), 1000));
 * const result = await settled(fulfilled);
 * console.log(result); // { status: 'fulfilled', value: 'done' }
 *
 * const rejected = new Promise((_, reject) => setTimeout(() => reject(new Error('fail')), 1000));
 * const result = await settled(rejected);
 * console.log(result); // { status: 'rejected', reason: Error('fail') }
 * ```
 */
export async function settled<T>(
	promise: Promise<T>,
): Promise<PromiseSettledResult<T>> {
	const [first] = await Promise.allSettled([promise]);
	return first;
}

export type Success<T> = [T, null] & {
	data: T;
	error: null;
};

export type Failure<E> = [null, E] & {
	data: null;
	error: E;
};

export type Result<T, E = Error> = Success<T> | Failure<E>;

/**
 * Tries to resolve a promise and returns a result tuple.
 * Similar to {@link settled}, but returns a tuple with the data and error.
 *
 * ```ts
 * const result = await tryCatch(Promise.resolve('success'));
 * console.log(result); // ['success', null]
 * const errorResult = await tryCatch(Promise.reject(new Error('fail')));
 * console.log(errorResult); // [null, Error('fail')]
 * ```
 */
export async function tryCatch<T, E = Error>(
	promise: Promise<T>,
): Promise<Result<T, E>> {
	try {
		const data = await promise;
		return Object.assign([data, null], { data, error: null }) as Result<T, E>;
	} catch (error) {
		return Object.assign([null, error], { data: null, error }) as Result<T, E>;
	}
}
