import { FaStar } from 'react-icons/fa'

const testimonials = [
  {
    name: 'John Doe',
    review:
      'Amazing service! The booking process was smooth and the car was in perfect condition. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Jane Smith',
    review:
      'Excellent customer support and a wide variety of cars to choose from. I had a great experience!',
    rating: 4,
  },
  {
    name: 'Michael Johnson',
    review:
      'The best prices I could find with no hidden charges. I will definitely book again!',
    rating: 5,
  },
]

const Testimonials = () => {
  return (
    <section
      data-aos='fade-up'
      data-aos-duration='1000'
      className='py-16 bg-white'
    >
      <div className='max-w-6xl px-6 mx-auto text-center'>
        <h2 className='mb-12 text-4xl font-bold'>
          What Our Customers are Saying
        </h2>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className='p-8 transition-shadow duration-300 rounded-lg shadow-md bg-gray-50 hover:shadow-lg'
            >
              <div className='flex justify-center mb-4'>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className='text-xl text-yellow-500' />
                ))}
              </div>
              <p className='mb-4 italic text-gray-600'>
                "{testimonial.review}"
              </p>
              <h3 className='text-lg font-semibold'>{testimonial.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
