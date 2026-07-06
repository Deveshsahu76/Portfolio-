import React from 'react'
import { motion } from 'framer-motion'
import {
  FiArrowRight,
  FiBriefcase,
  FiCheckCircle,
  FiCode,
  FiDatabase,
  FiDownload,
  FiExternalLink,
  FiLayers,
  FiSend,
  FiServer,
  FiShield,
  FiZap,
} from 'react-icons/fi'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import SEO from '../components/SEO'
import { homePageSchema } from '../seo/schema'
import projects from '../data/projects'
import ProjectCard from '../components/ProjectCard'
import LivePortfolioStats from '../components/LivePortfolioStats'

const proofPoints = [
  'Live full-stack projects',
  'React + Node + MongoDB',
  'Backend APIs deployed',
  'Recruiter & freelance forms',
]

const heroStats = [
  { value: '170+', label: 'LeetCode Problems' },
  { value: '4+', label: 'Projects Built' },
  { value: 'MERN', label: 'Primary Stack' },
  { value: 'Live', label: 'Deployments' },
]

const snapshot = [
  { label: 'Role', value: 'MERN Developer' },
  { label: 'Status', value: 'Open to Internship' },
  { label: 'Focus', value: 'Full-stack Apps' },
]

const bentoCards = [
  {
    icon: FiCode,
    title: 'Frontend',
    desc: 'React, responsive interfaces, clean components and modern UI flows.',
  },
  {
    icon: FiServer,
    title: 'Backend',
    desc: 'Node.js, Express APIs, route handling, validation and clean backend structure.',
  },
  {
    icon: FiDatabase,
    title: 'Database',
    desc: 'MongoDB, Mongoose schemas, CRUD operations and data modeling.',
  },
  {
    icon: FiShield,
    title: 'Auth & Deploy',
    desc: 'JWT authentication, protected routes, Vercel frontend and Render backend.',
  },
]

const actions = [
  {
    title: 'For Recruiters',
    desc: 'Schedule interview, shortlist resume or send assignment.',
    icon: FiBriefcase,
    link: '/recruiter',
    cta: 'Open recruiter hub',
  },
  {
    title: 'For Clients',
    desc: 'Request portfolio, business website, dashboard or MERN app.',
    icon: FiSend,
    link: '/freelance',
    cta: 'Request freelance work',
  },
  {
    title: 'For Reviewers',
    desc: 'Check live demos, GitHub code and project structure.',
    icon: FiLayers,
    link: '/projects',
    cta: 'View project lab',
  },
]

export default function Home() {
  return (
    <>
      <SEO
        title="Devesh Sahu | MERN Stack Developer & Full Stack Web Developer"
        description="Hire Devesh Sahu, a MERN Stack Developer building full-stack web apps with React, Node.js, Express, MongoDB, backend APIs and deployed projects."
        path="/"
        schema={homePageSchema}
      />

      <main className="section-container">
        <section className="pro-hero">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="pro-copy"
          >
            <div className="pro-kicker">
              <span />
              Available for MERN Stack Internship & Freelance Work
            </div>

            <h1 className="pro-title">
              Developer portfolio built like a{' '}
              <strong>premium product.</strong>
            </h1>

            <p className="pro-subtitle">
              I’m Devesh Sahu, a B.Tech IT student and MERN Stack Developer. My
              portfolio is built to help recruiters quickly review my projects,
              resume, backend skills and live deployed work.
            </p>

            <div className="pro-actions">
              <a href="/projects" className="pro-primary-btn">
                View Projects <FiArrowRight />
              </a>

              <a href="/recruiter" className="pro-secondary-btn">
                <FiBriefcase /> Recruiter Hub
              </a>

              <a href="/resume.pdf" download className="pro-secondary-btn">
                <FiDownload /> Resume
              </a>
            </div>

            <div className="pro-proof-grid">
              {proofPoints.map((item) => (
                <div key={item} className="pro-proof-item">
                  <FiCheckCircle />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pro-socials">
              <a
                href="https://github.com/Deveshsahu76"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub /> GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/devesh-sahu-560608270/"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin /> LinkedIn
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pro-profile-wrap"
          >
            <div className="pro-profile-card">
              <div className="pro-image-frame">
                <img
                  src="/profile-image.webp"
                  alt="Devesh Sahu - MERN Stack Developer"
                  className="pro-profile-img"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              </div>

              <div className="mt-4 rounded-[1.5rem] border border-slate-900/10 bg-white/85 p-5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
                <span className="inline-flex rounded-full bg-indigo-500/10 px-3 py-1.5 text-xs font-black text-indigo-600 dark:text-indigo-300">
                  Developer Profile
                </span>

                <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                  Devesh Sahu
                </h2>

                <p className="mt-1 text-sm font-bold text-slate-600 dark:text-slate-400">
                  MERN Stack Developer · B.Tech IT
                </p>
              </div>
            </div>

            <div className="pro-snapshot">
              {snapshot.map((item) => (
                <div key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="premium-stats-strip">
          {heroStats.map((stat) => (
            <div key={stat.label} className="premium-stat-card">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </section>

        <LivePortfolioStats />

        <section className="pro-bento">
          <div className="pro-bento-main">
            <span className="pro-tag">Hiring Snapshot</span>

            <h2>Why this portfolio is different</h2>

            <p>
              It is not only a static resume. It has live projects, backend
              connected recruiter forms, freelance request flow, deployed frontend
              and deployed backend.
            </p>

            <div className="pro-mini-stats">
              <div>
                <strong>170+</strong>
                <span>DSA Problems</span>
              </div>

              <div>
                <strong>MERN</strong>
                <span>Stack</span>
              </div>

              <div>
                <strong>Live</strong>
                <span>Deployments</span>
              </div>
            </div>
          </div>

          {bentoCards.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="pro-bento-card">
              <div className="pro-icon">
                <Icon />
              </div>

              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </section>

        <section className="pro-action-grid">
          {actions.map(({ title, desc, icon: Icon, link, cta }) => (
            <a key={title} href={link} className="pro-action-card">
              <div>
                <div className="pro-action-top">
                  <div className="pro-icon">
                    <Icon />
                  </div>

                  <FiExternalLink />
                </div>

                <h3>{title}</h3>
                <p>{desc}</p>
              </div>

              <span>
                {cta} <FiArrowRight />
              </span>
            </a>
          ))}
        </section>

        <section className="mt-16">
          <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.28em] text-indigo-600 dark:text-cyan-300">
                Selected Work
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                Projects that prove my skills
              </h2>

              <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
                Live demos, GitHub repositories, screenshots, backend APIs and
                deployment-ready structure.
              </p>
            </div>

            <a href="/projects" className="btn-secondary w-fit">
              See all projects <FiArrowRight />
            </a>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project.id || project.title} project={project} />
            ))}
          </div>
        </section>
      </main>
    </>
  )
}