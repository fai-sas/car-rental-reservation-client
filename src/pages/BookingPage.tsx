import React, { useState } from 'react'
import {
  SearchOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  ClearOutlined,
} from '@ant-design/icons'
import {
  Layout,
  Input,
  Button,
  Select,
  Slider,
  Pagination,
  Checkbox,
} from 'antd'
import Loader from '../components/Loader'
import CarsCard from '../components/CarsCard'
import { useGetAllCarsQuery } from '../redux/features/cars/carsApi'
import Header from '../components/Header'

const { Content, Sider } = Layout
const { Option } = Select

const BookingPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [selectedCarTypes, setSelectedCarTypes] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200])
  const [sortOrder, setSortOrder] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)

  const queryParams = {
    ...(searchTerm ? { searchTerm } : {}),
    ...(selectedLocations.length > 0 ? { location: selectedLocations } : {}),
    ...(selectedCarTypes.length > 0 ? { carType: selectedCarTypes } : {}),
    ...(priceRange && (priceRange[0] !== 0 || priceRange[1] !== 200)
      ? { priceRange }
      : {}),
    ...(sortOrder ? { sort: sortOrder } : {}),
    page: currentPage,
    limit: pageSize,
  }

  const { data, isLoading, isError } = useGetAllCarsQuery(queryParams)

  const products = data?.data || []
  const totalProducts = data?.meta?.total || 0

  const availableCars = products?.filter((car) => car?.status === 'available')

  const uniqueLocations = [
    ...new Set(availableCars?.map((car) => car?.location)),
  ]
  const uniqueCarTypes = [...new Set(availableCars?.map((car) => car?.carType))]

  const handleSearch = (value: string) => setSearchTerm(value)

  const handleLocationChange = (checkedValues: string[]) => {
    setSelectedLocations(checkedValues)
  }

  const handleCarTypeChange = (checkedValues: string[]) => {
    setSelectedCarTypes(checkedValues)
  }

  const handlePriceChange = (value: [number, number]) => {
    setPriceRange(value)
  }

  const handleSortChange = (value: string) => {
    setSortOrder(value)
  }

  const handleClearFilters = () => {
    setSearchTerm('')
    setSelectedLocations([])
    setSelectedCarTypes([])
    setPriceRange([0, 200])
    setSortOrder('')
    setCurrentPage(1)
  }

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page)
    setPageSize(pageSize)
  }

  if (isLoading) return <Loader />

  if (!isLoading && isError) {
    return <h1 className='text-6xl font-bold text-red-800 '>Error...</h1>
  }

  return (
    <>
      <Header />
      <Layout>
        <Sider
          breakpoint='lg'
          collapsedWidth='0'
          onBreakpoint={(broken) => {}}
          onCollapse={(collapsed, type) => {}}
        >
          <div className='p-4'>
            <Input
              placeholder='Search products'
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />

            {/* Location Filter */}
            <div className='my-4'>
              <h4 className='py-2 font-bold text-white'>Filter by Location:</h4>
              <Checkbox.Group
                className='checkbox-group'
                options={uniqueLocations?.map((loc) => ({
                  label: <span style={{ color: 'white' }}>{loc}</span>, // Set label text color to white
                  value: loc,
                }))}
                value={selectedLocations}
                onChange={handleLocationChange}
              />
            </div>

            {/* Car Type Filter */}
            <div className='my-4'>
              <h4 className='py-2 font-bold text-white'>Filter by Car Type:</h4>
              <Checkbox.Group
                options={uniqueCarTypes.map((type) => ({
                  label: <span style={{ color: 'white' }}>{type}</span>,
                  value: type,
                }))}
                value={selectedCarTypes}
                onChange={handleCarTypeChange}
              />
            </div>

            <div className='my-4'>
              <span className='py-2 font-bold text-white'>
                Price Per Hour Range:
              </span>
              <Slider
                range
                max={200}
                value={priceRange}
                onChange={handlePriceChange}
              />
            </div>

            <Select
              className='w-full my-4'
              placeholder='Sort by price'
              value={sortOrder}
              onChange={handleSortChange}
            >
              <Option value=''>Sort by Price</Option>
              <Option value='priceAsc'>
                <SortAscendingOutlined /> Price Ascending
              </Option>
              <Option value='priceDesc'>
                <SortDescendingOutlined /> Price Descending
              </Option>
            </Select>

            <Button
              className='w-full'
              type='default'
              icon={<ClearOutlined />}
              onClick={handleClearFilters}
            >
              Clear Filters
            </Button>
          </div>
        </Sider>

        <Layout>
          <Content className='dark:bg-gray-900'>
            <div className='p-8'>
              <Pagination
                className='text-white dark:bg-gray-900'
                current={currentPage}
                pageSize={pageSize}
                total={totalProducts}
                onChange={handlePageChange}
              />
            </div>
            <h1 className='text-2xl font-bold text-center dark:text-gray-200'>
              Available Cars
            </h1>
            <div className='grid grid-cols-1 gap-4 p-8 my-8 bg-white md:grid-cols-3 lg:grid-cols-4 dark:bg-gray-900'>
              {availableCars?.length > 0 ? (
                availableCars.map((car) => (
                  <CarsCard key={car?._id} car={car} />
                ))
              ) : (
                <h1 className='text-6xl font-bold text-red-800 dark:text-red-500'>
                  No Car Found...
                </h1>
              )}
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default BookingPage
