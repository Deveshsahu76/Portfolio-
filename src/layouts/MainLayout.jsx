import React from 'react'
import Navbar from '../components/Navbar'
import SocialRail from '../components/SocialRail'
import Footer from '../components/Footer'

export default function MainLayout({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="floating-orb left-8 top-28 h-5 w-5 bg-violet-500" />
      <div className="floating-orb right-12 top-36 h-7 w-7 bg-cyan-400" />
      <div className="floating-orb bottom-24 left-1/3 h-4 w-4 bg-blue-500" />

      <Navbar />
      <SocialRail />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
