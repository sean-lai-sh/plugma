import React from 'react'
import SignupComp from '@/components/signup'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import {Toaster} from '@/components/ui/toaster'
const PAge = () => {
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar/>
      <SignupComp/>
      <Footer/>

    </div>
  )
}

export default PAge