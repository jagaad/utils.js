export function filterUndefined<T>(
	obj: Partial<Record<string, T>>,
): Record<string, T> {
	const entries = Object.entries(obj);
	const filtered = entries.filter(
		(kv): kv is [string, T] => kv[1] !== undefined,
	);
	return Object.fromEntries(filtered);
}
