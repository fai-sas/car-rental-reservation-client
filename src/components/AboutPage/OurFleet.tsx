const fleetData = [
  {
    category: 'Economy',
    description: 'Affordable and fuel-efficient cars for everyday travel.',
    image: 'https://via.placeholder.com/150',
  },
  {
    category: 'Luxury',
    description: 'Premium vehicles offering top-of-the-line comfort and style.',
    image: 'https://via.placeholder.com/150',
  },
  {
    category: 'SUVs',
    description:
      'Spacious and powerful SUVs, perfect for family trips and off-road adventures.',
    image: 'https://via.placeholder.com/150',
  },
  {
    category: 'Electric',
    description: 'Eco-friendly electric vehicles with the latest technology.',
    image: 'https://via.placeholder.com/150',
  },
]

const OurFleet = () => {
  return (
    <section className='py-12 bg-gray-100'>
      <div className='px-6 mx-auto max-w-7xl'>
        <h2 className='mb-12 text-4xl font-bold text-center'>Our Fleet</h2>
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4'>
          {fleetData.map((car, index) => (
            <div
              key={index}
              className='p-6 text-center bg-white rounded-lg shadow-lg'
            >
              <img
                src={car.image}
                alt={car.category}
                className='object-cover w-32 h-32 mx-auto mb-4 rounded-lg'
              />
              <h3 className='mb-2 text-2xl font-semibold'>{car.category}</h3>
              <p className='text-gray-600'>{car.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurFleet
