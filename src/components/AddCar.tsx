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
    <div data-aos='fade-up' data-aos-duration='1000'>
      <h1 className='p-12 text-4xl font-bold '>Add Car</h1>
      <article>
        <Flex justify='center' align='center'>
          <Col span={12}>
            <FormController
              onSubmit={onSubmit}
              resolver={zodResolver(addCarValidationSchema)}
            >
              <Row gutter={16}>
                <Col xs={24} lg={12}>
                  <FormInput type='text' name='name' label='Name' />
                </Col>
                <Col xs={24} lg={12}>
                  <FormInput
                    type='text'
                    name='description'
                    label='Description'
                  />
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} lg={12}>
                  <FormInput type='text' name='color' label='Color' />
                </Col>
                <Col xs={24} lg={12}>
                  <FormInput type='text' name='image' label='Image' />
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} lg={12}>
                  <FormInput type='text' name='model' label='Model' />
                </Col>
                <Col xs={24} lg={12}>
                  <FormInput
                    type='number'
                    name='pricePerHour'
                    label='Price Per Hour'
                  />
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} lg={12}>
                  <FormInput type='number' name='year' label='Year' />
                </Col>
                <Col xs={24} lg={12}>
                  <FormInput type='number' name='seats' label='Seats' />
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} lg={12}>
                  <FormSelect
                    options={statusOptions}
                    name='status'
                    label='Status'
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <FormSelect
                    options={carTypeOptions}
                    name='carType'
                    label='Car Type'
                  />
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} lg={12}>
                  <FormSelect
                    options={fuelOptions}
                    name='fuelType'
                    label='Fuel Type'
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <FormSelect
                    options={transmissionOptions}
                    name='transmission'
                    label='Transmission'
                  />
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} lg={12}>
                  <FormSelect
                    options={locationOptions}
                    name='location'
                    label='Location'
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <FormSelect
                    mode='multiple'
                    options={featuresOptions}
                    name='features'
                    label='Features'
                  />
                </Col>
              </Row>

              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            </FormController>
          </Col>
        </Flex>
      </article>
    </div>
  )
}

export default AddCar
