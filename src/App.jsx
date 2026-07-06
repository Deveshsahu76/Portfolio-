import React, { Suspense, lazy, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import SEO from './components/SEO'
import AnalyticsTracker from './components/AnalyticsTracker'
import { homePageSchema } from './seo/schema'

const Home = lazy(() => import('./pages/Home'))
const Projects = lazy(() => import('./pages/Projects'))
const Skills = lazy(() => import('./pages/Skills'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const RecruiterHub = lazy(() => import('./pages/RecruiterHub'))
const Freelance = lazy(() => import('./pages/Freelance'))
const AdminRequests = lazy(() => import('./pages/AdminRequests'))
const AnalyticsDashboard = lazy(() => import('./pages/AnalyticsDashboard'))

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return null
}

function PageFallback() {
  return (
    <div className="section-container">
      <div className="soft-card rounded-[2rem] p-8">
        <div className="h-6 w-48 animate-pulse rounded-full bg-slate-200 dark:bg-white/10" />
        <div className="mt-5 h-24 w-full animate-pulse rounded-3xl bg-slate-200 dark:bg-white/10" />
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="h-40 animate-pulse rounded-3xl bg-slate-200 dark:bg-white/10" />
          <div className="h-40 animate-pulse rounded-3xl bg-slate-200 dark:bg-white/10" />
          <div className="h-40 animate-pulse rounded-3xl bg-slate-200 dark:bg-white/10" />
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <>
      <SEO schema={homePageSchema} />
      <AnalyticsTracker />
      <ScrollToTop />

      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/recruiter" element={<RecruiterHub />} />
            <Route path="/freelance" element={<Freelance />} />
            <Route path="/admin-requests" element={<AdminRequests />} />
            <Route path="/analytics" element={<AnalyticsDashboard />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}