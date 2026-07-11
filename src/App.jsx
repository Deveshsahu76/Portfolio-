import React, { Suspense, lazy, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import AnalyticsTracker from './components/AnalyticsTracker'

const Home = lazy(() => import('./pages/Home'))
const Projects = lazy(() => import('./pages/Projects'))
const Skills = lazy(() => import('./pages/Skills'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const RecruiterHub = lazy(() => import('./pages/RecruiterHub'))
const Freelance = lazy(() => import('./pages/Freelance'))
const AdminRequests = lazy(() => import('./pages/AdminRequests'))
const AnalyticsDashboard = lazy(() => import('./pages/AnalyticsDashboard'))
const NotFound = lazy(() => import('./pages/NotFound'))

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    })
  }, [pathname])

  return null
}

function PageFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 text-slate-950 dark:bg-slate-950 dark:text-white">
      <div className="w-full max-w-xl rounded-[2rem] border border-slate-900/10 bg-white p-8 shadow-xl dark:border-white/10 dark:bg-slate-900">
        <div className="h-5 w-36 animate-pulse rounded-full bg-slate-200 dark:bg-white/10" />

        <div className="mt-5 h-12 w-full animate-pulse rounded-2xl bg-slate-200 dark:bg-white/10" />

        <div className="mt-3 h-5 w-4/5 animate-pulse rounded-full bg-slate-200 dark:bg-white/10" />

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="h-24 animate-pulse rounded-3xl bg-slate-200 dark:bg-white/10" />
          <div className="h-24 animate-pulse rounded-3xl bg-slate-200 dark:bg-white/10" />
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <>
      <AnalyticsTracker />
      <ScrollToTop />

      <Suspense fallback={<PageFallback />}>
        <Routes>
          {/* Public website routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/recruiter" element={<RecruiterHub />} />
            <Route path="/freelance" element={<Freelance />} />

            {/* Public 404 page */}
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Private admin routes — intentionally outside MainLayout */}
          <Route path="/admin/requests" element={<AdminRequests />} />
          <Route
            path="/admin-requests"
            element={<Navigate to="/admin/requests" replace />}
          />

          <Route path="/admin/analytics" element={<AnalyticsDashboard />} />
          <Route
            path="/analytics"
            element={<Navigate to="/admin/analytics" replace />}
          />
        </Routes>
      </Suspense>
    </>
  )
}