import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import Login from '../pages/Login'
import Register from '../pages/Register'
import { routeGenerator } from '../utils/routesGenerator'
import { adminPaths } from './admin.routes'
import MainLayout from '../layout/MainLayout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/admin',
    element: (
      // <ProtectedRoute role='admin'>
      <MainLayout />
      // </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths),
  },
  // {
  //   path: '/edit-car/:carId',
  //   element: <EditCar />,
  // },
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
