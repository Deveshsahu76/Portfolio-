import React from 'react'
import { motion } from 'framer-motion'
import {
  FiArrowRight,
  FiBriefcase,
  FiCalendar,
  FiCode,
  FiDownload,
  FiLayers,
  FiSend,
  FiZap,
} from 'react-icons/fi'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import profileImg from '../assets/portfolioimage.png'
import projects from '../data/projects'
import ProjectCard from '../components/ProjectCard'

const trustBadges = [
  'MERN Stack',
  'Live Projects',
  'API Docs',
  'Database Schema',
  'Recruiter Hub',
  'Freelance Portal',
]

const careerActions = [
  {
    title: 'Recruiter Hub',
    desc: 'Shortlist resume, schedule interview, or send assignment.',
    icon: FiBriefcase,
    link: '/recruiter',
    cta: 'Open Hub',
  },
  {
    title: 'Freelance Portal',
    desc: 'Request websites, MERN apps, bug fixing or deployment help.',
    icon: FiSend,
    link: '/freelance',
    cta: 'Request Work',
  },
  {
    title: 'Project Case Studies',
    desc: 'Explore screenshots, APIs, architecture and database schema.',
    icon: FiLayers,
    link: '/projects',
    cta: 'View Projects',
  },
]

const systemStats = [
  { label: 'Full-stack Projects', value: '3+' },
  { label: 'Primary Stack', value: 'MERN' },
  { label: 'Availability', value: 'Open' },
]

export default function Home() {
  return (
    <section className="section-container">
      <div className="grid min-h-[calc(100vh-7rem)] items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm font-black text-violet-700 dark:text-violet-200">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500" />
            AI-powered career portfolio · Open to internships
          </div>

          <h1 className="text-5xl font-black tracking-tight text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
            Devesh Sahu’s <span className="gradient-text">Career OS</span>
          </h1>

          <h2 className="mt-5 text-2xl font-black text-slate-800 dark:text-slate-200 sm:text-3xl">
            MERN Stack Developer · B.Tech IT Student · Product-minded Builder
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
            A recruiter-friendly interactive portfolio where recruiters can review my projects,
            download resume, schedule interview requests, assign tasks and clients can request freelance work.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            {trustBadges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-slate-900/10 bg-white/70 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-slate-700 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href="/recruiter" className="btn-primary">
              <FiCalendar /> Schedule Interview
            </a>

            <a href="/projects" className="btn-secondary">
              <FiCode /> View Projects
            </a>

            <a href="/resume.pdf" download className="btn-secondary">
              <FiDownload /> Resume
            </a>

            <a href="https://github.com/Deveshsahu76" target="_blank" rel="noreferrer" className="btn-secondary">
              <FaGithub /> GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/devesh-sahu-560608270/"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              <FaLinkedin /> LinkedIn
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotateY: -6 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.65 }}
          className="relative mx-auto w-full max-w-[540px] [perspective:1200px]"
        >
          <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-violet-500/30 via-blue-500/20 to-cyan-400/30 blur-3xl" />

          <div className="orbit-ring absolute left-1/2 top-1/2 h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-500/20 sm:h-[500px] sm:w-[500px]" />
          <div className="orbit-ring absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/20 sm:h-[390px] sm:w-[390px]" />

          <div className="card-3d glass-3d relative overflow-hidden rounded-[2.4rem] p-4">
            <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="scan-line relative overflow-hidden rounded-[2rem] bg-slate-950">
                <img
                  src={profileImg}
                  alt="Devesh Sahu"
                  className="h-[360px] w-full object-cover object-center sm:h-[480px] lg:h-full"
                />

                <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-black/45 p-4 text-white backdrop-blur-xl">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-200">
                    Developer Profile
                  </p>
                  <p className="mt-1 text-xl font-black">Devesh Sahu</p>
                  <p className="text-sm text-white/75">Full-stack · MERN · DSA</p>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[2rem] border border-white/40 bg-white/75 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
                  <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.24em] text-violet-600 dark:text-violet-300">
                    <FiZap /> AI Summary
                  </p>
                  <p className="mt-4 text-2xl font-black text-slate-950 dark:text-white">
                    Hire-ready MERN developer with live full-stack projects.
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    Projects include auth, dashboards, APIs, MongoDB schemas, deployment and recruiter workflows.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {systemStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-[1.5rem] border border-white/40 bg-white/75 p-4 text-center dark:border-white/10 dark:bg-white/5"
                    >
                      <p className="text-2xl font-black text-slate-950 dark:text-white">{stat.value}</p>
                      <p className="mt-1 text-[11px] font-bold leading-4 text-slate-500 dark:text-slate-400">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="rounded-[2rem] border border-emerald-500/20 bg-emerald-500/10 p-5">
                  <p className="text-sm font-black text-emerald-700 dark:text-emerald-200">
                    Status: Available
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    Open for Software Development / MERN Stack internships and freelance web projects.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <span className="ai-orb left-2 top-16 h-5 w-5 bg-violet-500" />
          <span className="ai-orb right-0 top-24 h-7 w-7 bg-cyan-400" />
          <span className="ai-orb bottom-10 left-16 h-4 w-4 bg-blue-500" />
        </motion.div>
      </div>

      <div className="mt-20">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-violet-600 dark:text-violet-300">
              Interactive Career System
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              More than a portfolio.
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
              This portfolio works like a mini product where recruiters and clients can take direct action.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {careerActions.map(({ title, desc, icon: Icon, link, cta }) => (
            <a key={title} href={link} className="card-3d glass-3d group rounded-[2rem] p-7">
              <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 text-2xl text-white shadow-lg">
                <Icon />
              </div>

              <h3 className="text-2xl font-black text-slate-950 dark:text-white">{title}</h3>
              <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">{desc}</p>

              <div className="mt-6 inline-flex items-center gap-2 font-black text-violet-600 dark:text-violet-300">
                {cta} <FiArrowRight className="transition group-hover:translate-x-1" />
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-20">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-violet-600 dark:text-violet-300">
              Selected Work
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              Featured Projects
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
              Live demos, GitHub links, screenshots, architecture, API docs and database schema.
            </p>
          </div>

          <a href="/projects" className="btn-secondary w-fit">
            See all projects <FiArrowRight />
          </a>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard key={project.id} project={project} compact />
          ))}
        </div>
      </div>
    </section>
  )
}