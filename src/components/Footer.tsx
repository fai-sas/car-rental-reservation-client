import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className='py-8 text-gray-300 bg-gray-800'>
      <div className='max-w-6xl px-6 mx-auto'>
        <div className='flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0'>
          <div className='flex flex-col items-center md:items-start'>
            <h3 className='mb-4 text-lg font-semibold'>Connect with Us</h3>
            <div className='flex space-x-4'>
              <a href='#' className='text-gray-300 hover:text-white'>
                <FaFacebookF />
              </a>
              <a href='#' className='text-gray-300 hover:text-white'>
                <FaTwitter />
              </a>
              <a href='#' className='text-gray-300 hover:text-white'>
                <FaInstagram />
              </a>
              <a href='#' className='text-gray-300 hover:text-white'>
                <FaLinkedinIn />
              </a>
            </div>
          </div>
          <div className='flex flex-col items-center md:items-start'>
            <h3 className='mb-4 text-lg font-semibold'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <a href='#' className='hover:text-white'>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white'>
                  Terms of Service
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white'>
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className='pt-4 mt-6 text-center border-t border-gray-700'>
          <p>
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
