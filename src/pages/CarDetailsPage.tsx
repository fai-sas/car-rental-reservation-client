import { useState } from 'react'
import { Card, Tag, Typography, Divider, Checkbox, Button, Rate } from 'antd'
import { FaCar, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa'
import { GiSteeringWheel, GiCarSeat } from 'react-icons/gi'
import { MdSettings } from 'react-icons/md'
import { Link, useParams } from 'react-router-dom'
import { useGetSingleCarQuery } from '../redux/features/cars/carsApi'
import Header from '../components/Header'

const { Title, Text } = Typography
const DEFAULT_IMAGE_URL =
  'https://images.unsplash.com/photo-1511994477422-b69e44bd4ea9?q=80&w=1979&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

const CarDetailsPage = () => {
  const { carId } = useParams()
  const { data, isLoading } = useGetSingleCarQuery(carId)
  const singleCar = data?.data

  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const handleOptionChange = (checkedValues: any) => {
    setSelectedOptions(checkedValues)
  }

  const additionalOptions = ['Insurance', 'GPS', 'Child Seat']

  if (isLoading) {
    return <div className='text-lg text-center'>Loading...</div>
  }

  return (
    <>
      <Header />
      <div className='container px-6 py-12 mx-auto'>
        <Card
          data-aos='fade-up'
          data-aos-duration='1000'
          cover={
            <div
              style={{
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
                height: '400px',
              }}
            >
              <img
                src={singleCar?.image || DEFAULT_IMAGE_URL}
                alt={singleCar?.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLImageElement).style.transform =
                    'scale(1.5)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLImageElement).style.transform =
                    'scale(1)'
                }}
              />
            </div>
          }
          style={{ borderRadius: '1rem' }}
          className='shadow-lg'
        >
          <Title level={2} className='text-2xl font-bold'>
            {singleCar?.name}
          </Title>
          <Text className='text-lg text-gray-600'>
            {singleCar?.model} | {singleCar?.year}
          </Text>
          <Divider className='my-4' />
          <div className='flex flex-col md:flex-row md:justify-between'>
            <div className='flex-1'>
              <Text className='text-base text-gray-800'>
                {singleCar?.description}
              </Text>
              <div className='mt-4'>
                <Title level={4} className='text-xl font-semibold'>
                  Additional Features
                </Title>
                <Checkbox.Group
                  options={additionalOptions}
                  onChange={handleOptionChange}
                  className='mt-2'
                />
                <div className='mt-4'>
                  <Title level={4} className='text-xl font-semibold'>
                    Customer Reviews
                  </Title>
                  {/* Placeholder Reviews */}
                  <div className='mt-2'>
                    <div className='flex items-center'>
                      <Text className='font-semibold'>John Doe</Text>
                      <Rate disabled defaultValue={4} className='ml-2' />
                    </div>
                    <Text className='text-gray-600'>
                      "Great car! Had an amazing experience with smooth ride
                      quality."
                    </Text>
                  </div>
                  <div className='mt-4'>
                    <div className='flex items-center'>
                      <Text className='font-semibold'>Jane Smith</Text>
                      <Rate disabled defaultValue={5} className='ml-2' />
                    </div>
                    <Text className='text-gray-600'>
                      "Perfect for a family trip. Excellent features and
                      comfort."
                    </Text>
                  </div>
                </div>
              </div>
            </div>
            <div className='md:ml-6'>
              <Title level={4} className='text-xl font-semibold'>
                Details
              </Title>
              <div className='flex items-center mb-3'>
                <FaCar className='mr-3 text-2xl text-blue-500' />
                <Text className='text-lg'>{singleCar?.carType}</Text>
              </div>
              <div className='flex items-center mb-3'>
                <FaCalendarAlt className='mr-3 text-2xl text-blue-500' />
                <Text className='text-lg'>Year: {singleCar?.year}</Text>
              </div>
              <div className='flex items-center mb-3'>
                <FaMapMarkerAlt className='mr-3 text-2xl text-blue-500' />
                <Text className='text-lg'>Location: {singleCar?.location}</Text>
              </div>
              <div className='flex items-center mb-3'>
                <GiSteeringWheel className='mr-3 text-2xl text-blue-500' />
                <Text className='text-lg'>
                  Transmission: {singleCar?.transmission}
                </Text>
              </div>
              <div className='flex items-center mb-3'>
                <GiCarSeat className='mr-3 text-2xl text-blue-500' />
                <Text className='text-lg'>Seats: {singleCar?.seats}</Text>
              </div>
              <div className='flex items-center mb-3'>
                <Text className='text-lg'>
                  Fuel Type: {singleCar?.fuelType}
                </Text>
              </div>
              <div className='flex items-center mb-3'>
                <MdSettings className='mr-3 text-2xl text-blue-500' />
                <Text className='text-lg'>
                  Price Per Hour: ${singleCar?.pricePerHour}
                </Text>
              </div>
              <div className='flex flex-wrap'>
                {singleCar?.features.map((feature, index) => (
                  <Tag key={index} color='geekblue' className='mb-2 mr-2'>
                    {feature}
                  </Tag>
                ))}
              </div>
              <Link to={`/booking/${carId}`}>
                <Button type='primary' size='large' className='w-full mt-6'>
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}

export default CarDetailsPage
