import { FaDollarSign, FaCar, FaHeadset } from 'react-icons/fa'

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaDollarSign className='mb-4 text-5xl text-blue-600' />,
      title: 'Best Prices',
      description:
        'We offer competitive pricing with no hidden costs, ensuring you get the best deal for your rental.',
    },
    {
      icon: <FaCar className='mb-4 text-5xl text-blue-600' />,
      title: 'Wide Selection',
      description:
        'Choose from a diverse range of vehicles to suit your needs, from economy cars to luxury SUVs.',
    },
    {
      icon: <FaHeadset className='mb-4 text-5xl text-blue-600' />,
      title: '24/7 Support',
      description:
        'Our customer support team is available around the clock to assist you whenever needed.',
    },
  ]

  return (
    <section className='py-16 bg-gray-50'>
      <div className='max-w-6xl px-6 mx-auto text-center'>
        <h2 className='mb-12 text-4xl font-bold'>Why Choose Us?</h2>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='p-8 text-center transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-lg'
            >
              {feature.icon}
              <h3 className='mb-4 text-2xl font-semibold'>{feature.title}</h3>
              <p className='text-gray-600'>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
