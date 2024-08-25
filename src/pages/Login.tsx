/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Row } from 'antd'
import { FieldValues } from 'react-hook-form'
import { useAppDispatch } from '../redux/hooks'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import FormController from '../components/Form/FormController'
import FormInput from '../components/Form/FormInput'
import { useLoginMutation } from '../redux/features/auth/authApi'
import { verifyToken } from '../utils/verifyToken'
import { setUser, TUser } from '../redux/features/auth/authSlice'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const defaultValues = {
    email: 'admin4@admin.com',
    password: 'password123',
  }

  const [login] = useLoginMutation()

  const onSubmit = async (data: FieldValues) => {
    console.log(data)

    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      }
      const res = await login(userInfo).unwrap()
      const user = verifyToken(res.data.accessToken) as TUser
      dispatch(setUser({ user: user, token: res.data.accessToken }))
      toast.success('Logged in')
      navigate(`/${user.role}/dashboard`)
    } catch (err) {
      toast.error('Something went wrong')
    }
  }

  return (
    <Row justify='center' align='middle' style={{ height: '100vh' }}>
      <FormController onSubmit={onSubmit} defaultValues={defaultValues}>
        <FormInput type='email' name='email' label='Email' />
        <FormInput type='password' name='password' label='Password' />
        <Button htmlType='submit'>Login</Button>
      </FormController>
    </Row>
  )
}

export default Login
