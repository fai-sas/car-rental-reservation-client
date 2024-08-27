import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useGetAllCarsQuery } from '../redux/features/cars/carsApi'
import { Card, Select, Input, Slider, Button, Tag } from 'antd'
import { FilterOutlined } from '@ant-design/icons'

const { Option } = Select

const DEFAULT_IMAGE_URL =
  'https://images.unsplash.com/photo-1511994477422-b69e44bd4ea9?q=80&w=1979&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

const CarListing: React.FC = () => {
  const { data, isLoading } = useGetAllCarsQuery(undefined)
  const cars = data?.data

  const [carTypeFilter, setCarTypeFilter] = useState<string | undefined>(
    undefined
  )
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100])
  const [search, setSearch] = useState<string>('')

  if (isLoading) {
    return <div className='text-lg text-center'>Loading...</div>
  }

  // Filter cars based on filters
  const filteredCars = cars?.filter((car) => {
    const matchesType = carTypeFilter ? car.carType === carTypeFilter : true
    const matchesPrice =
      car.pricePerHour >= priceRange[0] && car.pricePerHour <= priceRange[1]
    const matchesSearch = car.name.toLowerCase().includes(search.toLowerCase())

    return matchesType && matchesPrice && matchesSearch
  })

  return (
    <div className='container px-4 py-8 mx-auto'>
      <div className='flex flex-col items-center justify-between mb-8 lg:flex-row'>
        <div className='flex items-center space-x-4'>
          <Select
            placeholder='Select Car Type'
            onChange={(value) => setCarTypeFilter(value as string)}
            style={{ width: 200 }}
            allowClear
          >
            <Option value='Sedan'>Sedan</Option>
            <Option value='SUV'>SUV</Option>
            <Option value='Hybrid'>Hybrid</Option>
            <Option value='Truck'>Truck</Option>
            {/* Add more car types as needed */}
          </Select>

          <Input.Search
            placeholder='Search by name'
            onSearch={(value) => setSearch(value)}
            style={{ width: 200 }}
          />
        </div>

        <div className='flex items-center mt-4 lg:mt-0'>
          <FilterOutlined className='text-xl' />
          <span className='ml-2'>Price Range</span>
          <Slider
            range
            min={0}
            max={100}
            defaultValue={priceRange}
            onChange={(value) => setPriceRange(value as [number, number])}
            value={priceRange}
            style={{ width: 300 }}
          />
        </div>
      </div>

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {filteredCars?.map((car) => (
          <Card
            key={car._id}
            cover={<img alt={car.name} src={car.image || DEFAULT_IMAGE_URL} />}
            extra={
              <Link to={`/car/${car._id}`}>
                <Button type='primary'>View Details</Button>
              </Link>
            }
            className='rounded-lg shadow-lg'
            style={{ width: '100%' }}
          >
            <Card.Meta
              title={car.name}
              description={
                <>
                  <div className='text-gray-500'>{car.description}</div>
                  <div className='mt-2'>
                    <Tag color='blue'>{car.carType}</Tag>
                    <Tag color='green'>${car.pricePerHour}/hr</Tag>
                  </div>
                </>
              }
            />
          </Card>
        ))}
      </div>
    </div>
  )
}

export default CarListing
