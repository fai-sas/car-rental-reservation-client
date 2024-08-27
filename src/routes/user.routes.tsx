import BookingForm2 from '../components/BookingForm2'
import BookingHistory from '../pages/BookingHistory'

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
]
