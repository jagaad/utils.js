export function isRejected<T>(
	result: PromiseSettledResult<T>,
): result is PromiseRejectedResult {
	return result.status === 'rejected';
}

export function isFulfilled<T>(
	result: PromiseSettledResult<T>,
): result is PromiseFulfilledResult<T> {
	return result.status === 'fulfilled';
}

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
