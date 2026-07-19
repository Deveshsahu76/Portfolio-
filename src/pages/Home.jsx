import React from 'react'
import {
  Link,
} from 'react-router-dom'
import {
  motion,
} from 'framer-motion'
import {
  FiArrowRight,
  FiArrowUpRight,
  FiBriefcase,
  FiCode,
  FiDatabase,
  FiExternalLink,
  FiGlobe,
  FiLayers,
  FiMail,
  FiServer,
  FiShield,
} from 'react-icons/fi'
import {
  FaLinkedin,
  FaWhatsapp,
} from 'react-icons/fa'
import SEO from '../components/SEO'
import {
  homePageSchema,
} from '../seo/schema'
import profileImg from '../assets/portfolioimage.png'
import projects from '../data/projects'
import CinematicHomeHero from '../components/CinematicHomeHero'
import ProjectOrbitShowcase from '../components/ProjectOrbitShowcase'
import LivePortfolioStats from '../components/LivePortfolioStats'
import LiveEngineeringPulse from '../components/LiveEngineeringPulse'
import HomeStats from '../components/HomeStats'
import LiveProfileStatus from '../components/LiveProfileStatus'
import ResumeLink from '../components/ResumeLink'

const capabilities = [
  {
    icon: FiCode,
    title:
      'Interactive Frontend',
    description:
      'Responsive React interfaces, reusable components and product-focused user experiences.',
  },
  {
    icon: FiServer,
    title:
      'Backend APIs',
    description:
      'Node.js, Express, validation, authentication and structured REST API development.',
  },
  {
    icon: FiDatabase,
    title:
      'Database Systems',
    description:
      'MongoDB schemas, CRUD operations and persistent full-stack application data.',
  },
  {
    icon: FiShield,
    title:
      'Deployment and Auth',
    description:
      'JWT authentication, protected routes, Vercel deployment and Render services.',
  },
]

const audiencePaths = [
  {
    icon: FiBriefcase,
    title:
      'Recruiters',
    description:
      'Review projects, resume, availability and live engineering proof.',
    link: '/recruiter',
    action:
      'Recruiter Hub',
  },
  {
    icon: FiGlobe,
    title:
      'Clients',
    description:
      'Discuss websites, dashboards, admin panels and MERN applications.',
    link: '/freelance',
    action:
      'Freelance Services',
  },
  {
    icon: FiLayers,
    title:
      'Developers',
    description:
      'Inspect architecture, APIs, database schemas and GitHub repositories.',
    link: '/projects',
    action:
      'Project Lab',
  },
]

const contactOptions = [
  {
    icon: FiMail,
    label: 'Email',
    value:
      'deveshsahu567@gmail.com',
    href:
      'mailto:deveshsahu567@gmail.com',
  },
  {
    icon: FaWhatsapp,
    label: 'WhatsApp',
    value:
      'Discuss an opportunity',
    href:
      'https://wa.me/917607997416?text=Hi%20Devesh%2C%20I%20visited%20your%20portfolio.',
  },
  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    value:
      'Connect professionally',
    href:
      'https://www.linkedin.com/in/devesh-sahu-560608270/',
  },
]

export default function Home() {
  const featuredProjects =
    projects.slice(0, 4)

  return (
    <>
      <SEO
        title="Devesh Sahu | MERN Stack Developer"
        description="Portfolio of Devesh Sahu, a MERN Stack Developer building interactive React, Node.js, Express and MongoDB applications."
        path="/"
        schema={homePageSchema}
      />

      <main className="cinematic-home">
        <CinematicHomeHero
          profileImage={
            profileImg
          }
        />

        <section className="cinematic-data-layer">
          <HomeStats />

          <LiveProfileStatus />

          <LivePortfolioStats />
        </section>

        <LiveEngineeringPulse />

        <ProjectOrbitShowcase
          projects={
            featuredProjects
          }
          eyebrow="Selected Product Work"
          title="Explore projects through an interactive 3D showcase."
          description="Switch between projects to inspect the interface, technology stack, development state, live deployment and detailed case study."
          id="selected-projects"
        />

        <section className="cinematic-content-section">
          <div className="cinematic-section-heading">
            <span>
              ENGINEERING CAPABILITY
            </span>

            <h2>
              Full-stack skills shown
              through working systems.
            </h2>

            <p>
              The portfolio connects
              technical skills with
              deployed projects, live
              APIs and development
              activity.
            </p>
          </div>

          <div className="cinematic-capability-grid">
            {capabilities.map(
              ({
                icon: Icon,
                title,
                description,
              },
              index) => (
                <motion.article
                  key={title}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.55,
                    delay:
                      index * 0.08,
                  }}
                  className="cinematic-capability-card"
                >
                  <div>
                    <Icon />
                  </div>

                  <span>
                    {String(
                      index + 1
                    ).padStart(
                      2,
                      '0'
                    )}
                  </span>

                  <h3>{title}</h3>

                  <p>
                    {description}
                  </p>
                </motion.article>
              )
            )}
          </div>
        </section>

        <section className="cinematic-audience-section">
          <div className="cinematic-section-heading">
            <span>
              CHOOSE YOUR PATH
            </span>

            <h2>
              One portfolio designed
              for different visitors.
            </h2>
          </div>

          <div className="cinematic-audience-grid">
            {audiencePaths.map(
              ({
                icon: Icon,
                title,
                description,
                link,
                action,
              }) => (
                <Link
                  key={title}
                  to={link}
                  className="cinematic-audience-card"
                >
                  <Icon />

                  <div>
                    <h3>{title}</h3>

                    <p>
                      {description}
                    </p>
                  </div>

                  <span>
                    {action}
                    <FiArrowUpRight />
                  </span>
                </Link>
              )
            )}
          </div>
        </section>

        <section className="cinematic-final-section">
          <div className="cinematic-final-copy">
            <span>
              START A CONVERSATION
            </span>

            <h2>
              Need a developer who can
              design, build and deploy?
            </h2>

            <p>
              Review my detailed projects
              or contact me regarding a
              software development
              opportunity.
            </p>

            <div>
              <Link to="/recruiter">
                Recruiter Hub
                <FiArrowRight />
              </Link>

              <ResumeLink>
                Resume
                <FiExternalLink />
              </ResumeLink>
            </div>
          </div>

          <div className="cinematic-contact-stack">
            {contactOptions.map(
              ({
                icon: Icon,
                label,
                value,
                href,
              }) => (
                <a
                  key={label}
                  href={href}
                  target={
                    href.startsWith(
                      'http'
                    )
                      ? '_blank'
                      : undefined
                  }
                  rel={
                    href.startsWith(
                      'http'
                    )
                      ? 'noreferrer'
                      : undefined
                  }
                >
                  <Icon />

                  <div>
                    <strong>
                      {label}
                    </strong>

                    <span>
                      {value}
                    </span>
                  </div>

                  <FiArrowUpRight />
                </a>
              )
            )}
          </div>
        </section>
      </main>
    </>
  )
}