export function isType<T extends keyof TypeMap>(
	value: unknown,
	type: T,
): value is TypeMap[T] {
	return getType(value) === type;
}

export function getType(value: unknown): keyof TypeMap | (string & {}) {
	const s = Object.prototype.toString.call(value);
	return s.slice(8, -1).toLowerCase();
}

type TypeMap = {
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
