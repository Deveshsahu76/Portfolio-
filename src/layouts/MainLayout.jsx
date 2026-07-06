import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import LeftSidebar from '../components/LeftSidebar'
import CustomCursor from '../components/CustomCursor'

export default function MainLayout() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-950 antialiased dark:bg-slate-950 dark:text-white">
      <CustomCursor />

      <Navbar />

      <LeftSidebar />

      <div className="flex min-h-[calc(100vh-96px)] flex-col">
        <div className="flex-1">
          <Outlet />
        </div>

        <Footer />
      </div>
    </div>
  )
}