import { useGetAllCarsQuery } from '../../redux/features/cars/carsApi'
import CarsCard from '../CarsCard'
import Loader from '../Loader'
import { useEffect, useState } from 'react'

// Function to shuffle array without mutating the original array
function shuffleArray(array) {
  const newArray = [...array] // Create a new array to avoid mutating the original
  let currentIndex = newArray.length,
    temporaryValue,
    randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = newArray[currentIndex]
    newArray[currentIndex] = newArray[randomIndex]
    newArray[randomIndex] = temporaryValue
  }

  return newArray
}

const FeaturedCars = () => {
  const { data, isLoading, isError } = useGetAllCarsQuery(undefined)
  const [randomCars, setRandomCars] = useState([])

  useEffect(() => {
    if (!isLoading && !isError && data?.data?.length > 0) {
      // Shuffle the array to get random products
      const shuffledCars = shuffleArray(data?.data)
      // Select a subset of random products (e.g., first 3)
      const selectedCars = shuffledCars.slice(0, 3)
      setRandomCars(selectedCars)
    }
  }, [data, isLoading, isError])

  if (isLoading) {
    return <Loader />
  }

  if (isError || !randomCars?.length) {
    return (
      <h1 className='text-6xl font-bold text-red-800 '>No Data Found...</h1>
    )
  }

  return (
    <section
      data-aos='fade-up'
      data-aos-duration='1000'
      className='container p-8 mx-auto mt-12'
    >
      <div className='flex flex-col items-start w-full max-w-xl px-4 mx-auto lg:px-8 lg:max-w-screen-xl'>
        <h1 className='text-2xl font-bold '>Featured Cars</h1>
        <div className='grid grid-cols-1 gap-4 my-8 md:grid-cols-3'>
          {randomCars.map((car) => (
            <CarsCard key={car?._id} car={car} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedCars
