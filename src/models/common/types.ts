export type PaginationParams = {
  page: number
  size: number
  total: number
}

export type SortParams = {
  field: string
  order: 'asc' | 'desc'
}

export type ApiResponse<T> = {
  data: T
  message: string
  status: number
  success?: boolean
}

export type ApiError = {
  message: string
  status: number
  errors?: Record<string, string[]>
}
