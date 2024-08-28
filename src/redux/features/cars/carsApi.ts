import { TQueryParam, TResponseRedux } from '../../../types'
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
          Object.keys(args).forEach((key) => {
            const value = args[key]

            // Check if value is valid and append it to params
            if (Array.isArray(value) && value.length > 0) {
              value.forEach((item) => {
                params.append(key, item)
              })
            } else if (value && value !== '' && value !== '0,1000') {
              // Avoid empty strings or default ranges
              params.append(key, value)
            }
          })
        }

        return {
          url: `/cars?${params.toString()}`,
          method: 'GET',
        }
      },
      providesTags: ['cars'],
      transformResponse: (response) => ({
        data: response.data,
        meta: response.meta,
      }),
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
    returnCar: builder.mutation({
      query: (data) => ({
        url: `/cars/return`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['cars', 'bookings'],
    }),
  }),
})

export const {
  useGetAllCarsQuery,
  useAddCarMutation,
  useGetSingleCarQuery,
  useDeleteCarMutation,
  useUpdateCarMutation,
  useReturnCarMutation,
} = carsApi
