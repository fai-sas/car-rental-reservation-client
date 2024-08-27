// import { selectCurrentUser } from '../redux/features/auth/authSlice'
// import { useGetMyBookingQuery } from '../redux/features/booking/bookingApi'
// import { useAppSelector } from '../redux/hooks'

// const UserDashboard = () => {
//   const user = useAppSelector(selectCurrentUser)
//   const { data: bookings } = useGetMyBookingQuery(undefined)

//   return (
//     <div>
//       <h2 className='mb-12 text-4xl font-extrabold text-center text-gray-900'>
//         Welcome {user?.name}
//       </h2>
//       <div>
//         <h1> Name: {user?.name}</h1>
//         <h1> Email: {user?.email}</h1>
//         <h1> Role: {user?.role}</h1>
//         <h1> Phone Number: {user?.phone}</h1>
//         <h1> Address: {user?.address}</h1>
//       </div>
//       <div className='flex flex-col items-center p-8 text-center bg-white rounded-lg shadow-md'>
//         <svg
//           className='w-12 h-12 mb-4 text-blue-600'
//           fill='currentColor'
//           viewBox='0 0 24 24'
//           xmlns='http://www.w3.org/2000/svg'
//         >
//           <path d='M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.03 20 3 15.97 3 11C3 6.03 7.03 2 12 2C16.97 2 21 6.03 21 11C21 15.97 16.97 20 12 20ZM11 7H13V11H11V7ZM11 13H13V15H11V13Z' />
//         </svg>
//         <h3 className='mb-4 text-xl font-semibold'>Total Bookings</h3>

//         <p className='text-2xl font-bold text-gray-600'>
//           {bookings?.data?.length}
//         </p>
//       </div>
//       <div className='flex flex-col items-center p-8 text-center bg-white rounded-lg shadow-md'>
//         <svg
//           className='w-12 h-12 mb-4 text-blue-600'
//           fill='currentColor'
//           viewBox='0 0 24 24'
//           xmlns='http://www.w3.org/2000/svg'
//         >
//           <path d='M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.03 20 3 15.97 3 11C3 6.03 7.03 2 12 2C16.97 2 21 6.03 21 11C21 15.97 16.97 20 12 20ZM11 7H13V11H11V7ZM11 13H13V15H11V13Z' />
//         </svg>
//         <h3 className='mb-4 text-xl font-semibold'>Upcoming Bookings</h3>

//         <p className='text-2xl font-bold text-gray-600'>No Upcoming Bookings</p>
//       </div>
//     </div>
//   )
// }

// export default UserDashboard

import { selectCurrentUser } from '../redux/features/auth/authSlice'
import { useGetMyBookingQuery } from '../redux/features/booking/bookingApi'
import { useAppSelector } from '../redux/hooks'

const UserDashboard = () => {
  const user = useAppSelector(selectCurrentUser)
  const { data: bookings } = useGetMyBookingQuery(undefined)

  return (
    <div className='min-h-screen p-8 bg-gray-100'>
      <div className='max-w-4xl mx-auto bg-white rounded-lg shadow-md'>
        <header className='py-8 text-center text-white bg-blue-600 rounded-t-lg'>
          <h2 className='text-3xl font-bold'>Welcome, {user?.name}</h2>
          <p className='text-sm opacity-75'>Your personal dashboard</p>
        </header>

        <section className='grid grid-cols-1 gap-8 p-8 md:grid-cols-2'>
          <div className='p-6 rounded-lg shadow-md bg-gray-50'>
            <h3 className='mb-4 text-xl font-semibold text-gray-700'>
              User Details
            </h3>
            <p className='text-gray-600'>
              <strong>Name:</strong> {user?.name}
            </p>
            <p className='text-gray-600'>
              <strong>Email:</strong> {user?.email}
            </p>
            <p className='text-gray-600'>
              <strong>Role:</strong> {user?.role}
            </p>
            <p className='text-gray-600'>
              <strong>Phone Number:</strong> {user?.phone}
            </p>
            <p className='text-gray-600'>
              <strong>Address:</strong> {user?.address}
            </p>
          </div>

          <div className='grid gap-4'>
            <Card
              title='Total Bookings'
              value={bookings?.data?.length}
              icon='M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.03 20 3 15.97 3 11C3 6.03 7.03 2 12 2C16.97 2 21 6.03 21 11C21 15.97 16.97 20 12 20ZM11 7H13V11H11V7ZM11 13H13V15H11V13Z'
              color='text-blue-600'
            />
            <Card
              title='Upcoming Bookings'
              value='No Upcoming Bookings'
              icon='M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.03 20 3 15.97 3 11C3 6.03 7.03 2 12 2C16.97 2 21 6.03 21 11C21 15.97 16.97 20 12 20ZM11 7H13V11H11V7ZM11 13H13V15H11V13Z'
              color='text-green-600'
            />
          </div>
        </section>
      </div>
    </div>
  )
}

const Card = ({ title, value, icon, color }) => (
  <div
    data-aos='fade-up'
    data-aos-duration='1000'
    className='flex flex-col items-center p-6 bg-white rounded-lg shadow-md'
  >
    <svg
      className={`w-12 h-12 mb-4 ${color}`}
      fill='currentColor'
      viewBox='0 0 24 24'
    >
      <path d={icon} />
    </svg>
    <h3 className='mb-2 text-xl font-semibold text-gray-800'>{title}</h3>
    <p className='text-2xl font-bold text-gray-600'>{value}</p>
  </div>
)

export default UserDashboard
