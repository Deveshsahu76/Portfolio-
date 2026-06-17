import React from 'react'
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa'

export default function Footer(){
  return (
    <footer className="border-t border-white/5 mt-12 py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-slate-400 text-sm">© {new Date().getFullYear()} Devesh Sahu</div>

        <div className="flex items-center gap-4">
          <a href="https://github.com/Deveshsahu76" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white flex items-center gap-2">
            <FaGithub /> <span className="hidden md:inline">GitHub</span>
          </a>

          <a href="https://www.linkedin.com/in/devesh-sahu-560608270/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white flex items-center gap-2">
            <FaLinkedin /> <span className="hidden md:inline">LinkedIn</span>
          </a>

          <a href="https://www.instagram.com/devesh_0075?igsh=enpzZDY4Y3ZqbnBz" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white flex items-center gap-2">
            <FaInstagram /> <span className="hidden md:inline">Instagram</span>
          </a>

          <a href="mailto:deveshsahu567@gmail.com" className="text-slate-400 hover:text-white flex items-center gap-2">
            <FaEnvelope /> <span className="hidden md:inline">Email</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
