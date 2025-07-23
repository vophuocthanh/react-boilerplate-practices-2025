/**
 * Checks if a value is undefined.
 *
 * @param value - The value to check
 * @returns Returns true if value is undefined, else false
 *
 * @example
 * ```typescript
 * isUndefined(undefined) // => true
 * isUndefined(null) // => false
 * isUndefined('') // => false
 * isUndefined(0) // => false
 * ```
 */
export const isUndefined = (value: unknown): value is undefined => {
  return value === undefined
}

export default isUndefined
