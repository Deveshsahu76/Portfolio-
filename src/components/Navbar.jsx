import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FiDownload, FiMenu, FiX, FiZap } from 'react-icons/fi'
import ThemeToggle from './ThemeToggle'
import profileImg from '../assets/portfolioimage.png'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/skills', label: 'Skills' },
  { to: '/recruiter', label: 'Recruiter' },
  { to: '/freelance', label: 'Freelance' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-900/10 bg-white/70 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/72">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-3">
          <div className="relative">
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 opacity-60 blur" />
            <img
              src={profileImg}
              alt="Devesh Sahu"
              className="relative h-12 w-12 rounded-full border border-white/50 object-cover shadow-md dark:border-white/10"
            />
          </div>

          <div className="leading-tight">
            <p className="font-black text-slate-950 dark:text-white">Devesh Sahu</p>
            <p className="flex items-center gap-1 text-sm font-bold text-slate-600 dark:text-slate-400">
              <FiZap className="text-violet-500" /> AI Career OS
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-black transition ${
                  isActive
                    ? 'bg-slate-950 text-white shadow-lg shadow-slate-900/15 dark:bg-white dark:text-slate-950'
                    : 'text-slate-600 hover:bg-slate-900/5 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <a href="/resume.pdf" download className="btn-secondary ml-2 px-4 py-2 text-sm">
            <FiDownload /> Resume
          </a>

          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="grid h-11 w-11 place-items-center rounded-full border border-slate-900/10 bg-white/70 text-slate-900 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white"
            aria-label="Open menu"
          >
            {open ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-slate-900/10 bg-white/95 px-4 py-4 shadow-2xl dark:border-white/10 dark:bg-slate-950/95 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 text-sm font-black ${
                    isActive
                      ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                      : 'text-slate-700 hover:bg-slate-900/5 dark:text-slate-300 dark:hover:bg-white/10'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <a href="/resume.pdf" download onClick={() => setOpen(false)} className="btn-primary mt-2">
              <FiDownload /> Download Resume
            </a>
          </div>
        </div>
      )}
    </header>
  )
}