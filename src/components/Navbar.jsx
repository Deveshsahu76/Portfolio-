import React, {
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  Link,
  NavLink,
  useLocation,
} from 'react-router-dom'
import {
  FiDownload,
  FiMenu,
  FiX,
} from 'react-icons/fi'
import ThemeToggle from './ThemeToggle'
import ResumeLink from './ResumeLink'

const navLinks = [
  {
    to: '/',
    label: 'Home',
  },
  {
    to: '/projects',
    label: 'Projects',
  },
  {
    to: '/skills',
    label: 'Skills',
  },
  {
    to: '/about',
    label: 'About',
  },
  {
    to: '/recruiter',
    label: 'Recruiter',
  },
  {
    to: '/freelance',
    label: 'Freelance',
  },
  {
    to: '/contact',
    label: 'Contact',
  },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const location = useLocation()
  const menuButtonRef = useRef(null)

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow =
      open ? 'hidden' : ''

    const handleEscape = (event) => {
      if (
        event.key === 'Escape' &&
        open
      ) {
        setOpen(false)

        menuButtonRef.current?.focus()
      }
    }

    document.addEventListener(
      'keydown',
      handleEscape
    )

    return () => {
      document.body.style.overflow = ''

      document.removeEventListener(
        'keydown',
        handleEscape
      )
    }
  }, [open])

  const getDesktopLinkClass = ({
    isActive,
  }) => {
    return [
      'rounded-full',
      'px-4',
      'py-2',
      'text-sm',
      'font-black',
      'transition',
      'duration-200',

      isActive
        ? 'bg-slate-950 text-white shadow-lg dark:bg-white dark:text-slate-950'
        : 'text-slate-600 hover:bg-slate-900/5 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white',
    ].join(' ')
  }

  const getMobileLinkClass = ({
    isActive,
  }) => {
    return [
      'flex',
      'items-center',
      'justify-between',
      'rounded-2xl',
      'px-4',
      'py-3',
      'text-sm',
      'font-black',
      'transition',

      isActive
        ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
        : 'text-slate-700 hover:bg-slate-900/5 dark:text-slate-300 dark:hover:bg-white/10',
    ].join(' ')
  }

  return (
    <header className="site-navbar fixed inset-x-0 top-0 z-50 border-b border-slate-900/10 bg-white/80 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/80">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="flex min-w-0 items-center gap-3 rounded-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/20"
          aria-label="Devesh Sahu portfolio home"
        >
          <div className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-2xl bg-slate-950 text-lg font-black text-white shadow-lg dark:bg-white dark:text-slate-950">
            DS
          </div>

          <div className="min-w-0">
            <p className="truncate text-base font-black text-slate-950 dark:text-white">
              Devesh Sahu
            </p>

            <p className="truncate text-xs font-bold text-slate-500 dark:text-slate-400">
              MERN Stack Developer
            </p>
          </div>
        </Link>

        <div
          id="desktop-navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={getDesktopLinkClass}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <ResumeLink className="btn-primary px-4 py-2 text-sm">
            <FiDownload />
            Resume
          </ResumeLink>

          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() =>
              setOpen((current) => !current)
            }
            aria-label={
              open
                ? 'Close navigation menu'
                : 'Open navigation menu'
            }
            aria-expanded={open}
            aria-controls="mobile-navigation"
            className="grid h-11 w-11 place-items-center rounded-full border border-slate-900/10 bg-white/85 text-xl text-slate-950 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-navigation"
          className="site-mobile-navigation border-t border-slate-900/10 bg-white/95 px-4 pb-5 pt-4 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/95 lg:hidden"
        >
          <div className="mx-auto grid max-w-7xl gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={getMobileLinkClass}
              >
                <span>{link.label}</span>

                <span aria-hidden="true">
                  →
                </span>
              </NavLink>
            ))}

            <ResumeLink
              className="btn-primary mt-2"
              onClick={() => setOpen(false)}
            >
              <FiDownload />
              Download Resume
            </ResumeLink>
          </div>
        </div>
      )}
    </header>
  )
}