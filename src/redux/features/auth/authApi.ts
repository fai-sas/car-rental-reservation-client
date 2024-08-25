import { baseApi } from '../baseApi'

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: '/auth/signup',
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (userInfo) => ({
        url: '/auth/signin',
        method: 'POST',
        body: userInfo,
      }),
    }),
  }),
})

export const { useRegisterMutation, useLoginMutation } = authApi
