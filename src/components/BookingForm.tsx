/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button, Col, Flex, Row } from 'antd'
import moment from 'moment'
import FormController from './Form/FormController'
import FormInput from './Form/FormInput'
import toast from 'react-hot-toast'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { TResponse } from '../types'
import {
  useCreateBookingMutation,
  useGetAllBookingsQuery,
} from '../redux/features/booking/bookingApi'
import FormTimePicker from './Form/FormTimePicker'
import FormDatePicker from './Form/FormDatePicker'
import FormSelect from './Form/FormSelect'
import { useGetAllCarsQuery } from '../redux/features/cars/carsApi'

const BookingForm = () => {
  const [createBooking] = useCreateBookingMutation()
  const { data: cars, isLoading } = useGetAllCarsQuery(undefined)

  const carOptions = cars?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }))

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const bookingData = {
      ...data,
      // date: moment(new Date(data.date)).format('"D MMM Y"'),
      // date: moment(new Date(data.date)).format('"YYYY-MM-DD"'),
      startTime: moment(new Date(data.startTime)).format('HH:mm'),
      endTime: moment(new Date(data.startTime)).format('HH:mm'),
    }

    console.log(bookingData)

    try {
      const res = (await createBooking(bookingData)) as TResponse<any>
      console.log(res)
      if (res.error) {
        toast.error(res?.error?.data?.message)
      } else {
        toast.success('Booking Successfully Created')
      }
    } catch (err) {
      toast.error('Something went wrong')
    }
  }

  return (
    <div>
      <h1 className='p-12 text-4xl font-bold '> Booking Form</h1>
      <Flex justify='center' align='center'>
        <Col span={12}>
          <FormController onSubmit={onSubmit}>
            <FormSelect options={carOptions} name='car' label='Car' />
            <Row>
              <FormDatePicker name='date' label='Date' />
            </Row>

            <Row>
              <FormTimePicker name='startTime' label='Start Time' />
              <FormTimePicker name='endTime' label='End Time' />
            </Row>

            <Button htmlType='submit'>Create Booking</Button>
          </FormController>
        </Col>
      </Flex>
    </div>
  )
}

export default BookingForm
