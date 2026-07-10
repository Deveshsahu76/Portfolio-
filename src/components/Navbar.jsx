import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FiDownload, FiMenu, FiX } from 'react-icons/fi'
import ThemeToggle from './ThemeToggle'
import ResumeLink from './ResumeLink'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/skills', label: 'Skills' },
  { to: '/about', label: 'About' },
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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-900/10 bg-white/75 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/72">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-lg font-black text-white shadow-lg dark:bg-white dark:text-slate-950">
            DS
          </div>
          <div>
            <p className="text-base font-black text-slate-950 dark:text-white">Devesh Sahu</p>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400">MERN Stack Developer</p>
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
                    ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                    : 'text-slate-600 hover:bg-slate-900/5 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <ResumeLink className="btn-primary px-4 py-2 text-sm">
            <FiDownload /> Resume
          </ResumeLink>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="grid h-11 w-11 place-items-center rounded-full border border-slate-900/10 bg-white/80 text-slate-950 dark:border-white/10 dark:bg-white/5 dark:text-white"
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-slate-900/10 bg-white/95 p-4 shadow-2xl dark:border-white/10 dark:bg-slate-950/95 lg:hidden">
          <div className="grid gap-2">
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

            <ResumeLink className="btn-primary mt-2" onClick={() => setOpen(false)}>
              <FiDownload /> Download Resume
            </ResumeLink>
          </div>
        </div>
      )}
    </header>
  )
}