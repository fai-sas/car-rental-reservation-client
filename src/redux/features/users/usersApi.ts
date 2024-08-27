import { baseApi } from '../baseApi'

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (args) => {
        const params = new URLSearchParams()
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value as string)
          })
        }
        return {
          url: '/auth',
          method: 'GET',
          params: params,
        }
      },
      providesTags: ['users'],
      transformResponse: (response) => {
        return {
          data: response.data,
          meta: response.meta,
        }
      },
    }),
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/auth/${id}`,
        method: 'GET',
      }),
      invalidatesTags: ['users'],
    }),
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/auth/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['users'],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/auth/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['users'],
    }),
  }),
})

export const {
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi
