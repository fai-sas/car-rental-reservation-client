const Contact = () => {
  return (
    <section className='py-16 bg-gray-50'>
      <div className='px-6 mx-auto max-w-7xl'>
        <h2 className='mb-12 text-4xl font-extrabold text-center text-gray-900'>
          Get in Touch
        </h2>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          <div className='flex flex-col items-center p-8 text-center bg-white rounded-lg shadow-md'>
            <svg
              className='w-12 h-12 mb-4 text-blue-600'
              fill='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M21 16.5V6.5C21 6.22386 20.7761 6 20.5 6H3.5C3.22386 6 3 6.22386 3 6.5V16.5C3 16.7761 3.22386 17 3.5 17H20.5C20.7761 17 21 16.7761 21 16.5ZM3 5H21C21.5304 5 22.0391 5.21071 22.4142 5.58579C22.7893 5.96086 23 6.46957 23 7V17C23 17.5304 22.7893 18.0391 22.4142 18.4142C22.0391 18.7893 21.5304 19 21 19H3C2.46957 19 1.96086 18.7893 1.58579 18.4142C1.21071 18.0391 1 17.5304 1 17V7C1 6.46957 1.21071 5.96086 1.58579 5.58579C1.96086 5.21071 2.46957 5 3 5Z' />
            </svg>
            <h3 className='mb-4 text-xl font-semibold'>Phone</h3>
            <p className='text-gray-600'>
              <a
                href='tel:+1234567890'
                className='text-blue-600 hover:underline'
              >
                +1 (234) 567-890
              </a>
            </p>
          </div>
          <div className='flex flex-col items-center p-8 text-center bg-white rounded-lg shadow-md'>
            <svg
              className='w-12 h-12 mb-4 text-blue-600'
              fill='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.03 20 3 15.97 3 11C3 6.03 7.03 2 12 2C16.97 2 21 6.03 21 11C21 15.97 16.97 20 12 20ZM11 7H13V11H11V7ZM11 13H13V15H11V13Z' />
            </svg>
            <h3 className='mb-4 text-xl font-semibold'>Email</h3>
            <p className='text-gray-600'>
              <a
                href='mailto:info@company.com'
                className='text-blue-600 hover:underline'
              >
                info@company.com
              </a>
            </p>
          </div>
          <div className='flex flex-col items-center p-8 text-center bg-white rounded-lg shadow-md'>
            <svg
              className='w-12 h-12 mb-4 text-blue-600'
              fill='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M3 5V4C3 3.44772 3.44772 3 4 3H20C20.5523 3 21 3.44772 21 4V5H3ZM3 6H21V21H3V6ZM20 19H16V17H20V19ZM12 19H8V17H12V19ZM4 19H8V17H4V19ZM20 14H4V10H20V14Z' />
            </svg>
            <h3 className='mb-4 text-xl font-semibold'>Address</h3>
            <p className='text-gray-600'>
              123 Main Street,
              <br />
              Cityville, ST 12345
              <br />
              Country
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
