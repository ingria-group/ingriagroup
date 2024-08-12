export type Metadata = {
  limit: string
  skip: string
  sortBy: string
  count: number
}

export type ModifiedBy = {
  id: string
  fullName: string
  role: string
}

export type BaseResponse<D> = {
  success: boolean
  code: string
  message: string
  data: D
}
