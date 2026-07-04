import React from 'react'
import { FiAward, FiBookOpen, FiBriefcase, FiTarget } from 'react-icons/fi'

const points = [
  {
    icon: FiBookOpen,
    title: 'Education',
    desc: 'B.Tech Information Technology student focused on software development and full-stack web apps.',
  },
  {
    icon: FiBriefcase,
    title: 'Career Goal',
    desc: 'Looking for Software Development / MERN Stack internship opportunities where I can build real product features.',
  },
  {
    icon: FiTarget,
    title: 'Strength',
    desc: 'I focus on practical implementation: UI, APIs, database, authentication and deployment.',
  },
  {
    icon: FiAward,
    title: 'Mindset',
    desc: 'Fast learner, consistent builder and ready to work on startup-style responsibilities.',
  },
]

export default function About() {
  return (
    <main className="section-container">
      <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div className="badge mb-5">About Me</div>
          <h1 className="page-title">
            I build projects that show <span className="gradient-text">real execution.</span>
          </h1>
          <p className="page-subtitle mt-6">
            I’m Devesh Sahu, a MERN Stack Developer and B.Tech IT student. My current focus is on becoming internship-ready
            through live projects, DSA practice, backend APIs and deployment experience.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/projects" className="btn-primary">View Projects</a>
            <a href="/resume.pdf" download className="btn-secondary">Download Resume</a>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {points.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="soft-card hover-lift rounded-[2rem] p-6">
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-slate-950 text-xl text-white dark:bg-white dark:text-slate-950">
                <Icon />
              </div>
              <h2 className="text-xl font-black text-slate-950 dark:text-white">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}