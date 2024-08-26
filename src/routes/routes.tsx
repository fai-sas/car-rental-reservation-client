import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import Login from '../pages/Login'
import Register from '../pages/Register'
import { routeGenerator } from '../utils/routesGenerator'
import { adminPaths } from './admin.routes'
import MainLayout from '../layout/MainLayout'
import { userPaths } from './user.routes'
import ProtectedRoute from '../layout/ProtectedRoute'
import AboutPage from '../pages/AboutPage'
import CarDetailsPage from '../pages/CarDetailsPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/car/:carId',
    element: <CarDetailsPage />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute role='admin'>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths),
  },
  {
    path: '/user',
    element: (
      <ProtectedRoute role='user'>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: routeGenerator(userPaths),
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
