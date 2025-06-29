/**
 * Utility functions for type checking in JavaScript.
 * These functions help determine the type of a value at runtime.
 *
 * ```ts
 * isType('hello', 'string'); // true
 * isType(42, 'number'); // true
 * isType(true, 'boolean'); // true
 * isType([], 'array'); // true
 * isType({}, 'object'); // true
 * isType(null, 'null'); // true
 * isType(undefined, 'undefined'); // true
 */
export function isType<T extends keyof TypeMap>(
	value: unknown,
	type: T,
): value is TypeMap[T] {
	return getType(value) === type;
}

/**
 * Returns the type of a value as a string.
 * This function uses `Object.prototype.toString` to determine the type of the value.
 * It returns a lowercase string representing the type, such as "string", "number", "boolean", etc.
 *
 * ```ts
 * getType('hello'); // 'string'
 * getType(42); // 'number'
 * getType(true); // 'boolean'
 * getType([]); // 'array'
 * getType({}); // 'object'
 * getType(null); // 'null'
 * getType(undefined); // 'undefined'
 * getType(new Date()); // 'date'
 * getType(/regex/); // 'regexp'
 * getType(new Map()); // 'map'
 * getType(new Set()); // 'set'
 * getType(new Promise(() => {})); // 'promise'
 */
export function getType(value: unknown): keyof TypeMap | (string & {}) {
	const s = Object.prototype.toString.call(value);
	return s.slice(8, -1).toLowerCase();
}

export type TypeMap = {
	string: string;
	number: number;
	bigint: bigint;
	boolean: boolean;
	symbol: symbol;
	undefined: undefined;
	null: null;
	object: object;
	function: Function;
	array: any[];
	date: Date;
	regexp: RegExp;
	error: Error;
	map: Map<any, any>;
	weakmap: WeakMap<object, any>;
	set: Set<any>;
	weakset: WeakSet<object>;
	promise: Promise<any>;
	arraybuffer: ArrayBuffer;
	dataview: DataView;
	int8array: Int8Array;
	uint8array: Uint8Array;
	uint8clampedarray: Uint8ClampedArray;
	int16array: Int16Array;
	uint16array: Uint16Array;
	int32array: Int32Array;
	uint32array: Uint32Array;
	float32array: Float32Array;
	float64array: Float64Array;
	bigint64array: BigInt64Array;
	biguint64array: BigUint64Array;
	url: URL;
	urlsearchparams: URLSearchParams;
	blob: Blob;
	file: File;
	formdata: FormData;
	headers: Headers;
	request: Request;
	response: Response;
	readablestream: ReadableStream<any>;
	writablestream: WritableStream<any>;
	transformstream: TransformStream<any, any>;
};
