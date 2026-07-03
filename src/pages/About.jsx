import React from 'react'
import { motion } from 'framer-motion'

const timeline = [
  {
    year: '2023',
    title: 'B.Tech IT Journey',
    desc: 'Started Bachelor of Technology in Information Technology at Kanpur Institute of Technology.',
  },
  {
    year: '2024-25',
    title: 'Full-Stack Development',
    desc: 'Built MERN projects including Zerodha Clone, E-Commerce Store and Web Version Control System.',
  },
  {
    year: '2026',
    title: 'Internship Focus',
    desc: 'Improving DSA, fundamentals and applying for Software Development / Full-Stack internships.',
  },
]

const focus = [
  'Building scalable MERN stack applications with clean architecture.',
  'Improving DSA, DBMS, OS and software engineering fundamentals.',
  'Creating recruiter-ready projects with live demos and strong documentation.',
]

export default function About() {
  return (
    <section className="section-container">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <p className="text-sm font-black uppercase tracking-[0.3em] text-violet-600 dark:text-violet-300">
            About
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl">
            About Me
          </h1>

          <div className="mt-7 space-y-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
            <p>
              I’m <strong className="text-slate-950 dark:text-white">Devesh Sahu</strong>, a B.Tech Information
              Technology student and MERN Stack Developer focused on building clean, responsive and scalable web
              applications.
            </p>

            <p>
              I have built projects like <strong className="text-slate-950 dark:text-white">Zerodha Clone</strong>,{' '}
              <strong className="text-slate-950 dark:text-white">E-Commerce Store</strong> and{' '}
              <strong className="text-slate-950 dark:text-white">Web Version Control System</strong> using React.js,
              Node.js, Express.js, MongoDB, JWT and REST APIs.
            </p>

            <p>
              Currently, I’m open to Software Development / Full-Stack internship opportunities where I can contribute,
              learn fast and work on real-world products.
            </p>
          </div>

          <div className="mt-9">
            <h2 className="text-2xl font-black text-slate-950 dark:text-white">Current Focus</h2>
            <ul className="mt-4 space-y-3 text-slate-600 dark:text-slate-400">
              {focus.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-violet-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <div className="space-y-6">
          <div className="card-3d glass-3d rounded-[2rem] p-7">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-violet-600 dark:text-violet-300">
              Education
            </p>
            <h2 className="mt-4 text-2xl font-black text-slate-950 dark:text-white">B.Tech Information Technology</h2>
            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
              Kanpur Institute of Technology · AKTU · In progress
            </p>
          </div>

          <div className="card-3d glass-3d rounded-[2rem] p-7">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-violet-600 dark:text-violet-300">
              Timeline
            </p>

            <div className="mt-6 space-y-6">
              {timeline.map((item) => (
                <div key={item.title} className="grid grid-cols-[80px_1fr] gap-4">
                  <p className="font-black text-slate-950 dark:text-white">{item.year}</p>
                  <div>
                    <h3 className="font-black text-slate-950 dark:text-white">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}