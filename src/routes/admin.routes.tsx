import AddCar from '../components/AddCar'
import EditCar from '../components/EditCar'
import AdminDashboard from '../pages/AdminDashboard'
import AllBookings from '../pages/AllBookings'
import AllCars from '../pages/AllCars'
import AllUsers from '../pages/AllUsers'

export const adminPaths = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    element: <AdminDashboard />,
  },
  {
    name: 'Car Management',
    children: [
      {
        name: 'All Cars',
        path: 'cars',
        element: <AllCars />,
      },
      {
        name: 'Add Car',
        path: 'add-car',
        element: <AddCar />,
      },
      {
        path: 'edit-car/:carId',
        element: <EditCar />,
      },
    ],
  },
  {
    name: 'Booking Management',
    children: [
      {
        name: 'All Bookings',
        path: 'all-bookings',
        element: <AllBookings />,
      },
      {
        name: 'Edit Booking',
        path: 'edit-booking',
        element: <EditCar />,
      },
    ],
  },
  {
    name: 'User Management',
    children: [
      {
        name: 'All Users',
        path: 'all-users',
        element: <AllUsers />,
      },
      {
        path: 'user/:userId',
        element: <AddCar />,
      },
    ],
  },
]
