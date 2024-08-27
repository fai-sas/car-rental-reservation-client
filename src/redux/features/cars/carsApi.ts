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
    // getAllCars: builder.query({
    //   query: (args) => {
    //     console.log(args)

    //     const params = new URLSearchParams()

    //     if (args) {
    //       Object.keys(args).forEach((key) => {
    //         if (Array.isArray(args[key])) {
    //           args[key].forEach((item) => {
    //             params.append(key, item)
    //           })
    //         } else {
    //           params.append(key, args[key])
    //         }
    //       })
    //     }

    //     return {
    //       url: '/cars',
    //       method: 'GET',
    //       params: params,
    //     }
    //   },
    //   providesTags: ['cars'],
    //   transformResponse: (response) => {
    //     return {
    //       data: response.data,
    //       meta: response.meta,
    //     }
    //   },
    // }),
    getAllCars: builder.query({
      query: (args) => {
        // Log the incoming arguments to understand what's being received
        console.log('Received Query Args:', args)

        // Initialize URLSearchParams object
        const params = new URLSearchParams()

        // Add parameters only if they have a meaningful value
        if (args) {
          Object.keys(args).forEach((key) => {
            const value = args[key]

            // Check if the value is valid (not empty, null, or default)
            if (Array.isArray(value) && value.length > 0) {
              // Append array items if the array has elements
              value.forEach((item) => {
                params.append(key, item)
              })
            } else if (value && value !== '' && value !== '0,1000') {
              // Append only if value is not empty or default (adjust based on your specific defaults)
              params.append(key, value)
            }
          })
        }

        // Log the final params to see what's actually being sent to the API
        console.log('Final Query Params:', params.toString())

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
