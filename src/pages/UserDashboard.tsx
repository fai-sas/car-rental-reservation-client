import { Link } from 'react-router-dom'
import { selectCurrentUser } from '../redux/features/auth/authSlice'
import { useGetMyBookingQuery } from '../redux/features/booking/bookingApi'
import { useAppSelector } from '../redux/hooks'
import { Button } from 'antd'

const UserDashboard = () => {
  const user = useAppSelector(selectCurrentUser)

  const { data: bookings } = useGetMyBookingQuery(undefined)

  return (
    <div className='min-h-screen p-8 bg-gray-100 dark:bg-gray-900'>
      <div className='max-w-4xl mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800'>
        <header className='py-8 text-center text-white bg-blue-600 rounded-t-lg dark:bg-blue-700'>
          <h2 className='text-3xl font-bold dark:text-gray-100'>
            Welcome, {user?.name}
          </h2>
          <p className='text-sm opacity-75 dark:text-gray-300'>
            Your personal dashboard
          </p>
        </header>

        <section className='grid grid-cols-1 gap-8 p-8 md:grid-cols-2'>
          <div className='p-6 space-y-2 rounded-lg shadow-md bg-gray-50 dark:bg-gray-700'>
            <h3 className='mb-4 text-xl font-semibold text-gray-700 dark:text-gray-300'>
              User Details
            </h3>
            <p className='text-gray-600 dark:text-gray-400'>
              <strong>Name:</strong> {user?.name}
            </p>
            <p className='text-gray-600 dark:text-gray-400'>
              <strong>Email:</strong> {user?.email}
            </p>
            <p className='text-gray-600 dark:text-gray-400'>
              <strong>Role:</strong> {user?.role}
            </p>
            <p className='text-gray-600 dark:text-gray-400'>
              <strong>Phone Number:</strong> {user?.phone}
            </p>
            <p className='text-gray-600 dark:text-gray-400'>
              <strong>Address:</strong> {user?.address}
            </p>

            <Link className='my-4' to={`/user/update-profile/${user?.userId}`}>
              <Button className='my-4' type='primary'>
                Update Profile
              </Button>
            </Link>
          </div>

          <div className='grid gap-4'>
            <Card
              title='Total Bookings'
              value={bookings?.data?.length}
              icon='M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.03 20 3 15.97 3 11C3 6.03 7.03 2 12 2C16.97 2 21 6.03 21 11C21 15.97 16.97 20 12 20ZM11 7H13V11H11V7ZM11 13H13V15H11V13Z'
              color='text-blue-600 dark:text-blue-400'
            />
            <Card
              title='Upcoming Bookings'
              value='No Upcoming Bookings'
              icon='M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.03 20 3 15.97 3 11C3 6.03 7.03 2 12 2C16.97 2 21 6.03 21 11C21 15.97 16.97 20 12 20ZM11 7H13V11H11V7ZM11 13H13V15H11V13Z'
              color='text-green-600 dark:text-green-400'
            />
          </div>
        </section>
      </div>
    </div>
  )
}

const Card = ({ title, value, icon, color }) => (
  <div className='flex flex-col items-center p-6 bg-white rounded-lg shadow-md dark:bg-gray-800'>
    <svg
      className={`w-12 h-12 mb-4 ${color}`}
      fill='currentColor'
      viewBox='0 0 24 24'
    >
      <path d={icon} />
    </svg>
    <h3 className='mb-2 text-xl font-semibold text-gray-800 dark:text-gray-100'>
      {title}
    </h3>
    <p className='text-2xl font-bold text-gray-600 dark:text-gray-300'>
      {value}
    </p>
  </div>
)

export default UserDashboard
