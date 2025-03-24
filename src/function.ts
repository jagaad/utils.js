export function noop() {}

export function identity<T>(value: T): T {
	return value;
}

export function falseFn() {
	return false;
}

export function trueFn() {
	return true;
}

export function nullFn() {
	return null;
}

export function undefinedFn() {
	return undefined;
}
