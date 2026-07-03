import React from 'react'
import SkillPill from '../components/SkillPill'
import skills from '../data/skills'

const sections = [
  { title: 'Languages', items: skills.languages },
  { title: 'Frontend', items: skills.frontend },
  { title: 'Backend', items: skills.backend },
  { title: 'Database', items: skills.database },
  { title: 'Tools & Deployment', items: skills.tools },
  { title: 'Core Fundamentals', items: skills.fundamentals },
]

export default function Skills() {
  return (
    <section className="section-container">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-violet-600 dark:text-violet-300">
          Skills
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl">
          Tech Stack
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">
          Category-wise skills look more professional than percentage bars and help recruiters quickly understand your stack.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {sections.map((section) => (
          <div key={section.title} className="card-3d glass-3d rounded-[2rem] p-7">
            <h2 className="text-2xl font-black text-slate-950 dark:text-white">{section.title}</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {section.items.map((item) => (
                <SkillPill key={item} name={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}