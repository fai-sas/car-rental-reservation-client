/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react'
import { Button, Form, Input, Typography, Divider } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAppDispatch } from '../redux/hooks'
import { useLoginMutation } from '../redux/features/auth/authApi'
import { verifyToken } from '../utils/verifyToken'
import { setUser, TUser } from '../redux/features/auth/authSlice'

const { Title, Text } = Typography

const Login: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [login, { isLoading }] = useLoginMutation()

  const onFinish = async (values: any) => {
    try {
      const userInfo = {
        email: values.email,
        password: values.password,
      }
      const res = await login(userInfo).unwrap()
      const user = verifyToken(res.data.accessToken) as TUser
      dispatch(setUser({ user: user, token: res.data.accessToken }))
      console.log(user)

      toast.success('Logged in successfully')
      navigate(`/${user.role}/dashboard`)
    } catch (err: any) {
      console.error('Error caught:', err)
      if (err?.data?.errorMessages) {
        err.data.errorMessages.forEach((error: { message: string }) => {
          toast.error(error.message)
        })
      } else if (err?.message) {
        toast.error(err.message)
      } else {
        toast.error('Something went wrong')
      }
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-md'>
        <Title level={2} className='mb-6 text-center'>
          Login
        </Title>
        <Form
          onFinish={onFinish}
          initialValues={{ remember: true }}
          layout='vertical'
          className='space-y-4'
        >
          <Form.Item
            name='email'
            label='Email Address'
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'The input is not valid E-mail!' },
            ]}
          >
            <Input placeholder='Enter your email' />
          </Form.Item>

          <Form.Item
            name='password'
            label='Password'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder='Enter your password' />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' block loading={isLoading}>
              Login
            </Button>
          </Form.Item>
        </Form>

        <div className='mt-4 text-center'>
          <Text>
            Forgot your password?{' '}
            <Link to='/forgot-password' className='text-blue-500'>
              Recover it here
            </Link>
          </Text>
        </div>

        <div className='mt-4 text-center'>
          <Text>
            New to our service?{' '}
            <Link to='/register' className='text-blue-500'>
              Sign Up Instead
            </Link>
          </Text>
        </div>

        <Divider />

        <div className='text-center'>
          <Text>
            <Link to='/privacy-policy' className='text-blue-500'>
              Privacy Policy
            </Link>{' '}
            |
            <Link to='/terms' className='text-blue-500'>
              {' '}
              Terms of Service
            </Link>
          </Text>
        </div>
      </div>
    </div>
  )
}

export default Login
