import { FieldValues, SubmitHandler } from 'react-hook-form'
import FormController from '../Form/FormController'

import FormDatePicker from '../Form/FormDatePicker'
import { Button, Col, Row } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { locationOptions } from '../../utils/selectOptions'
import FormSelect from '../Form/FormSelect'

const Hero = () => {
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    navigate('/booking')
  }

  return (
    <section className="relative w-full h-screen bg-cover bg-center bg-[url('https://images.pexels.com/photos/627678/pexels-photo-627678.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]">
      <div className='absolute inset-0 flex flex-col items-center justify-center bg-black/50'>
        <h1 className='mb-6 text-5xl font-bold text-center text-white'>
          Discover Your Perfect Ride
        </h1>
        <Link to='/booking'>
          <button className='px-8 py-4 mb-8 text-lg text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700'>
            Book Now
          </button>
        </Link>
        <div className='w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg'>
          <FormController onSubmit={onSubmit}>
            <Row gutter={16}>
              <Col span={12}>
                <FormSelect
                  options={locationOptions}
                  name='location'
                  label='Location'
                />
              </Col>
              <Col span={12}>
                <FormDatePicker name='date' label='Date' />
              </Col>
            </Row>
            <Row gutter={16} className='mt-4'>
              <Col span={24} className='flex justify-center'>
                <Button htmlType='submit'>Check Availability</Button>
              </Col>
            </Row>
          </FormController>
        </div>
      </div>
    </section>
  )
}

export default Hero
