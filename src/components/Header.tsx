import { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className='sticky top-0 z-50 text-gray-200 bg-gray-800 shadow-md'>
      <div className='flex items-center justify-between max-w-6xl px-6 py-4 mx-auto'>
        {/* Logo and Company Name */}
        <div className='text-2xl font-bold'>
          <NavLink to='/'>Car Rental Reservation</NavLink>
        </div>

        {/* Menu Toggle Button (for small screens) */}
        <div className='md:hidden'>
          <button onClick={toggleMenu} className='text-gray-200'>
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } md:flex space-x-8 md:space-x-6 text-center md:items-center absolute md:static w-full md:w-auto left-0 top-16 md:top-auto bg-gray-800 md:bg-transparent py-4 md:py-0 transition-all ease-in-out duration-300 z-20`}
        >
          <NavLink
            to='/'
            className='block px-4 py-2 md:inline-block hover:text-white'
          >
            Home
          </NavLink>
          <NavLink
            to='/'
            className='block px-4 py-2 md:inline-block hover:text-white'
          >
            About Us
          </NavLink>
          <NavLink
            to='/'
            className='block px-4 py-2 md:inline-block hover:text-white'
          >
            Booking
          </NavLink>
          <NavLink
            to='/'
            className='block px-4 py-2 md:inline-block hover:text-white'
          >
            Contact
          </NavLink>

          {/* Login/Sign Up Buttons */}
          <div className='flex flex-col mt-4 space-y-4 md:flex-row md:space-y-0 md:space-x-4 md:mt-0'>
            <button className='px-4 py-2 text-white bg-gray-700 rounded hover:bg-gray-600'>
              Login
            </button>
            <button className='px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-500'>
              Sign Up
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
