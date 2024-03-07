export interface PaginationRequest {
  page: number | Ref<number>
  take: number | Ref<number>
}

export interface PaginationResponse<T> {
  items: T[]
  pages: number
}