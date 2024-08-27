import { baseApi } from '../baseApi'

const carsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (data) => ({
        url: '/bookings',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['bookings'],
    }),
    getAllBookings: builder.query({
      query: (args) => {
        const params = new URLSearchParams()

        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value as string)
          })
        }
        return {
          url: '/bookings',
          method: 'GET',
          params: params,
        }
      },
      providesTags: ['bookings'],
      transformResponse: (response) => {
        return {
          data: response.data,
          meta: response.meta,
        }
      },
    }),
    getSingleBooking: builder.query({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: 'GET',
      }),
      invalidatesTags: ['bookings'],
    }),
    getMyBooking: builder.query({
      query: () => ({
        url: `/bookings/my-bookings`,
        method: 'GET',
      }),
      invalidatesTags: ['bookings'],
    }),
    updateBooking: builder.mutation({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['bookings'],
    }),
    deleteBooking: builder.mutation({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['bookings', 'cars'],
    }),
    makePayment: builder.mutation({
      query: (data) => ({
        url: '/payment/create-payment',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['bookings'],
    }),
  }),
})

export const {
  useCreateBookingMutation,
  useGetAllBookingsQuery,
  useGetSingleBookingQuery,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
  useGetMyBookingQuery,
  useMakePaymentMutation,
} = carsApi
