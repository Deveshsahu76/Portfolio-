import React, { useEffect, useState } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <button
      type="button"
      onClick={() => setDark((prev) => !prev)}
      className="grid h-11 w-11 place-items-center rounded-full border border-slate-900/10 bg-white/70 text-slate-800 shadow-sm backdrop-blur-xl transition hover:-translate-y-1 hover:border-violet-400 hover:text-violet-600 dark:border-white/10 dark:bg-white/5 dark:text-white"
      aria-label="Toggle theme"
    >
      {dark ? <FiSun size={18} /> : <FiMoon size={18} />}
    </button>
  )
}