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

export type Option<T extends ID = ID> = {
	id: T;
	name: string;
	children?: ReadonlyArray<Option<T>>;
};
