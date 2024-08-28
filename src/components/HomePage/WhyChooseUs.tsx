import { FaDollarSign, FaCar, FaHeadset } from 'react-icons/fa'

const WhyChooseUs = () => {
  const features = [
    {
      icon: (
        <FaDollarSign className='mb-4 text-5xl text-blue-600 dark:text-blue-400' />
      ),
      title: 'Best Prices',
      description:
        'We offer competitive pricing with no hidden costs, ensuring you get the best deal for your rental.',
    },
    {
      icon: (
        <FaCar className='mb-4 text-5xl text-blue-600 dark:text-blue-400' />
      ),
      title: 'Wide Selection',
      description:
        'Choose from a diverse range of vehicles to suit your needs, from economy cars to luxury SUVs.',
    },
    {
      icon: (
        <FaHeadset className='mb-4 text-5xl text-blue-600 dark:text-blue-400' />
      ),
      title: '24/7 Support',
      description:
        'Our customer support team is available around the clock to assist you whenever needed.',
    },
  ]

  return (
    <section
      data-aos='fade-up'
      data-aos-duration='1000'
      className='py-16 bg-gray-50 dark:bg-gray-900'
    >
      <div className='max-w-6xl px-6 mx-auto text-center'>
        <h2 className='mb-12 text-4xl font-bold text-gray-900 dark:text-white'>
          Why Choose Us?
        </h2>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='p-8 text-center transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-lg dark:bg-gray-800 dark:text-gray-300'
            >
              {feature.icon}
              <h3 className='mb-4 text-2xl font-semibold text-gray-900 dark:text-white'>
                {feature.title}
              </h3>
              <p className='text-gray-600 dark:text-gray-400'>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
