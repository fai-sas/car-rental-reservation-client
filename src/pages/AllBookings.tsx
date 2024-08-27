import { Button, Table, TableProps } from 'antd'
import {
  useDeleteCarMutation,
  useGetAllCarsQuery,
} from '../redux/features/cars/carsApi'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { TQueryParam } from '../types'
import {
  useDeleteBookingMutation,
  useGetAllBookingsQuery,
  useUpdateBookingMutation,
} from '../redux/features/booking/bookingApi'

const AllBookings = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined)

  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const { data: bookings, isFetching } = useGetAllBookingsQuery(undefined)

  const [deleteBooking] = useDeleteBookingMutation()
  const [updateBooking] = useUpdateBookingMutation()

  const handleUpdate = async (bookingId: string) => {
    try {
      if (bookingId) {
        await updateBooking(bookingId)
      }
      setConfirmDelete(null)
      toast.success('Booking Approved!')
    } catch (error) {
      console.log(error)

      toast.error('Something went wrong')
    }
  }

  const handleDelete = async (bookingId: string) => {
    try {
      if (bookingId) {
        await deleteBooking(bookingId)
      }
      setConfirmDelete(null)
      toast.error('Booking Deleted!')
    } catch (error) {
      console.log(error)

      toast.error('Something went wrong')
    }
  }

  const tableData = bookings?.data?.map(
    ({ _id, user, car, date, isApproved, startTime }) => ({
      key: _id,
      isApproved,
      user: user?.name,
      car: car?.name,
      date,
      startTime,
    })
  )

  console.log(tableData)

  const columns = [
    {
      title: 'Customer',
      key: 'user',
      dataIndex: 'user',
    },
    {
      title: 'Car',
      key: 'isApproved',
      dataIndex: 'isApproved',
    },
    {
      title: 'Approved',
      key: 'car',
      dataIndex: 'car',
    },
    {
      title: 'Date',
      key: 'date',
      dataIndex: 'date',
    },
    {
      title: 'Start Time',
      key: 'startTime',
      dataIndex: 'startTime',
    },
    {
      title: 'Action',
      key: 'x',
      render: (item) => {
        console.log(item)

        return (
          <Button
            disabled={item.isApproved}
            type='primary'
            onClick={() => handleUpdate(item.key)}
          >
            Approve Booking
          </Button>
        )
      },
    },
    {
      title: 'Action',
      key: 'x',
      render: (item) => {
        return (
          <>
            <Button
              type='primary'
              danger
              onClick={() => handleDelete(item.key)}
            >
              Cancel Booking
            </Button>
            {confirmDelete === item.key && (
              <div className='absolute p-4 bg-white rounded shadow-lg'>
                <p>Are you sure you want to delete this booking?</p>
                <button
                  className='px-2 py-1 mr-2 text-white bg-green-500 rounded'
                  onClick={() => handleDelete(item.key)}
                >
                  Yes
                </button>
                <button
                  className='px-2 py-1 text-white bg-gray-500 rounded'
                  onClick={() => setConfirmDelete(null)}
                >
                  No
                </button>
              </div>
            )}
          </>
        )
      },
    },
  ]

  const onChange: TableProps<TTableData>['onChange'] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === 'filter') {
      const queryParams: TQueryParam[] = []
      setParams(queryParams)
    }
  }

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
    />
  )
}

export default AllBookings
