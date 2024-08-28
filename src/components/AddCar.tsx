/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button, Col, Flex, Row } from 'antd'
import FormController from './Form/FormController'
import FormInput from './Form/FormInput'
import FormSelect from './Form/FormSelect'
import toast from 'react-hot-toast'
import {
  FieldValues,
  SubmitHandler,
  useForm,
  FormProvider,
} from 'react-hook-form'
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
import { useState } from 'react'

const AddCar = () => {
  const [addCar] = useAddCarMutation()
  const [uploading, setUploading] = useState(false)

  const methods = useForm({
    resolver: zodResolver(addCarValidationSchema),
  })

  const { register, handleSubmit, setValue, control } = methods

  const handleImageUpload = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append(
      'upload_preset',
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    )

    try {
      setUploading(true)
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      )

      const data = await res.json()
      setUploading(false)

      if (data.secure_url) {
        setValue('image', data.secure_url)
        toast.success('Image uploaded successfully')
      } else {
        throw new Error('Failed to upload image')
      }
    } catch (err) {
      setUploading(false)
      toast.error('Image upload failed')
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const carData = {
      ...data,
      pricePerHour: Number(data.pricePerHour),
      seats: Number(data.seats),
      year: Number(data.year),
    }

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
      <h1 className='p-12 text-4xl font-bold dark:text-gray-200 '>Add Car</h1>
      <article>
        <Flex justify='center' align='center'>
          <Col span={12}>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Row gutter={16}>
                  <Col xs={24} lg={12}>
                    <FormInput
                      type='text'
                      name='name'
                      label='Name'
                      register={register}
                      control={control}
                    />
                  </Col>
                  <Col xs={24} lg={12}>
                    <FormInput
                      type='text'
                      name='description'
                      label='Description'
                      register={register}
                      control={control}
                    />
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} lg={12}>
                    <FormInput
                      type='text'
                      name='color'
                      label='Color'
                      register={register}
                      control={control}
                    />
                  </Col>
                  <Col xs={24} lg={12}>
                    {/* File input for image upload */}
                    <p className='pb-1'>Upload Image</p>
                    <input
                      type='file'
                      accept='image/*'
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleImageUpload(e.target.files[0])
                        }
                      }}
                    />

                    <input type='hidden' {...register('image')} />
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} lg={12}>
                    <FormInput
                      type='text'
                      name='model'
                      label='Model'
                      register={register}
                      control={control}
                    />
                  </Col>
                  <Col xs={24} lg={12}>
                    <FormInput
                      type='number'
                      name='pricePerHour'
                      label='Price Per Hour'
                      register={register}
                      control={control}
                    />
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} lg={12}>
                    <FormInput
                      type='number'
                      name='year'
                      label='Year'
                      register={register}
                      control={control}
                    />
                  </Col>
                  <Col xs={24} lg={12}>
                    <FormInput
                      type='number'
                      name='seats'
                      label='Seats'
                      register={register}
                      control={control}
                    />
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} lg={12}>
                    <FormSelect
                      options={statusOptions}
                      name='status'
                      label='Status'
                      control={control}
                    />
                  </Col>
                  <Col xs={24} lg={12}>
                    <FormSelect
                      options={carTypeOptions}
                      name='carType'
                      label='Car Type'
                      control={control}
                    />
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} lg={12}>
                    <FormSelect
                      options={fuelOptions}
                      name='fuelType'
                      label='Fuel Type'
                      control={control}
                    />
                  </Col>
                  <Col xs={24} lg={12}>
                    <FormSelect
                      options={transmissionOptions}
                      name='transmission'
                      label='Transmission'
                      control={control}
                    />
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} lg={12}>
                    <FormSelect
                      options={locationOptions}
                      name='location'
                      label='Location'
                      control={control}
                    />
                  </Col>
                  <Col xs={24} lg={12}>
                    <FormSelect
                      mode='multiple'
                      options={featuresOptions}
                      name='features'
                      label='Features'
                      control={control}
                    />
                  </Col>
                </Row>

                {/* Ant Design Button correctly wired to submit the form */}
                <Button type='primary' htmlType='submit' loading={uploading}>
                  {uploading ? 'Uploading...' : 'Submit'}
                </Button>
              </form>
            </FormProvider>
          </Col>
        </Flex>
      </article>
    </div>
  )
}

export default AddCar
