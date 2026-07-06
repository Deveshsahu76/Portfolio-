import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiArrowRight,
  FiArrowUpRight,
  FiBriefcase,
  FiCalendar,
  FiCheckCircle,
  FiCode,
  FiCpu,
  FiDatabase,
  FiDownload,
  FiExternalLink,
  FiGlobe,
  FiLayers,
  FiMail,
  FiMapPin,
  FiMessageSquare,
  FiServer,
  FiShield,
  FiStar,
  FiTarget,
  FiTrendingUp,
  FiUserCheck,
  FiZap,
} from 'react-icons/fi'
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import SEO from '../components/SEO'
import { homePageSchema } from '../seo/schema'
import profileImg from '../assets/portfolioimage.png'
import projects from '../data/projects'
import ProjectCard from '../components/ProjectCard'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const heroStats = [
  { value: '4+', label: 'Projects shipped' },
  { value: '170+', label: 'LeetCode solved' },
  { value: 'MERN', label: 'Primary stack' },
  { value: 'Live', label: 'Deployments' },
]

const trustSignals = [
  'React + Node.js + MongoDB',
  'Live projects with GitHub code',
  'Recruiter-ready portfolio flow',
  'Freelance inquiry system',
]

const capabilityCards = [
  {
    icon: FiCode,
    title: 'Frontend Engineering',
    desc: 'Clean React interfaces, responsive layouts, reusable components and premium UI interactions.',
  },
  {
    icon: FiServer,
    title: 'Backend APIs',
    desc: 'Node.js, Express, REST APIs, authentication flows, validation and scalable backend structure.',
  },
  {
    icon: FiDatabase,
    title: 'Database Design',
    desc: 'MongoDB schemas, CRUD operations, relationships, data modelling and real app storage flows.',
  },
  {
    icon: FiShield,
    title: 'Auth & Deployment',
    desc: 'JWT auth, protected routes, Vercel frontend, Render backend and production-ready deployment.',
  },
]

const audienceCards = [
  {
    icon: FiBriefcase,
    title: 'For Recruiters',
    desc: 'Review my resume, projects, skills, availability and shortlist me for software development roles.',
    link: '/recruiter',
    cta: 'Open Recruiter Hub',
  },
  {
    icon: FiGlobe,
    title: 'For Clients',
    desc: 'Need a portfolio, business website, dashboard, admin panel or MERN app? Start here.',
    link: '/freelance',
    cta: 'Start a Project',
  },
  {
    icon: FiLayers,
    title: 'For Developers',
    desc: 'Explore my live projects, GitHub repositories, architecture, APIs and database structure.',
    link: '/projects',
    cta: 'View Project Lab',
  },
]

const timeline = [
  {
    label: 'Current Focus',
    title: 'MERN Stack Development',
    desc: 'Building real full-stack projects with React, Node.js, Express and MongoDB.',
  },
  {
    label: 'Project Proof',
    title: 'Live Deployments',
    desc: 'Frontend deployed on Vercel and backend APIs deployed with database connectivity.',
  },
  {
    label: 'Career Goal',
    title: 'Software Development Internship',
    desc: 'Actively looking for internship opportunities where I can contribute and learn with real teams.',
  },
]

const contactActions = [
  {
    icon: FiMail,
    label: 'Email',
    value: 'deveshsahu567@gmail.com',
    href: 'mailto:deveshsahu567@gmail.com',
  },
  {
    icon: FaWhatsapp,
    label: 'WhatsApp',
    value: 'Message directly',
    href: 'https://wa.me/917607997416?text=Hi%20Devesh%2C%20I%20visited%20your%20portfolio.',
  },
  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    value: 'Connect professionally',
    href: 'https://www.linkedin.com/in/devesh-sahu-560608270/',
  },
]

