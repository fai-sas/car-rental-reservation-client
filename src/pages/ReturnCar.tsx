import { Button, Modal, Table, TableProps } from 'antd'
import {
  useDeleteCarMutation,
  useGetAllCarsQuery,
  useReturnCarMutation,
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
import FormTimePicker from '../components/Form/FormTimePicker'
import FormController from '../components/Form/FormController'
import moment from 'moment'

const ReturnCar = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined)
  const { data: bookings, isFetching } = useGetAllBookingsQuery(undefined)

  const tableData = bookings?.data?.map(
    ({ _id, user, car, date, status, startTime }) => ({
      key: _id,
      user: user?.name,
      car: car?.name,
      status: car?.status,
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
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
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
        return <ReturnCarModal bookingInfo={item} />
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

export default ReturnCar

const ReturnCarModal = ({ bookingInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [returnCar] = useReturnCarMutation()

  const status = bookingInfo?.status

  const handleSubmit = async (data) => {
    try {
      const bookingData = {
        bookingId: bookingInfo.key,
        endTime: data.endTime,
      }
      console.log('submitted data:', bookingData)

      returnCar(bookingData)
      toast.success('Car Returned Successfully!')
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
      <Button
        type='primary'
        disabled={status === 'available'}
        onClick={showModal}
      >
        Return Car
      </Button>
      <Modal
        title='Return Car'
        open={isModalOpen}
        destroyOnClose
        onCancel={handleCancel}
        footer={null}
      >
        <FormController onSubmit={handleSubmit}>
          <FormTimePicker name='endTime' label='End Time' />
          <Button htmlType='submit'>Return Car</Button>
        </FormController>
      </Modal>
    </>
  )
}
