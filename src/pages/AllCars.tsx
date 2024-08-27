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

  const { data: cars, isFetching } = useGetAllCarsQuery(undefined)
  const [deleteCar] = useDeleteCarMutation()

  const handleDelete = (carId: string) => {
    if (carId) {
      deleteCar(carId)
    }
    setConfirmDelete(null)
    toast.error('Car Deleted!')
  }

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
      render: (item) => {
        return (
          <Link to={`/admin/edit-car/${item.key}`}>
            <Button type='primary'>Edit Car</Button>
          </Link>
        )
      },
    },
    {
      title: 'Action',
      key: 'x',
      render: (item) => {
        console.log(item)
        return (
          <>
            <Button
              type='primary'
              danger
              onClick={() => handleDelete(item.key)}
            >
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
        )
      },
    },
  ]

  const onChange: TableProps<TTableData>['onChange'] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === 'filter') {
      const queryParams: TQueryParam[] = []
      setParams(queryParams)
    }
  }

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
    />
  )
}

export default AllCars
