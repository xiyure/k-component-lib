// set range of integers
type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N ? Acc[number] : Enumerate<N, [...Acc, Acc['length']]>;
export type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

// require => optional
export type RequireToOptional<T> = { [K in keyof T]+?: T[K] };

// optional => require
export type OptionalToRequire<T> = { [K in keyof T]-?: T[K] };