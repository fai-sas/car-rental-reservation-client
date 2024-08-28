/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button, Col, Flex, Row } from 'antd'
import FormController from './Form/FormController'
import FormInput from './Form/FormInput'
import FormSelect from './Form/FormSelect'
import toast from 'react-hot-toast'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import {
  useGetSingleCarQuery,
  useUpdateCarMutation,
} from '../redux/features/cars/carsApi'
import { TResponse } from '../types'
import { addCarValidationSchema } from '../schemas/CarSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  carTypeOptions,
  featuresOptions,
  fuelOptions,
  locationOptions,
  statusOptions,
  transmissionOptions,
} from '../utils/selectOptions'
import { useParams } from 'react-router-dom'

const EditCar = () => {
  const { carId } = useParams<{ carId: string }>()
  const { data: singleCar, isLoading, isError } = useGetSingleCarQuery(carId)

  const [updateCar] = useUpdateCarMutation()

  const defaultValues = {
    name: singleCar?.data?.name,
    description: singleCar?.data?.description,
    color: singleCar?.data?.color,
    status: singleCar?.data?.status,
    carType: singleCar?.data?.carType,
    features: singleCar?.data?.features,
    pricePerHour: singleCar?.data?.pricePerHour,
    location: singleCar?.data?.location,
    image: singleCar?.data?.image,
    year: singleCar?.data?.year,
    model: singleCar?.data?.model,
    seats: singleCar?.data?.seats,
    fuelType: singleCar?.data?.fuelType,
    transmission: singleCar?.data?.transmission,
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    await updateCar({ id: carId, data })
    toast.success('Car Edited Successfully!')
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error loading car</div>
  }

  return (
    <div>
      <h1 className='p-12 text-4xl font-bold '>Edit Car</h1>
      <article>
        <Flex justify='center' align='center'>
          <Col xs={24} sm={22} md={20} lg={16} xl={14}>
            <FormController onSubmit={onSubmit} defaultValues={defaultValues}>
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <FormInput type='text' name='name' label='Name' />
                </Col>
                <Col xs={24} md={12}>
                  <FormInput
                    type='text'
                    name='description'
                    label='Description'
                  />
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <FormInput type='text' name='color' label='Color' />
                </Col>
                <Col xs={24} md={12}>
                  <FormInput type='text' name='image' label='Image' />
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <FormInput type='text' name='model' label='Model' />
                </Col>
                <Col xs={24} md={12}>
                  <FormInput
                    type='number'
                    name='pricePerHour'
                    label='Price Per Hour'
                  />
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <FormInput type='number' name='year' label='Year' />
                </Col>
                <Col xs={24} md={12}>
                  <FormInput type='number' name='seats' label='Seats' />
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <FormSelect
                    options={statusOptions}
                    name='status'
                    label='Status'
                  />
                </Col>
                <Col xs={24} md={12}>
                  <FormSelect
                    options={carTypeOptions}
                    name='carType'
                    label='Car Type'
                  />
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <FormSelect
                    options={fuelOptions}
                    name='fuelType'
                    label='Fuel Type'
                  />
                </Col>
                <Col xs={24} md={12}>
                  <FormSelect
                    options={transmissionOptions}
                    name='transmission'
                    label='Transmission'
                  />
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <FormSelect
                    options={locationOptions}
                    name='location'
                    label='Location'
                  />
                </Col>
                <Col xs={24} md={12}>
                  <FormSelect
                    mode='multiple'
                    options={featuresOptions}
                    name='features'
                    label='Features'
                  />
                </Col>
              </Row>

              <Button type='primary' htmlType='submit'>
                Update Car
              </Button>
            </FormController>
          </Col>
        </Flex>
      </article>
    </div>
  )
}

export default EditCar
