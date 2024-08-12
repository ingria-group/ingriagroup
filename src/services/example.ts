import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

import { ExampleBrowseRequest, ExampleBrowseResponse, ExampleDetailResponse } from '@/types/example'
import { mockApiBaseQuery } from '@/utils/api'

const api = createApi({
  reducerPath: 'example',
  baseQuery: mockApiBaseQuery,
  tagTypes: ['Example'],
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 259200, // 3 days
  endpoints: (builder) => ({
    getListExample: builder.query<ExampleBrowseResponse, ExampleBrowseRequest>({
      query: (params) => ({
        params,
        url: '/examples',
        providesTags: ['Example'],
      }),
    }),
    getDetailExample: builder.query<ExampleDetailResponse, string>({
      query: (xid) => ({
        url: `/examples/${xid}`,
      }),
      providesTags: ['Example'],
    }),
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
})

// Export hooks for usage in functional components
export const { useGetListExampleQuery, useGetDetailExampleQuery, util: exampleUtil } = api

export default api
