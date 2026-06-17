import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

export default function LeftSidebar(){
  return (
    <aside className="hidden md:flex flex-col fixed left-4 top-1/3 z-50 items-center gap-4">
      <nav className="flex flex-col items-center gap-4">
        <NavLink to="/" className={({isActive})=> isActive? 'text-white':'text-slate-400'}>Home</NavLink>
        <NavLink to="/about" className={({isActive})=> isActive? 'text-white':'text-slate-400'}>About</NavLink>
        <NavLink to="/projects" className={({isActive})=> isActive? 'text-white':'text-slate-400'}>Projects</NavLink>
        <NavLink to="/skills" className={({isActive})=> isActive? 'text-white':'text-slate-400'}>Skills</NavLink>
        <NavLink to="/contact" className={({isActive})=> isActive? 'text-white':'text-slate-400'}>Contact</NavLink>
      </nav>

      <div className="w-px h-16 bg-white/5 mt-4" />

      <div className="flex flex-col items-center gap-3">
        <a href="https://github.com/Deveshsahu76" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white"><FaGithub/></a>
        <a href="https://www.linkedin.com/in/devesh-sahu-560608270/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white"><FaLinkedin/></a>
        <a href="mailto:deveshsahu567@gmail.com" className="text-slate-400 hover:text-white"><FaEnvelope/></a>
      </div>
    </aside>
  )
}
