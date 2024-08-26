import { FieldValues, SubmitHandler } from 'react-hook-form'
import FormController from '../Form/FormController'
import FormInput from '../Form/FormInput'
import FormDatePicker from '../Form/FormDatePicker'
import { Button, Col, Row } from 'antd'

const Hero = () => {
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data)
  }

  return (
    <section className="relative w-full h-screen bg-cover bg-center bg-[url('https://images.pexels.com/photos/627678/pexels-photo-627678.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]">
      <div className='absolute inset-0 flex flex-col items-center justify-center bg-black/50'>
        <h1 className='mb-6 text-5xl font-bold text-center text-white'>
          Discover Your Perfect Ride
        </h1>
        <button className='px-8 py-4 mb-8 text-lg text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700'>
          Book Now
        </button>
        <div className='w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg'>
          <article className='flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-4'>
            <FormController onSubmit={onSubmit}>
              <Row>
                <FormInput type='text' name='location' label='Location' />
                <FormDatePicker name='date' label='Date' />
                {/* <input
                type='text'
                placeholder='Location'
                className='w-full p-4 border border-gray-300 rounded-lg md:w-1/3 focus:outline-none'
              />
              <input
                type='date'
                placeholder='Pick-up Date'
                className='w-full p-4 border border-gray-300 rounded-lg md:w-1/3 focus:outline-none'
              />
              <input
                type='date'
                placeholder='Drop-off Date'
                className='w-full p-4 border border-gray-300 rounded-lg md:w-1/3 focus:outline-none'
              /> */}
              </Row>
              <Button htmlType='submit'>Submit</Button>
              {/* <button className='w-full px-6 py-4 text-white bg-blue-600 rounded-lg md:w-auto hover:bg-blue-700'>
                Check Availability
              </button> */}
            </FormController>
          </article>
        </div>
      </div>
    </section>
  )
}

export default Hero
