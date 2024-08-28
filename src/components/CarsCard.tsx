import { Link } from 'react-router-dom'

const CarsCard = ({ car }) => {
  const { _id, name, image, pricePerHour, description, carType } = car

  return (
    <>
      <div
        data-aos='fade-up'
        data-aos-duration='1000'
        className='relative my-8 text-gray-700 bg-white shadow-md rounded-xl bg-clip-border dark:bg-gray-800 dark:text-gray-300'
      >
        <div className='rounded-md '>
          <img
            className='object-cover h-[15rem] w-full rounded-md'
            src={
              image ||
              'https://i5.walmartimages.com/seo/Better-Homes-Gardens-Mira-Swivel-Chair-Cream_51bf8cde-3692-4821-a735-be282022e068.309726e63c3a4f3ab95fc795e9270f64.jpeg'
            }
            alt={name}
          />
        </div>
        <div className='p-6'>
          <h5 className='block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 dark:text-white'>
            {name}
          </h5>
          <article className='flex justify-between'>
            <p className='py-4 text-lg font-bold dark:text-gray-300'>
              {carType}
            </p>
            <p className='py-4 text-lg font-bold dark:text-gray-300'>
              ${pricePerHour}
            </p>
          </article>

          <article className='flex justify-between'>
            <p className='block font-sans text-base antialiased font-light leading-relaxed text-inherit dark:text-gray-400'>
              {description}
            </p>
          </article>
        </div>
        <div className='p-6 pt-0'>
          <Link to={`/car/${_id}`}>
            <button
              data-ripple-light='true'
              type='button'
              className='select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none dark:bg-blue-600 dark:shadow-blue-600/30 dark:hover:shadow-blue-600/50'
            >
              View More
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default CarsCard
