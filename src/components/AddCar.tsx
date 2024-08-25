/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button, Col, Flex, Row } from 'antd'
import FormController from './Form/FormController'
import FormInput from './Form/FormInput'
import FormSelect from './Form/FormSelect'
import toast from 'react-hot-toast'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { useAddCarMutation } from '../redux/features/cars/carsApi'
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

const AddCar = () => {
  const [addCar] = useAddCarMutation()

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const carData = {
      ...data,
      image: data.image,
      pricePerHour: Number(data.pricePerHour),
      seats: Number(data.seats),
      year: Number(data.year),
    }

    console.log(carData)

    try {
      const res = (await addCar(carData)) as TResponse<any>
      console.log(res)
      if (res.error) {
        toast.error(res?.error?.data?.message)
      } else {
        toast.success('Car Added')
      }
    } catch (err) {
      toast.error('Something went wrong')
    }
  }

  return (
    <div>
      <h1 className='p-12 text-4xl font-bold '>Add Car</h1>
      <article>
        <Flex justify='center' align='center'>
          <Col span={6}>
            <FormController
              onSubmit={onSubmit}
              resolver={zodResolver(addCarValidationSchema)}
            >
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
              <Button htmlType='submit'>Submit</Button>
            </FormController>
          </Col>
        </Flex>
      </article>
    </div>
  )
}

export default AddCar