export default function Home() {
  const featuredProjects = projects.slice(0, 3)

  return (
    <>
      <SEO
        title="Devesh Sahu | MERN Stack Developer & Full Stack Web Developer"
        description="Hire Devesh Sahu, a MERN Stack Developer building full-stack web apps with React, Node.js, Express, MongoDB, backend APIs and deployed projects."
        path="/"
        schema={homePageSchema}
      />

      <main className="premium-home">
        <section className="premium-hero">
          <div className="premium-orb premium-orb-one" />
          <div className="premium-orb premium-orb-two" />

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="premium-hero-grid"
          >
            <motion.div variants={fadeUp} className="premium-hero-copy">
              <div className="premium-badge">
                <span className="premium-live-dot" />
                Available for MERN Stack Internship & Freelance Work
              </div>

              <h1>
                Developer portfolio built like a{' '}
                <span>premium product company.</span>
              </h1>

              <p className="premium-hero-desc">
                I’m <strong>Devesh Sahu</strong>, a MERN Stack Developer building
                clean, usable and deployable full-stack web apps with React,
                Node.js, Express, MongoDB, APIs and production deployment.
              </p>

              <div className="premium-cta-row">
                <Link to="/projects" className="premium-primary-btn">
                  Explore Work <FiArrowRight />
                </Link>

                <Link to="/recruiter" className="premium-secondary-btn">
                  <FiCalendar /> Book Interview
                </Link>

                <a href="/resume.pdf" download className="premium-ghost-btn">
                  <FiDownload /> Resume
                </a>
              </div>

              <div className="premium-trust-list">
                {trustSignals.map((item) => (
                  <div key={item}>
                    <FiCheckCircle />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="premium-social-row">
                <a
                  href="https://github.com/Deveshsahu76"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open Devesh Sahu GitHub profile"
                >
                  <FaGithub /> GitHub
                </a>

                <a
                  href="https://www.linkedin.com/in/devesh-sahu-560608270/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open Devesh Sahu LinkedIn profile"
                >
                  <FaLinkedin /> LinkedIn
                </a>

                <a
                  href="mailto:deveshsahu567@gmail.com"
                  aria-label="Email Devesh Sahu"
                >
                  <FiMail /> Email
                </a>
              </div>
            </motion.div>

            <motion.aside variants={fadeUp} className="premium-profile-panel">
              <div className="premium-profile-top">
                <div>
                  <span className="premium-mini-label">Developer Profile</span>
                  <h2>Devesh Sahu</h2>
                  <p>MERN Stack Developer · B.Tech IT</p>
                </div>

                <div className="premium-status-pill">
                  <span />
                  Open
                </div>
              </div>

              <div className="premium-photo-wrap">
                <img
                  src={profileImg}
                  alt="Devesh Sahu - MERN Stack Developer"
                  loading="eager"
                  fetchPriority="high"
                />

                <div className="premium-photo-card">
                  <FiZap />
                  <div>
                    <strong>Builds fast</strong>
                    <span>React + Node products</span>
                  </div>
                </div>
              </div>

              <div className="premium-profile-meta">
                <div>
                  <FiMapPin />
                  <span>India</span>
                </div>
                <div>
                  <FiTarget />
                  <span>Internship + Freelance</span>
                </div>
              </div>

              <div className="premium-terminal-card">
                <div className="premium-terminal-dots">
                  <span />
                  <span />
                  <span />
                </div>

                <p>
                  <span>$</span> review --profile devesh-sahu
                </p>

                <strong>Result: Recruiter-ready full-stack developer.</strong>
              </div>
            </motion.aside>
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

        <section className="premium-section premium-audience-section">
          <div className="premium-section-head">
            <span>Built for conversion</span>
            <h2>One portfolio. Three clear user journeys.</h2>
            <p>
              HR should find proof fast. Clients should understand services fast.
              Developers should inspect projects fast.
            </p>
          </div>

          <div className="premium-audience-grid">
            {audienceCards.map(({ icon: Icon, title, desc, link, cta }) => (
              <Link key={title} to={link} className="premium-audience-card">
                <div className="premium-card-icon">
                  <Icon />
                </div>

                <h3>{title}</h3>
                <p>{desc}</p>

                <span>
                  {cta} <FiArrowUpRight />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="premium-section premium-capability-section">
          <div className="premium-section-head">
            <span>Engineering capability</span>
            <h2>Skills presented like product proof.</h2>
            <p>
              Not just a skill list. Each capability connects to real project
              execution, deployment and product thinking.
            </p>
          </div>

          <div className="premium-capability-grid">
            {capabilityCards.map(({ icon: Icon, title, desc }) => (
              <article key={title} className="premium-capability-card">
                <div className="premium-card-icon">
                  <Icon />
                </div>

                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="premium-proof-section">
          <div className="premium-proof-left">
            <span>Recruiter trust layer</span>
            <h2>Designed to make shortlisting easier.</h2>
            <p>
              The homepage directly answers the questions HR usually checks:
              what I build, which stack I use, whether projects are live, and
              how to contact me quickly.
            </p>

            <div className="premium-proof-actions">
              <Link to="/recruiter" className="premium-primary-btn">
                Recruiter Hub <FiArrowRight />
              </Link>

              <a href="/resume.pdf" download className="premium-secondary-btn">
                Download Resume <FiDownload />
              </a>
            </div>
          </div>

          <div className="premium-proof-grid">
            <div className="premium-proof-card">
              <FiUserCheck />
              <strong>HR-ready</strong>
              <span>Resume, skills, projects and contact flow in one place.</span>
            </div>

            <div className="premium-proof-card">
              <FiTrendingUp />
              <strong>Conversion-focused</strong>
              <span>Separate paths for recruiters, clients and developers.</span>
            </div>

            <div className="premium-proof-card">
              <FiCpu />
              <strong>Full-stack proof</strong>
              <span>React frontend, Node backend and MongoDB integration.</span>
            </div>

            <div className="premium-proof-card">
              <FiStar />
              <strong>Premium brand</strong>
              <span>Clean UI, strong CTAs, glass cards and smooth animation.</span>
            </div>
          </div>
        </section>

        <section className="premium-section">
          <div className="premium-section-head premium-section-head-row">
            <div>
              <span>Selected work</span>
              <h2>Projects that prove execution.</h2>
              <p>
                Live demos, GitHub repositories, backend APIs, database schema
                and deployment-ready structure.
              </p>
            </div>

            <Link to="/projects" className="premium-secondary-btn">
              View all projects <FiExternalLink />
            </Link>
          </div>

          <div className="premium-project-grid">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id || project.title} project={project} />
            ))}
          </div>
        </section>

        <section className="premium-section premium-timeline-section">
          <div className="premium-section-head">
            <span>Journey snapshot</span>
            <h2>Clear direction, consistent execution.</h2>
            <p>
              This section helps visitors understand where I am now and what I am
              building toward.
            </p>
          </div>

          <div className="premium-timeline">
            {timeline.map((item, index) => (
              <article key={item.title} className="premium-timeline-item">
                <div className="premium-timeline-number">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <div>
                  <span>{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="premium-final-cta">
          <div>
            <span>Ready when you are</span>
            <h2>Need a developer who can build and ship?</h2>
            <p>
              Whether you are hiring for an internship or need a freelance web
              project, this portfolio is designed to make the next step simple.
            </p>
          </div>

          <div className="premium-contact-grid">
            {contactActions.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                className="premium-contact-card"
              >
                <Icon />
                <div>
                  <strong>{label}</strong>
                  <span>{value}</span>
                </div>
                <FiArrowUpRight />
              </a>
            ))}
          </div>
        </section>

        <div className="premium-floating-cta" aria-label="Quick actions">
          <a href="/resume.pdf" download>
            <FiDownload />
            Resume
          </a>

          <Link to="/recruiter">
            <FiBriefcase />
            Hire Me
          </Link>
        </div>
      </main>
    </>
  )
}