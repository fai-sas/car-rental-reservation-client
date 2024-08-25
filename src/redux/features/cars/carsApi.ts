import { baseApi } from '../baseApi'

const carsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addCar: builder.mutation({
      query: (data) => ({
        url: '/cars',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['cars'],
    }),
    getAllCars: builder.query({
      query: (args) => {
        const params = new URLSearchParams()

        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value as string)
          })
        }
        return {
          url: '/cars',
          method: 'GET',
          params: params,
        }
      },
      providesTags: ['cars'],
      transformResponse: (response) => {
        return {
          data: response.data,
          meta: response.meta,
        }
      },
    }),
    getSingleCar: builder.query({
      query: (id) => ({
        url: `/cars/${id}`,
        method: 'GET',
      }),
      invalidatesTags: ['cars'],
    }),
    updateCar: builder.mutation({
      query: ({ id, data }) => ({
        url: `/cars/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['cars'],
    }),
    deleteCar: builder.mutation({
      query: (id) => ({
        url: `/cars/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['cars'],
    }),
  }),
})

export const {
  useGetAllCarsQuery,
  useAddCarMutation,
  useGetSingleCarQuery,
  useDeleteCarMutation,
  useUpdateCarMutation,
} = carsApi
