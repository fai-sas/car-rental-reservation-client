import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import Login from '../pages/Login'
import Register from '../pages/Register'
import EditCar from '../components/EditCar'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/edit-car/:carId',
    element: <EditCar />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
])

export default router
