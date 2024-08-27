import { Button, Table, TableProps } from 'antd'
import {
  useDeleteCarMutation,
  useGetAllCarsQuery,
} from '../redux/features/cars/carsApi'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { TQueryParam } from '../types'
import {
  useDeleteBookingMutation,
  useGetAllBookingsQuery,
  useUpdateBookingMutation,
} from '../redux/features/booking/bookingApi'
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from '../redux/features/users/usersApi'

const AllUsers = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined)

  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const { data: users, isFetching } = useGetAllUsersQuery(undefined)

  const [deleteUser] = useDeleteUserMutation()
  const [updateUser] = useUpdateUserMutation()

  const handleUpdate = async (userId: string) => {
    try {
      if (userId) {
        await updateUser(userId)
      }
      setConfirmDelete(null)
      toast.success('User Updated!')
    } catch (error) {
      console.log(error)

      toast.error('Something went wrong')
    }
  }

  const handleDelete = async (userId: string) => {
    try {
      if (userId) {
        await deleteUser(userId)
      }
      setConfirmDelete(null)
      toast.error('User Deleted!')
    } catch (error) {
      console.log(error)

      toast.error('Something went wrong')
    }
  }

  const tableData = users?.data?.map(({ _id, name, email, role }) => ({
    key: _id,
    name,
    email,
    role,
  }))

  console.log(tableData)

  const columns = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
    },
    {
      title: 'Role',
      key: 'role',
      dataIndex: 'role',
    },
    {
      title: 'Action',
      key: 'x',
      render: (item) => {
        return (
          <Button
            disabled={item.isApproved}
            type='primary'
            onClick={() => handleUpdate(item.key)}
          >
            Update User
          </Button>
        )
      },
    },
    {
      title: 'Action',
      key: 'x',
      render: (item) => {
        return (
          <>
            <Button
              type='primary'
              danger
              onClick={() => handleDelete(item.key)}
            >
              Delete User
            </Button>
            {confirmDelete === item.key && (
              <div className='absolute p-4 bg-white rounded shadow-lg'>
                <p>Are you sure you want to delete this booking?</p>
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

export default AllUsers
