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
import moment from 'moment'

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
      toast.success('Booking Approval Updated!')
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

  const columns = [
    {
      title: 'Customer',
      key: 'user',
      dataIndex: 'user',
    },
    {
      title: 'Car',
      key: 'car',
      dataIndex: 'car',
    },
    {
      title: 'Approved',
      key: 'isApproved',
      dataIndex: 'isApproved',
      render: (isApproved) => (isApproved ? 'Approved' : 'Pending'),
    },
    {
      title: 'Date',
      key: 'date',
      dataIndex: 'date',
      render: (date) => moment(date).format('D MMMM  YYYY'),
    },
    {
      title: 'Start Time',
      key: 'startTime',
      dataIndex: 'startTime',
      render: (startTime) => moment(startTime, 'HH:mm').format('hh:mm A'),
    },
    {
      title: 'Action',
      key: 'x',
      render: (item) => {
        return (
          <Button
            // type='primary'
            type={item?.isApproved ? 'primary' : 'default dashed'}
            onClick={() => handleUpdate(item.key)}
          >
            {item?.isApproved ? 'UnApprove Booking' : 'Approve Booking'}
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
