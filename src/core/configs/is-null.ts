/**
 * Checks if a value is null.
 *
 * @param value - The value to check
 * @returns Returns true if value is null, else false
 *
 * @example
 * isNull(null) // => true
 * isNull(undefined) // => false
 * isNull('') // => false
 * isNull(0) // => false
 * isNull(false) // => false
 */
export const isNull = (value: unknown): value is null => {
  return value === null
}

export default isNull
