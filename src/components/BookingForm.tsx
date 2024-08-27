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
import { featuresOptions, paymentOptions } from '../utils/selectOptions'
import Header from './Header'
import { useGetAllCarsQuery } from '../redux/features/cars/carsApi'

const BookingForm = () => {
  const { id } = useParams() // Get carId from URL params
  const { data } = useGetAllCarsQuery(undefined) // Fetch all cars data

  // Create options for FormSelect with car names as labels and IDs as values
  const carOptions = data?.data?.map((car) => ({
    label: car.name,
    value: car._id,
  }))

  // Find the car option that matches the carId from the URL
  const selectedCar = carOptions?.find((car) => car.value === id)

  // Default values for the form
  const defaultValue = {
    car: selectedCar ? selectedCar.value : '', // Use car ObjectId if found, else empty
  }

  const [createBooking] = useCreateBookingMutation()

  // Form submit handler
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const bookingData = {
      ...data,
      startTime: moment(new Date(data.startTime)).format('HH:mm'),
      endTime: moment(new Date(data.startTime)).format('HH:mm'),
    }

    try {
      const res = (await createBooking(bookingData)) as TResponse<any>
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
    <>
      <Header />
      <div data-aos='fade-up' data-aos-duration='1000'>
        <h1 className='p-12 text-4xl font-bold text-center'>Book Your Car</h1>
        <Flex justify='center' align='center'>
          <Col span={12}>
            <FormController onSubmit={onSubmit} defaultValues={defaultValue}>
              <Row gutter={16}>
                <Col span={12}>
                  <FormSelect
                    options={carOptions}
                    name='car'
                    label='Car'
                    defaultValue={selectedCar?.value}
                    disabled
                  />
                </Col>
                <Col span={12}>
                  <FormDatePicker name='date' label='Date' />
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <FormTimePicker name='startTime' label='Start Time' />
                </Col>
                <Col span={12}>
                  <FormInput type='text' name='nid' label='NID' />
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <FormInput
                    type='text'
                    name='drivingLicense'
                    label='Driving License'
                  />
                </Col>
                <Col span={12}>
                  <FormSelect
                    options={paymentOptions}
                    name='paymentInfo'
                    label='Payment Info'
                  />
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <FormSelect
                    mode='multiple'
                    options={featuresOptions}
                    name='additionalOptions'
                    label='Additional Options'
                  />
                </Col>
              </Row>

              <Button type='primary' htmlType='submit'>
                Create Booking
              </Button>
            </FormController>
          </Col>
        </Flex>
      </div>
    </>
  )
}

export default BookingForm
