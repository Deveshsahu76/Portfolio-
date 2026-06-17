import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FiMenu } from 'react-icons/fi'
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
  return (
    <motion.nav initial={{y:-20,opacity:0}} animate={{y:0,opacity:1}} className="backdrop-blur-xs glass fixed w-full z-40">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
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

        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button aria-label="menu" className="p-2 rounded-md hover:bg-white/5">
            <FiMenu size={20} />
          </button>
        </div>
      </div>
    </motion.nav>
  )
}
