/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Row } from 'antd'
import { FieldValues } from 'react-hook-form'
import { useAppDispatch } from '../redux/hooks'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import FormController from '../components/Form/FormController'
import FormInput from '../components/Form/FormInput'
import { useRegisterMutation } from '../redux/features/auth/authApi'
import { verifyToken } from '../utils/verifyToken'
import { setUser, TUser } from '../redux/features/auth/authSlice'
import FormSelect from '../components/Form/FormSelect'

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const roleOptions = [
    { label: 'User', value: 'user' },
    { label: 'Admin', value: 'admin' },
  ]

  const defaultValues = {
    email: 'admin4@admin.com',
    password: 'password123',
  }

  const [register, { isLoading }] = useRegisterMutation()

  const onSubmit = async (data: FieldValues) => {
    console.log(data)

    try {
      const userInfo = {
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        role: data.role,
        phone: data.phone,
        address: data.address,
        termsAccepted: data.termsAccepted,
      }

      register(userInfo)
      toast.success('Successfully Registered')
      navigate(`/`)
    } catch (err) {
      toast.error('Something went wrong')
    }
  }

  return (
    <Row justify='center' align='middle' style={{ height: '100vh' }}>
      <FormController onSubmit={onSubmit} defaultValues={defaultValues}>
        <FormInput type='name' name='name' label='Name' />
        <FormInput type='email' name='email' label='Email' />
        <FormInput type='password' name='password' label='password' />
        <FormInput
          type='Password'
          name='confirmPassword'
          label='Confirm Password'
        />
        <FormSelect options={roleOptions} name='role' label='Role' />
        <FormInput type='phone' name='phone' label='Phone Number' />
        <FormInput type='address' name='address' label='Address' />
        <FormInput
          type='checkbox'
          name='termsAccepted'
          label='Terms & Conditions'
        />

        <Button htmlType='submit' disabled={isLoading}>
          Register
        </Button>
      </FormController>
    </Row>
  )
}

export default Register
