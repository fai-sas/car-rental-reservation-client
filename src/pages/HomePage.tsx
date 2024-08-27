import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import FeaturedCars from '../components/HomePage/FeaturedCars'
import Hero from '../components/HomePage/Hero'
import Testimonials from '../components/HomePage/Testimonials'
import WhyChooseUs from '../components/HomePage/WhyChooseUs'

const HomePage = () => {
  return (
    <>
      <Header />
      <Hero />
      <FeaturedCars />
      <WhyChooseUs />
      <Testimonials />
      <Footer />
    </>
  )
}

export default HomePage
