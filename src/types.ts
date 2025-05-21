export type StrictOmit<T, K extends keyof T> = Omit<T, K>;

export type Optional<T> = T | undefined;
export type Nullable<T> = T | null;
export type Maybe<T> = T | undefined | null;

export type ExtractArray<T> = T extends (infer U)[] ? U : never;
export type ExtractObject<T> = T extends { [key: string]: unknown } ? T : never;
export type ExtractFunction<T> = T extends (...args: (infer U)[]) => infer V
	? (...args: U[]) => V
	: never;
export type ExtractIdentityFunction<T> = T extends (arg: infer U) => infer V
	? (arg: U) => V
	: never;

export type ID = string | number;

/**
 * @deprecated Use {@link Choice} instead. Option shadows global [Option Constructor](https://developer.mozilla.org/en-US/docs/Web/API/HTMLOptionElement/Option)
 */
export type Option<T extends ID = ID> = Choice<T>;

/**
 * @since 0.15.0
 */
export type Choice<T extends ID = ID> = {
	id: T;
	name: string;
	children?: ReadonlyArray<Choice<T>>;
};

export type ReadonlyArrayStrict<T> = ReadonlyArray<Readonly<T>>;

export type DeepWriteable<T> = {
	-readonly [P in keyof T]: DeepWriteable<T[P]>;
};
