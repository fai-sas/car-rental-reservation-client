import { useEffect } from 'react'
import {
  SearchOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  ClearOutlined,
} from '@ant-design/icons'
import { Layout, Input, Button, Select, Slider, Pagination } from 'antd'
import Loader from '../components/Loader'
import {
  setSearchTerm,
  setCategory,
  setPriceRange,
  setSortOrder,
  setCurrentPage,
  setPageSize,
  setMaxPrice,
  clearFilters,
} from '../redux/features/cars/carsSlice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import CarsCard from '../components/CarsCard'
import { useGetAllCarsQuery } from '../redux/features/cars/carsApi'
import Header from '../components/Header'

const { Content, Sider } = Layout
const { Option } = Select

const BookingPage = () => {
  const dispatch = useAppDispatch()
  const {
    searchTerm,
    category,
    priceRange,
    sortOrder,
    currentPage,
    pageSize,
    maxPrice,
  } = useAppSelector((state) => state.cars)

  // Ensure the correct format for parameters
  const formattedParams = {
    searchTerm: searchTerm || '', // Ensure empty string if undefined
    category: category || '',
    priceRange: priceRange.length ? priceRange.join(',') : '', // Convert to string if array
    sort: sortOrder || '',
    page: currentPage || 1,
    limit: pageSize || 10,
  }

  // Log the formatted parameters
  console.log('Formatted Params:', formattedParams)

  const { data, isLoading, isError } = useGetAllCarsQuery(formattedParams)

  // Debug: Check the data response
  console.log('API Response Data:', data)

  const products = data?.data || []

  useEffect(() => {
    if (products.length > 0) {
      const maxPriceFromData = Math.max(
        ...products.map((product) => product.price)
      )
      dispatch(setMaxPrice(maxPriceFromData))
    }
  }, [dispatch, products])

  const carType = [...new Set(products.map((car) => car.carType))]

  const totalProducts = data?.meta?.total || 0

  const handleSearch = (value) => {
    dispatch(setSearchTerm(value))
  }

  const handleCategoryChange = (value) => {
    dispatch(setCategory(value))
  }

  const handlePriceChange = (value) => {
    dispatch(setPriceRange(value))
  }

  const handleSortChange = (value) => {
    dispatch(setSortOrder(value))
  }

  const handleClearFilters = () => {
    dispatch(clearFilters())
  }

  const handlePageChange = (page, pageSize) => {
    dispatch(setCurrentPage(page))
    dispatch(setPageSize(pageSize))
  }

  if (isLoading) {
    return <Loader />
  }

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
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type)
          }}
        >
          <div className='p-4'>
            <Input
              placeholder='Search products'
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />

            <Select
              className='w-full my-4 '
              placeholder='Filter by category'
              value={category}
              onChange={handleCategoryChange}
            >
              <Option value=''>All Categories</Option>
              {carType.map((category) => (
                <Option key={category} value={category}>
                  {category}
                </Option>
              ))}
            </Select>

            <div className='my-4'>
              <span className='text-white '>Price Range:</span>
              <Slider
                range
                max={maxPrice}
                value={priceRange}
                onChange={handlePriceChange}
              />
            </div>
            <Select
              className='w-full my-4 text-white'
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
          <Content>
            <div className='p-8'>
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={totalProducts}
                onChange={handlePageChange}
              />
            </div>
            <div className='grid grid-cols-1 gap-4 p-8 my-8 md:grid-cols-3 lg:grid-cols-4'>
              {products.length > 0 ? (
                products.map((car) => <CarsCard key={car._id} car={car} />)
              ) : (
                <h1 className='text-6xl font-bold text-red-800 '>
                  No Data Found...
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
