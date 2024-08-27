import { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { logout, selectCurrentUser } from '../redux/features/auth/authSlice'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const user = useAppSelector(selectCurrentUser)
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className='sticky top-0 z-50 bg-gray-900 shadow-md'>
      <div className='flex items-center justify-between max-w-6xl px-6 py-4 mx-auto'>
        {/* Logo and Company Name */}
        <div className='text-2xl font-bold text-white'>
          <NavLink to='/'>Car Rental Reservation</NavLink>
        </div>

        {/* Menu Toggle Button (for small screens) */}
        <div className='md:hidden'>
          <button onClick={toggleMenu} className='text-white'>
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } md:flex space-x-8 md:space-x-6 text-center md:items-center absolute md:static w-full md:w-auto left-0 top-16 md:top-auto bg-gray-900 md:bg-transparent py-4 md:py-0 transition-all ease-in-out duration-300 z-20`}
        >
          <NavLink
            to='/'
            className='block px-4 py-2 text-white md:inline-block hover:text-gray-300'
          >
            Home
          </NavLink>
          <NavLink
            to='carListing'
            className='block px-4 py-2 text-white md:inline-block hover:text-gray-300'
          >
            Listing
          </NavLink>
          <NavLink
            to='/'
            className='block px-4 py-2 text-white md:inline-block hover:text-gray-300'
          >
            Booking
          </NavLink>
          <NavLink
            to='about'
            className='block px-4 py-2 text-white md:inline-block hover:text-gray-300'
          >
            About Us
          </NavLink>

          <NavLink
            to='/'
            className='block px-4 py-2 text-white md:inline-block hover:text-gray-300'
          >
            Contact
          </NavLink>
          {user && (
            <NavLink
              to={`/${user?.role}/dashboard`}
              className='block px-4 py-2 text-white md:inline-block hover:text-gray-300'
            >
              Dashboard
            </NavLink>
          )}

          {!user && (
            <div className='flex flex-col mt-4 space-y-4 md:flex-row md:space-y-0 md:space-x-4 md:mt-0'>
              <NavLink to='login'>
                <button className='px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-500'>
                  Login
                </button>
              </NavLink>
            </div>
          )}

          {user && (
            <div className='flex flex-col mt-4 space-y-4 md:flex-row md:space-y-0 md:space-x-4 md:mt-0'>
              <NavLink to='login'>
                <button
                  onClick={handleLogout}
                  className='px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-500'
                >
                  Logout
                </button>
              </NavLink>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
