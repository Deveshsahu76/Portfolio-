import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import ThemeToggle from './ThemeToggle'
import { motion } from 'framer-motion'
import profileImg from '../assets/portfolioimage.png'

const links = [
  {to: '/', label: 'Home'},
  {to: '/about', label: 'About'},
  {to: '/projects', label: 'Projects'},
  {to: '/skills', label: 'Skills'},
  {to: '/contact', label: 'Contact'}
]

export default function Navbar(){
  const [open, setOpen] = useState(false)

  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <motion.nav initial={{y:-20,opacity:0}} animate={{y:0,opacity:1}} className="backdrop-blur-xs glass fixed inset-x-0 top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 px-4 py-3 md:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img src={profileImg} alt="Devesh Sahu" className="w-10 h-10 rounded-full object-cover" />
          <div className="text-sm">
            <div className="font-semibold">Devesh Sahu</div>
            <div className="text-xs text-slate-400">Full-Stack Developer</div>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {links.map(l=> (
            <NavLink key={l.to} to={l.to} className={({isActive})=> isActive? 'text-white font-medium':'text-slate-300 hover:text-white'}>{l.label}</NavLink>
          ))}
          <ThemeToggle />
        </div>

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="p-2 rounded-md hover:bg-white/5"
            onClick={() => setOpen(prev => !prev)}
          >
            {open ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden absolute inset-x-0 top-full z-40 border-t border-white/10 bg-black/90 backdrop-blur-xl py-4">
          <div className="flex flex-col gap-2 px-4">
            {links.map(l=> (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({isActive})=> `block rounded-2xl px-4 py-3 text-sm font-medium ${isActive ? 'bg-primary text-black' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </motion.nav>
  )
}
