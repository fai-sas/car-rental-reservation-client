/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button,
  Row,
  Col,
  Form,
  Input,
  Checkbox,
  Typography,
  Divider,
} from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../redux/features/auth/authApi'
import toast from 'react-hot-toast'

const { Title, Text } = Typography

const Register: React.FC = () => {
  const navigate = useNavigate()
  const [register, { isLoading }] = useRegisterMutation()

  const onFinish = async (values: any) => {
    try {
      const userInfo = {
        name: values.name,
        address: values.address,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        phone: values.phone,
        termsAccepted: values.termsAccepted,
        role: values.role,
      }

      // Assuming the `register` function returns a promise with a result
      const response = await register(userInfo).unwrap()

      // Check if the response indicates success
      if (response.success) {
        toast.success('Successfully Registered')
        navigate('/login')
      } else {
        // response.errorMessages.forEach(
        //   (error: { path: string; message: string }) => {
        //     toast.error(error.message)
        //   }
        // )
        toast.error(
          response?.data?.message || 'Registration failed. Please try again.'
        )
      }
    } catch (err) {
      toast.error(err?.data?.message || 'Something Went Wrong')
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-md'>
        <Title level={2} className='mb-6 text-center'>
          Sign Up
        </Title>
        <Form
          onFinish={onFinish}
          initialValues={{ remember: true }}
          layout='vertical'
          className='space-y-4'
        >
          <Form.Item
            name='name'
            label='Name'
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input placeholder='Enter your name' />
          </Form.Item>

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

          <Form.Item
            name='confirmPassword'
            label='Confirm Password'
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!'
                    )
                  )
                },
              }),
            ]}
          >
            <Input.Password placeholder='Confirm your password' />
          </Form.Item>

          <Form.Item
            name='address'
            label='Address'
            rules={[{ required: true, message: 'Please input your address!' }]}
          >
            <Input placeholder='Enter your address' />
          </Form.Item>

          <Form.Item name='phone' label='Phone Number (optional)'>
            <Input placeholder='Enter your phone number' />
          </Form.Item>

          <Form.Item
            name='termsAccepted'
            valuePropName='checked'
            rules={[
              {
                required: true,
                message: 'You must accept the terms and conditions!',
              },
            ]}
          >
            <Checkbox>
              I agree to the{' '}
              <a href='/terms' target='_blank' rel='noopener noreferrer'>
                Terms & Conditions
              </a>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' block loading={isLoading}>
              Sign Up
            </Button>
          </Form.Item>
        </Form>

        <div className='mt-4 text-center'>
          <Text>
            Already have an account?{' '}
            <Link to='/login' className='text-blue-500'>
              Sign In Instead
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

export default Register
