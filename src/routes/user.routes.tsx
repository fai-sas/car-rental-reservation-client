import BookingForm from '../components/BookingForm'
import UserDashboard from '../pages/UserDashboard'

export const userPaths = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    element: <UserDashboard />,
  },
  {
    name: 'Add Booking',
    path: 'add-booking',
    element: <BookingForm />,
  },
  {
    name: 'Update Booking',
    path: 'update-booking',
    element: <BookingForm />,
  },
]
