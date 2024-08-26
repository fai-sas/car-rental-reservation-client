import Hero from '../components/HomePage/Hero'
import Testimonials from '../components/HomePage/Testimonials'
import WhyChooseUs from '../components/HomePage/WhyChooseUs'

const HomePage = () => {
  return (
    <>
      <div>{/* <h1 className='p-12 text-4xl font-bold '>HomePage</h1> */}</div>
      <Hero />
      <WhyChooseUs />
      <Testimonials />
    </>
  )
}

export default HomePage
