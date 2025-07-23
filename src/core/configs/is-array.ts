/**
 * Checks if a value is an array.
 *
 * @param value - The value to check
 * @returns Returns true if value is an array, else false
 *
 * @example
 * ```typescript
 * isArray([1, 2, 3]) // => true
 * isArray('abc') // => false
 * isArray(null) // => false
 * isArray(undefined) // => false
 * isArray({}) // => false
 * ```
 */
export const isArray = (value: unknown): value is unknown[] => {
  return Array.isArray(value)
}

export default isArray
