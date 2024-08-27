import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <>
      <div className='container flex flex-col items-center justify-center min-h-screen mx-auto md:flex-row'>
        <img
          src='https://i.ibb.co/6497y9K/Location-search-re-ttoj.png'
          className='md:w-1/2'
          alt=''
        />
        <div className='px-4 py-10 text-center sm:px-6 lg:px-8 md:w-1/2'>
          <h1 className='block font-bold text-gray-800 text-7xl sm:text-9xl dark:text-white'>
            404
          </h1>
          <h1 className='block text-2xl font-bold text-white'></h1>
          <p className='mt-3 text-gray-600 dark:text-gray-400'>
            Oops, something went wrong.
          </p>
          <p className='text-lg text-gray-600 dark:text-gray-400'>
            Sorry, we could not find the page you were looking for
          </p>
          <div className='flex flex-col items-center justify-center gap-2 mt-5 sm:flex-row sm:gap-3'>
            <Link
              to='/'
              className='inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-center text-white transition bg-blue-600 border border-transparent rounded-md sm:w-auto gap-x-3 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800'
            >
              Back Home
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
export default ErrorPage
