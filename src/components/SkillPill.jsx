import React from 'react'

export default function SkillPill({ name }) {
  return (
    <span className="rounded-full border border-slate-900/10 bg-white/70 px-4 py-2 text-sm font-bold text-slate-700 shadow-sm backdrop-blur-xl transition hover:-translate-y-1 hover:border-violet-400 hover:text-violet-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:text-white">
      {name}
    </span>
  )
}