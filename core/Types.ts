/**
 * @see https://hackernoon.com/mastering-type-safe-json-serialization-in-typescript
 */
export type JSONPrimitive = string | number | boolean | null | undefined;

export type JSONValue = JSONPrimitive | JSONValue[] | {
    [key: string]: JSONValue;
};

export type NotAssignableToJson =
    | bigint
    | symbol
    | Function;

export type JSONCompatible<T> = unknown extends T ? never : {
    [P in keyof T]: T[P] extends JSONValue ? T[P] : T[P] extends NotAssignableToJson ? never : JSONCompatible<T[P]>;
};

/**
 * Filter methods of a type
 */
export type FilterMethods<T> = { [K in keyof T as T[K] extends (...args: any[]) => any ? K : never]: T[K] };

/**
 * Filter properties of a type
 */
export type FilterProperties<T> = { [K in keyof T as T[K] extends (...args: any[]) => any ? never : K]: T[K] };
