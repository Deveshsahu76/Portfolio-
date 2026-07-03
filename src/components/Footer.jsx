import React from 'react'
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="border-t border-slate-900/10 px-4 py-7 dark:border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm font-semibold text-slate-600 dark:text-slate-400 sm:flex-row">
        <p>© 2026 Devesh Sahu</p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="https://github.com/Deveshsahu76" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-violet-600">
            <FaGithub /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/devesh-sahu-560608270/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-violet-600">
            <FaLinkedin /> LinkedIn
          </a>
          <a href="mailto:deveshsahu567@gmail.com" className="inline-flex items-center gap-2 hover:text-violet-600">
            <FaEnvelope /> Email
          </a>
        </div>
      </div>
    </footer>
  )
}