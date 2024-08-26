import CompanyHistory from '../components/AboutPage/CompanyHistory'
import OurFleet from '../components/AboutPage/OurFleet'
import OurTeam from '../components/AboutPage/OurTeam'
import Values from '../components/AboutPage/Values'
import Footer from '../components/Footer'
import Header from '../components/Header'

const AboutPage = () => {
  return (
    <>
      <Header />
      <CompanyHistory />
      <OurTeam />
      <OurFleet />
      <Values />
      <Footer />
    </>
  )
}

export default AboutPage
