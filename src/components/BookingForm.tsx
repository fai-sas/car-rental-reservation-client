/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button, Col, Flex, Row } from 'antd'
import moment from 'moment'
import FormController from './Form/FormController'
import FormInput from './Form/FormInput'
import toast from 'react-hot-toast'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { TResponse } from '../types'
import { useCreateBookingMutation } from '../redux/features/booking/bookingApi'
import FormTimePicker from './Form/FormTimePicker'
import FormDatePicker from './Form/FormDatePicker'
import FormSelect from './Form/FormSelect'
import { useParams } from 'react-router-dom'

const BookingForm = () => {
  const { carId } = useParams()

  const defaultValue = {
    car: carId,
  }

  const [createBooking] = useCreateBookingMutation()

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
          <FormController onSubmit={onSubmit} defaultValues={defaultValue}>
            <FormInput type='text' name='car' label='car' />

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
