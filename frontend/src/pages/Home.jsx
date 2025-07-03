import React from 'react'
import HeroSection from '../components/HeroSection'
import CustomersFavorites from '../components/CustomerFavorites'
import Cards from '../components/Cards'
import OurTrending from '../components/OurTranding'
import Memories from '../components/Memories'
import WeddingJourney from '../components/WeddingJourney'
import OurCustomers from '../components/OurCustomers'
// import PromiseCard from '../components/PromiseCard'

const Home = () => {
  return (
    <div>
      <HeroSection />
      <CustomersFavorites />
      <Cards />
      <OurTrending />
      <Memories/>
      <WeddingJourney/>
      <OurCustomers/>
      {/* <PromiseCard/> */}
    </div>
  )
}

export default Home