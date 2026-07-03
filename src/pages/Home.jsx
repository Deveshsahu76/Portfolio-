import React from 'react'
import { motion } from 'framer-motion'
import { FiArrowRight, FiDownload } from 'react-icons/fi'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import profileImg from '../assets/portfolioimage.png'
import ProjectCard from '../components/ProjectCard'
import projects from '../data/projects'

const stats = [
  { value: '3+', label: 'Full-stack projects' },
  { value: 'MERN', label: 'Primary stack' },
  { value: 'Open', label: 'Internships' },
]

export default function Home() {
  return (
    <section className="section-container">
      <div className="grid min-h-[calc(100vh-7rem)] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm font-black text-violet-700 dark:text-violet-200">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            Open to Software Development Internships
          </div>

          <p className="text-base font-bold text-slate-600 dark:text-slate-400">Hello, I’m</p>

          <h1 className="mt-3 text-5xl font-black tracking-tight text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
            Devesh <span className="gradient-text">Sahu</span>
          </h1>

          <h2 className="mt-5 text-2xl font-black text-slate-800 dark:text-slate-200 sm:text-3xl">
            MERN Stack Developer · B.Tech IT Student
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
            I build clean, responsive and scalable web applications using React.js, Node.js, Express.js and MongoDB.
            Currently focused on full-stack development, DSA and internship-ready projects.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/projects" className="btn-primary">
              View Projects <FiArrowRight />
            </a>
            <a href="/resume.pdf" download className="btn-secondary">
              <FiDownload /> Download Resume
            </a>
            <a href="https://github.com/Deveshsahu76" target="_blank" rel="noreferrer" className="btn-secondary">
              <FaGithub /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/devesh-sahu-560608270/" target="_blank" rel="noreferrer" className="btn-secondary">
              <FaLinkedin /> LinkedIn
            </a>
          </div>

          <div className="mt-10 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((item) => (
              <div key={item.label} className="card-3d glass-3d rounded-3xl p-5 text-center">
                <p className="text-3xl font-black text-slate-950 dark:text-white">{item.value}</p>
                <p className="mt-1 text-sm font-bold text-slate-600 dark:text-slate-400">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotateY: -6 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.65 }}
          className="relative mx-auto w-full max-w-[460px] [perspective:1000px]"
        >
          <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-violet-500/35 via-blue-500/25 to-cyan-400/25 blur-3xl" />

          <div className="card-3d relative overflow-hidden rounded-[2.2rem] border border-white/30 bg-white/30 p-3 shadow-2xl shadow-slate-900/15 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
            <img
              src={profileImg}
              alt="Devesh Sahu"
              className="h-[430px] w-full rounded-[1.6rem] object-cover object-center sm:h-[520px]"
            />
          </div>

          <div className="glass-3d absolute -bottom-6 left-4 right-4 rounded-3xl p-5">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-violet-600 dark:text-violet-300">
              Current Focus
            </p>
            <p className="mt-2 font-black text-slate-950 dark:text-white">
              Full-stack internships · MERN projects · DSA
            </p>
          </div>
        </motion.div>
      </div>

      <div className="mt-20">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-violet-600 dark:text-violet-300">
              Selected Work
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              Highlighted Projects
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
              Project cards show features, tech stack and working links with 3D hover UI.
            </p>
          </div>

          <a href="/projects" className="btn-secondary w-fit">
            See all projects <FiArrowRight />
          </a>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} compact />
          ))}
        </div>
      </div>
    </section>
  )
}