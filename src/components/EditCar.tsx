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
          <Col span={6}>
            <FormController onSubmit={onSubmit} defaultValues={defaultValues}>
              <Row>
                <FormInput type='text' name='name' label='Name' />
                <FormInput type='text' name='description' label='Description' />
              </Row>

              <Row>
                <FormInput type='text' name='color' label='Color' />
                <FormInput type='text' name='image' label='Image' />
              </Row>
              <Row>
                <FormInput type='text' name='model' label='Model' />
                <FormInput
                  type='number'
                  name='pricePerHour'
                  label='Price Per Hour'
                />
              </Row>
              <Row>
                <FormInput type='number' name='year' label='Year' />
                <FormInput type='number' name='seats' label='Seats' />
              </Row>
              <FormSelect
                options={statusOptions}
                name='status'
                label='Status'
              />
              <FormSelect
                options={carTypeOptions}
                name='carType'
                label='Car Type'
              />
              <Row>
                <FormSelect
                  options={fuelOptions}
                  name='fuelType'
                  label='Fuel Type'
                />
                <FormSelect
                  options={transmissionOptions}
                  name='transmission'
                  label='Transmission'
                />
              </Row>
              <Row>
                <FormSelect
                  options={locationOptions}
                  name='location'
                  label='Location'
                />
                <FormSelect
                  mode='multiple'
                  options={featuresOptions}
                  name='features'
                  label='Features'
                />
              </Row>
              <Button htmlType='submit'>Update Car</Button>
            </FormController>
          </Col>
        </Flex>
      </article>
    </div>
  )
}

export default EditCar
