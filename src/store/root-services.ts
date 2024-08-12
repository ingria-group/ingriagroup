import example from '@/services/example'

const rootServices = {
  reducers: {
    // example
    [example.reducerPath]: example.reducer,
  },
  middlewares: [
    // example
    example.middleware,
  ],
}

export default rootServices
