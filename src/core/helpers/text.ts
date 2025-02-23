/**
 * Removes extra whitespace and trims a string
 * @param value The input string to clean
 * @returns Cleaned string with normalized spacing
 */
export const trimText = (value: string): string => {
  if (!value) {
    return ''
  }

  return value.replace(/\s+/g, ' ').trim()
}
