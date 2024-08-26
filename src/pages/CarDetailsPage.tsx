import { Card, Tag, Typography, Divider } from 'antd'
import { FaCar, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa'
import { GiSteeringWheel, GiCarSeat } from 'react-icons/gi'
import { MdSettings } from 'react-icons/md'

const { Title, Text } = Typography

import { useParams } from 'react-router-dom'
import { useGetSingleCarQuery } from '../redux/features/cars/carsApi'

const CarDetailsPage = () => {
  const { carId } = useParams()
  const { data, isLoading } = useGetSingleCarQuery(carId)
  const singleCar = data?.data

  if (isLoading) {
    return <div className='text-lg text-center'>Loading...</div>
  }

  return (
    <div className='container px-6 py-12 mx-auto'>
      <Card
        cover={
          <img
            alt={singleCar?.name}
            src={singleCar?.image}
            className='object-cover w-full h-80'
          />
        }
        style={{ borderRadius: '1rem' }}
        className='shadow-lg'
      >
        <Title level={2} className='text-2xl font-bold'>
          {singleCar.name}
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
              <Text className='text-lg'>Fuel Type: {singleCar?.fuelType}</Text>
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
          </div>
        </div>
      </Card>
    </div>
  )
}

export default CarDetailsPage
