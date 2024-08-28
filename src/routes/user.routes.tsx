import BookingForm2 from '../components/BookingForm2'
import BookingHistory from '../pages/BookingHistory'
import EditBooking from '../pages/EditBooking'
import UpdateProfile from '../pages/UpdateProfile'

import UserDashboard from '../pages/UserDashboard'

export const userPaths = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    element: <UserDashboard />,
  },
  {
    name: 'My Bookings',
    path: 'my-bookings',
    element: <BookingHistory />,
  },
  {
    name: 'Add Booking',
    path: 'add-booking',
    element: <BookingForm2 />,
  },
  {
    path: 'edit-booking/:singleBookingId',
    element: <EditBooking />,
  },
  {
    path: 'update-profile/:userId',
    element: <UpdateProfile />,
  },
]
