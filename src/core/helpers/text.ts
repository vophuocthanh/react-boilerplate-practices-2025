export const trimText = (value: string) => {
  if (!value) return ''
  return value.replace(/\s+/g, ' ').trim()
}
