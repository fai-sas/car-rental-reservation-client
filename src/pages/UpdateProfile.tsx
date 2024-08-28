import { useParams } from 'react-router-dom'
import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from '../redux/features/users/usersApi'
import { Button, Col, Flex, Row } from 'antd'
import FormController from '../components/Form/FormController'
import FormInput from '../components/Form/FormInput'
import { TResponse } from '../types'
import toast from 'react-hot-toast'
import { FieldValues, SubmitHandler } from 'react-hook-form'

const UpdateProfile = () => {
  const { userId } = useParams<{ userId: string }>()

  const { data: singleUser, isLoading, isError } = useGetSingleUserQuery(userId)

  const [updateUser] = useUpdateUserMutation()

  const defaultValue = {
    name: singleUser?.data?.name,
    phone: singleUser?.data?.phone,
    address: singleUser?.data?.address,
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await updateUser({ id: userId, data })

      console.log(res)

      if (res.error) {
        toast.error(res?.error?.data?.message)
      } else {
        toast.success('User Successfully Updated')
      }
    } catch (err) {
      toast.error('Something went wrong')
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error loading car</div>
  }

  return (
    <>
      <h1 className='p-12 text-2xl font-bold text-center'>
        Update Profile {singleUser?.data?.name}
      </h1>
      <Flex justify='center' align='center'>
        <Col span={12}>
          <FormController onSubmit={onSubmit} defaultValues={defaultValue}>
            <Row gutter={16}>
              <Col span={12}>
                <FormInput type='text' name='name' label='Name' />
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <FormInput type='text' name='phone' label='Phone' />
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <FormInput type='text' name='address' label='Address' />
              </Col>
            </Row>

            <Button type='primary' htmlType='submit'>
              Update Profile
            </Button>
          </FormController>
        </Col>
      </Flex>
    </>
  )
}

export default UpdateProfile
