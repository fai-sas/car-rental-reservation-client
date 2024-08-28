import { useParams } from 'react-router-dom'
import {
  useGetSingleBookingQuery,
  useModifyBookingMutation,
} from '../redux/features/booking/bookingApi'
import toast from 'react-hot-toast'
import { Button, Col, Flex, Row } from 'antd'
import moment from 'moment'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { TResponse } from '../types'
import FormController from '../components/Form/FormController'
import FormSelect from '../components/Form/FormSelect'
import FormTimePicker from '../components/Form/FormTimePicker'
import FormInput from '../components/Form/FormInput'
import { featuresOptions, paymentOptions } from '../utils/selectOptions'
import FormDatePicker from '../components/Form/FormDatePicker'

const EditBooking = () => {
  const { singleBookingId } = useParams<{ singleBookingId: string }>()
  const {
    data: singleBooking,
    isLoading,
    isError,
  } = useGetSingleBookingQuery(singleBookingId)

  const [modifyBooking] = useModifyBookingMutation()

  const defaultValue = {
    car: singleBooking?.data?.car,
    date: moment(singleBooking?.data?.date),
    startTime: moment(singleBooking?.data?.startTime, 'HH:mm'),
    nid: singleBooking?.data?.nid,
    drivingLicense: singleBooking?.data?.drivingLicense,
    paymentInfo: singleBooking?.data?.paymentInfo,
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const bookingData = {
      ...data,
      startTime: moment(new Date(data.startTime)).format('HH:mm'),
      endTime: moment(new Date(data.startTime)).format('HH:mm'),
    }

    console.log(bookingData)

    try {
      const res = (await modifyBooking({
        id: singleBookingId,
        payload: bookingData,
      })) as TResponse<any>

      if (res.error) {
        toast.error(res?.error?.data?.message)
      } else {
        toast.success('Booking Successfully Updated')
      }
    } catch (err) {
      toast.error('Something went wrong')
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error loading car</div>
  }

  return (
    <div>
      <h1 className='p-12 text-4xl font-bold text-center'>
        Edit Your Booking of Car {singleBooking?.data?.car}
      </h1>
      <Flex justify='center' align='center'>
        <Col span={12}>
          <FormController onSubmit={onSubmit} defaultValues={defaultValue}>
            <Row gutter={16}>
              <Col span={12}>
                <FormInput type='text' name='car' label='Name' disabled />
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
              Update Booking
            </Button>
          </FormController>
        </Col>
      </Flex>
    </div>
  )
}

export default EditBooking
