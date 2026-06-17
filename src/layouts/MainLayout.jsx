import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import LeftSidebar from '../components/LeftSidebar'
import CustomCursor from '../components/CustomCursor'

export default function MainLayout({children}){
  return (
    <div className="min-h-screen text-slate-200">
      <CustomCursor />
      <LeftSidebar />
      <Navbar />
      <main className="container mx-auto px-4 py-12 md:pl-28">{children}</main>
      <Footer />
    </div>
  )
}
