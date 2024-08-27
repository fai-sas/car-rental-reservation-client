import { Button, Modal, Table, TableProps } from 'antd'
import {
  useDeleteBookingMutation,
  useGetMyBookingQuery,
  useMakePaymentMutation,
} from '../redux/features/booking/bookingApi'
import { useState } from 'react'
import { TQueryParam } from '../types'
import { useAppSelector } from '../redux/hooks'
import { selectCurrentUser } from '../redux/features/auth/authSlice'
import toast from 'react-hot-toast'
import FormController from '../components/Form/FormController'
import moment from 'moment'

const BookingHistory = () => {
  const user = useAppSelector(selectCurrentUser)
  const [makePayment] = useMakePaymentMutation()
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined)

  const { data: bookings, isFetching } = useGetMyBookingQuery(undefined)
  console.log(bookings)

  const tableData = bookings?.data?.map(
    ({ _id, user, car, date, startTime, endTime, totalCost, isApproved }) => ({
      key: _id,
      user: user?.name,
      car: car?.name,
      date,
      startTime,
      endTime,
      totalCost,
      isApproved,
    })
  )

  const handleSubmit = async (data) => {
    try {
      const selectedBooking = bookings?.data?.find(
        (booking) => booking._id === data._id
      )
      const paymentData = {
        user: {
          name: user?.name,
          phone: '01717123456',
          email: user?.email,
        },
        totalPrice: selectedBooking?.totalCost,
      }
      console.log(paymentData)

      const res = await makePayment(paymentData).unwrap()
      if (res.success) {
        console.log(res)
        window.location.href = res?.data?.payment_url
      } else {
        console.error('Order creation failed:', res?.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const columns = [
    {
      title: 'Name',
      key: 'user',
      dataIndex: 'user',
    },
    {
      title: 'Car',
      key: 'car',
      dataIndex: 'car',
    },

    {
      title: 'Booking Date',
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
      title: 'End Time',
      key: 'endTime',
      dataIndex: 'endTime',
      render: (endTime) => moment(endTime, 'HH:mm').format('hh:mm A'),
    },
    {
      title: 'Total Cost',
      key: 'totalCost',
      dataIndex: 'totalCost',
      render: (totalCost) =>
        `$${Intl.NumberFormat('en-US', { style: 'decimal' }).format(
          totalCost
        )}`,
    },
    {
      title: 'Action',
      key: 'x',
      render: (item) => {
        return (
          <Button
            disabled={item.totalCost <= 0}
            type='primary'
            onClick={() => handleSubmit({ _id: item.key })}
          >
            Pay Now
          </Button>
        )
      },
    },
    {
      title: 'Action',
      key: 'x',
      render: (item) => {
        return <DeleteBookingModal bookingInfo={item} />
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
    <>
      <h1 className='pb-8 text-2xl font-bold'>My Bookings</h1>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
      />
    </>
  )
}

export default BookingHistory

const DeleteBookingModal = ({ bookingInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteBooking] = useDeleteBookingMutation()

  const isApproved = bookingInfo?.isApproved

  const handleSubmit = async (data) => {
    try {
      deleteBooking(bookingInfo?.key)
      toast.success('Booking Deleted Successfully!')
    } catch (error) {
      console.log(error)

      toast.error('Something went wrong')
    }
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Button type='primary' danger disabled={isApproved} onClick={showModal}>
        Delete Booking
      </Button>
      <Modal
        title='Are You Sure?'
        open={isModalOpen}
        destroyOnClose
        onCancel={handleCancel}
        footer={null}
      >
        <FormController onSubmit={handleSubmit}>
          <Button htmlType='submit'>Delete Booking</Button>
        </FormController>
      </Modal>
    </>
  )
}
