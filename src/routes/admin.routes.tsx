import AddCar from '../components/AddCar'
import EditCar from '../components/EditCar'
import AdminDashboard from '../pages/AdminDashboard'
import AllCars from '../pages/AllCars'

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
        name: 'Get All Bookings',
        path: 'bookings',
        element: <AddCar />,
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
        name: 'Create User',
        path: 'add-user',
        element: <AddCar />,
      },
      {
        name: 'Get All Users',
        path: 'users',
        element: <AddCar />,
      },
      {
        path: 'user/:userId',
        element: <AddCar />,
      },
    ],
  },
]
