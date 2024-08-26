const teamMembers = [
  {
    name: 'John Doe',
    role: 'Founder & CEO',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Jane Smith',
    role: 'Chief Operating Officer',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Michael Johnson',
    role: 'Head of Marketing',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Emily Davis',
    role: 'Customer Support Manager',
    image: 'https://via.placeholder.com/150',
  },
]

const OurTeam = () => {
  return (
    <section className='py-12 bg-white'>
      <div className='px-6 mx-auto max-w-7xl'>
        <h2 className='mb-12 text-4xl font-bold text-center'>Meet Our Team</h2>
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4'>
          {teamMembers.map((member, index) => (
            <div key={index} className='text-center'>
              <img
                src={member.image}
                alt={member.name}
                className='object-cover w-32 h-32 mx-auto mb-4 rounded-full'
              />
              <h3 className='text-xl font-semibold'>{member.name}</h3>
              <p className='text-gray-600'>{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurTeam
