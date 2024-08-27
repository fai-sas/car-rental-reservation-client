import { Button, Modal, Table } from 'antd'
import { useGetAllCarsQuery } from '../redux/features/cars/carsApi'
import AddCar from '../components/AddCar'
import { Link } from 'react-router-dom'

const AllCars = () => {
  // const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);

  const { data: cars, isFetching } = useGetAllCarsQuery(undefined)

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
        console.log(item)

        return (
          <Link to={`/admin/edit-car/${item.key}`}>
            <Button>Edit Car</Button>
          </Link>
        )
        // return <AddFacultyModal facultyInfo={item} />
        // return <AddCar />
      },
    },
    {
      title: 'Action',
      key: 'x',
      render: (item) => {
        console.log(item)

        return (
          <Link to={`/admin/edit-car/${item.key}`}>
            <Button>Delete Car</Button>
          </Link>
        )
        // return <AddFacultyModal facultyInfo={item} />
        // return <AddCar />
      },
    },
  ]

  // const onChange: TableProps<TTableData>['onChange'] = (
  //   _pagination,
  //   filters,
  //   _sorter,
  //   extra
  // ) => {
  //   if (extra.action === 'filter') {
  //     const queryParams: TQueryParam[] = [];
  //     setParams(queryParams);
  //   }
  // };

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      // onChange={onChange}
    />
  )
}

// const AddFacultyModal = ({ facultyInfo }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const { data: facultiesData } = useGetAllFacultiesQuery(undefined)
//   const [addFaculties] = useAddFacultiesMutation()

//   const facultiesOption = facultiesData?.data?.map((item) => ({
//     value: item._id,
//     label: item.fullName,
//   }))

//   const handleSubmit = (data) => {
//     const facultyData = {
//       courseId: facultyInfo.key,
//       data,
//     }

//     console.log(facultyData)

//     addFaculties(facultyData)
//   }

//   const showModal = () => {
//     setIsModalOpen(true)
//   }

//   const handleCancel = () => {
//     setIsModalOpen(false)
//   }

//   return (
//     <>
//       <Button onClick={showModal}>Add Faculty</Button>
//       <Modal
//         title='Basic Modal'
//         open={isModalOpen}
//         onCancel={handleCancel}
//         footer={null}
//       >
//         <PHForm onSubmit={handleSubmit}>
//           <PHSelect
//             mode='multiple'
//             options={facultiesOption}
//             name='faculties'
//             label='Faculty'
//           />
//           <Button htmlType='submit'>Submit</Button>
//         </PHForm>
//       </Modal>
//     </>
//   )
// }

export default AllCars
