import { ExampleBrowseSortBy } from '@/config/enum'
import { BaseResponse, Metadata } from '@/types/common'

export interface Example {
  xid: string
  name: string
  email: string
  phone: string
  city: string
  avatarUrl: string
  statusId: number
  createdAt: number
  updatedAt: number
}

export type ExampleBrowse = {
  items: Example[]
  metadata: Metadata
}

export type ExampleBrowseRequest = {
  sortBy: ExampleBrowseSortBy
  skip: number
  limit: number
}

export type ExampleBrowseResponse = BaseResponse<ExampleBrowse>
export type ExampleDetailResponse = BaseResponse<Example>
