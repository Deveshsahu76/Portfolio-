import React from 'react'
import { Link } from 'react-router-dom'
import {
  FiArrowLeft,
  FiFolder,
  FiHome,
  FiMail,
  FiSearch,
} from 'react-icons/fi'
import SEO from '../components/SEO'

export default function NotFound() {
  return (
    <>
      <SEO
        title="Page Not Found | Devesh Sahu"
        description="The page you are looking for does not exist. Return to the Devesh Sahu portfolio homepage, projects or contact page."
        path="/404"
        noIndex
      />

      <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-slate-50 px-4 py-24 text-slate-950 dark:bg-slate-950 dark:text-white">
        <section className="relative w-full max-w-4xl overflow-hidden rounded-[2.5rem] border border-slate-900/10 bg-white p-7 text-center shadow-2xl shadow-slate-900/10 dark:border-white/10 dark:bg-slate-900 sm:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"
          />

          <div className="relative">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-50 text-3xl text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-300">
              <FiSearch />
            </div>

            <p className="mt-7 text-sm font-black uppercase tracking-[0.24em] text-indigo-600 dark:text-indigo-300">
              Error 404
            </p>

            <h1 className="mx-auto mt-4 max-w-2xl text-4xl font-black tracking-[-0.05em] text-slate-950 dark:text-white sm:text-6xl">
              This page could not be found.
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base font-semibold leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
              The URL may be incorrect, the page may have moved, or the content
              may no longer be available. Use one of the options below to
              continue exploring the portfolio.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/20 dark:bg-white dark:text-slate-950"
              >
                <FiHome />
                Back to Home
              </Link>

              <Link
                to="/projects"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-900/10 bg-white px-6 py-3 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
              >
                <FiFolder />
                View Projects
              </Link>

              <Link
                to="/contact"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-900/10 bg-white px-6 py-3 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
              >
                <FiMail />
                Contact Me
              </Link>
            </div>

            <button
              type="button"
              onClick={() => window.history.back()}
              className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-black text-slate-500 transition hover:bg-slate-900/5 hover:text-slate-950 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <FiArrowLeft />
              Go to previous page
            </button>
          </div>
        </section>
      </main>
    </>
  )
}