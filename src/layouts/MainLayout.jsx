import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CustomCursor from '../components/CustomCursor'

export default function MainLayout() {
  return (
    <div className="site-shell min-h-screen overflow-x-hidden bg-slate-50 text-slate-950 antialiased dark:bg-slate-950 dark:text-white">
      <a
        href="#main-content"
        className="site-skip-link"
      >
        Skip to main content
      </a>

      <CustomCursor />
      <Navbar />

      <div className="site-page-stack flex min-h-screen min-w-0 flex-col">
        <main
          id="main-content"
          tabIndex={-1}
          className="site-main-content min-w-0 flex-1"
        >
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  )
}