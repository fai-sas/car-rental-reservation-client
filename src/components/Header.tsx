import { useEffect, useState } from 'react'
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { logout, selectCurrentUser } from '../redux/features/auth/authSlice'

const Header = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    return (
      savedTheme ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light')
    )
  })

  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light')
    document.documentElement.classList.add(theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const handleThemeSwitch = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))
  }

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
    <header className='sticky top-0 z-50 bg-gray-900 shadow-md dark:bg-gray-800'>
      <div className='flex items-center justify-between max-w-6xl px-6 py-4 mx-auto'>
        <div className='text-2xl font-bold text-white'>
          <Link className='flex items-center justify-center' to='/'>
            <img
              src='https://res.cloudinary.com/codingfreak/image/upload/v1725632761/lhtnewlrkvcevia6nuk1.png'
              width={50}
              height={50}
              className='rounded-full'
              alt='logo'
            />
            <p className='px-4'>Car Rental Reservation</p>
          </Link>
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
          } md:flex space-x-8 md:space-x-6 text-center md:items-center absolute md:static w-full md:w-auto left-0 top-16 md:top-auto bg-gray-900 dark:bg-gray-800 md:bg-transparent py-4 md:py-0 transition-all ease-in-out duration-300 z-20`}
        >
          <NavLink
            to='/carListing'
            className='block px-4 py-2 text-white md:inline-block hover:text-gray-300'
          >
            Listing
          </NavLink>
          <NavLink
            to='/booking'
            className='block px-4 py-2 text-white md:inline-block hover:text-gray-300'
          >
            Booking
          </NavLink>
          <NavLink
            to='/about'
            className='block px-4 py-2 text-white md:inline-block hover:text-gray-300'
          >
            About Us
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
              <NavLink to='/login'>
                <button className='px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-500'>
                  Login
                </button>
              </NavLink>
            </div>
          )}

          {user && (
            <div className='flex flex-col mt-4 space-y-4 md:flex-row md:space-y-0 md:space-x-4 md:mt-0'>
              <button
                onClick={handleLogout}
                className='px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-500'
              >
                Logout
              </button>
            </div>
          )}

          {/* Theme Switcher */}
          <button
            type='button'
            onClick={handleThemeSwitch}
            className='flex items-center px-4 py-2 text-white bg-gray-700 rounded hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500'
          >
            {theme === 'dark' ? (
              <FaSun className='text-yellow-400' size={20} />
            ) : (
              <FaMoon className='text-gray-300' size={20} />
            )}
            <span className='ml-2'>
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
