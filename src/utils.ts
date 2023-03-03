// Infers return types from functions (needed to infer circular dependencies with args correctly)
export type CleanType<T> = T extends object ? {
  [K in keyof T]: T[K] extends (args: any) => any ? CleanType<ReturnType<T[K]>> : CleanType<T[K]>
} : T

export type UnionToIntersection<T> =
  (T extends any ? (x: T) => any : never) extends
  (x: infer R) => any ? R : never

export type ArrayToEnum<T extends readonly any[]> = T[number]
export type TSEnumType = { [s: number]: string }
export type EnumToUnion<T extends TSEnumType> = keyof T

export function getEnumProperties(enumValue: TSEnumType) {
  return Object.keys(enumValue).filter((key) => isNaN(Number(key)))
}
