export type UnionToIntersection<T> =
  (T extends any ? (x: T) => any : never) extends
  (x: infer R) => any ? R : never

export type ArrayToEnum<T extends readonly any[]> = T[number]
export type TSEnumType = { [s: number]: string }
export type EnumToUnion<T extends TSEnumType> = keyof T

export function getEnumProperties(enumValue: TSEnumType) {
  return Object.keys(enumValue).filter((key) => isNaN(Number(key)))
}

export type ObjectToUnion<T> = T[keyof T]
export type MaybePromise<T> = T | Promise<T>
export type MaybeFunction<T> = T | (() => T) | (() => Promise<T>)

// Taken from Kysely
// See the tweet: https://twitter.com/Riyaadh_Abr/status/1622736576303312899
export type ExpandRecursively<T>
  = T extends Record<string, unknown> | Record<string, unknown>[] | readonly Record<string, unknown>[]
  ? T extends infer O
  ? { [K in keyof O]: ExpandRecursively<O[K]> }
  : never : T
