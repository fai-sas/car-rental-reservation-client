import { Button, Table, TableProps } from 'antd'
import {
  useDeleteCarMutation,
  useGetAllCarsQuery,
} from '../redux/features/cars/carsApi'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { TQueryParam } from '../types'

const AllCars = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  })

  const { data: cars, isFetching } = useGetAllCarsQuery({
    page: pagination.current,
    limit: pagination.pageSize,
  })
  const [deleteCar] = useDeleteCarMutation()

  console.log(cars)

  const handleDelete = async (carId: string) => {
    try {
      if (carId) {
        await deleteCar(carId)
      }
      setConfirmDelete(null)
      toast.error('Car Deleted!')
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    }
  }

  // Prepare table data
  const tableData = cars?.data?.map(({ _id, name, model, status }) => ({
    key: _id,
    name,
    model,
    status,
  }))

  const columns = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Model',
      key: 'model',
      dataIndex: 'model',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
    },
    {
      title: 'Action',
      key: 'x',
      render: (item) => (
        <Link to={`/admin/edit-car/${item.key}`}>
          <Button type='primary'>Edit Car</Button>
        </Link>
      ),
    },
    {
      title: 'Action',
      key: 'x',
      render: (item) => (
        <>
          <Button type='primary' danger onClick={() => handleDelete(item.key)}>
            Delete Car
          </Button>
          {confirmDelete === item.key && (
            <div className='absolute p-4 bg-white rounded shadow-lg'>
              <p>Are you sure you want to delete this product?</p>
              <button
                className='px-2 py-1 mr-2 text-white bg-green-500 rounded'
                onClick={() => handleDelete(item.key)}
              >
                Yes
              </button>
              <button
                className='px-2 py-1 text-white bg-gray-500 rounded'
                onClick={() => setConfirmDelete(null)}
              >
                No
              </button>
            </div>
          )}
        </>
      ),
    },
  ]

  // Handle table changes (pagination, filters, sorting)
  const onChange: TableProps<TTableData>['onChange'] = (pagination) => {
    setPagination({
      current: pagination.current || 1,
      pageSize: pagination.pageSize || 10,
    })
  }

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: cars?.meta?.total,
      }}
      onChange={onChange}
    />
  )
}

export default AllCars
