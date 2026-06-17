import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import LeftSidebar from '../components/LeftSidebar'
import CustomCursor from '../components/CustomCursor'

export default function MainLayout({children}){
  return (
    <div className="min-h-screen text-slate-200 overflow-x-hidden">
      <CustomCursor />
      <LeftSidebar />
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 pt-28 pb-24 md:px-6 lg:px-8 xl:px-10">{children}</main>
      <Footer />
    </div>
  )
}
