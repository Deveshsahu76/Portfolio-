import React, { useMemo, useState } from 'react'
import {
  FiArrowRight,
  FiBarChart2,
  FiBox,
  FiCheckCircle,
  FiCode,
  FiDatabase,
  FiDownload,
  FiExternalLink,
  FiFilter,
  FiGithub,
  FiGrid,
  FiLayers,
  FiSearch,
  FiServer,
  FiShield,
  FiZap,
} from 'react-icons/fi'
import SEO from '../components/SEO'
import { projectsSchema } from '../seo/schema'
import projects from '../data/projects'

const filters = ['All', 'MERN', 'Frontend', 'Backend', 'Full Stack', 'Game', 'E-Commerce']

const projectStats = [
  { value: '4+', label: 'Projects built', icon: FiGrid },
  { value: 'MERN', label: 'Primary stack', icon: FiCode },
  { value: 'Live', label: 'Deployments', icon: FiZap },
  { value: 'API', label: 'Backend proof', icon: FiServer },
]

function getCategory(project) {
  const text = `${project.title} ${(project.techStack || []).join(' ')} ${
    project.description || ''
  }`.toLowerCase()

  if (text.includes('queen') || text.includes('game')) return 'Game'
  if (text.includes('commerce') || text.includes('shop')) return 'E-Commerce'
  if (text.includes('node') || text.includes('express') || text.includes('mongodb')) {
    return 'Full Stack'
  }
  return 'Frontend'
}

function ProjectCaseStudyCard({ project, index }) {
  const techStack = project.techStack || []
  const features = project.features || []
  const architecture = project.architecture || []
  const apiDocs = project.apiDocs || []
  const schema = project.schema || []
  const category = getCategory(project)

  return (
    <article className="projects-premium-card">
      <div className="projects-premium-image-wrap">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} project cover by Devesh Sahu`}
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        ) : (
          <div className="projects-premium-placeholder">
            <FiBox />
            <span>Project Preview</span>
          </div>
        )}

        <div className="projects-premium-image-badge">{category}</div>

        {project.apk && <div className="projects-premium-apk-badge">APK</div>}
      </div>

      <div className="projects-premium-content">
        <div className="projects-premium-card-head">
          <div>
            <span>Case Study #{String(index + 1).padStart(2, '0')}</span>
            <h2>{project.title}</h2>
          </div>

          <div className="projects-premium-card-actions">
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer">
                Live <FiExternalLink />
              </a>
            )}

            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer">
                Code <FiGithub />
              </a>
            )}

            {project.apk && (
              <a href={project.apk} download>
                APK <FiDownload />
              </a>
            )}
          </div>
        </div>

        <p className="projects-premium-description">
          {project.longDescription || project.description}
        </p>

        <div className="projects-premium-tech-list">
          {techStack.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>

        <div className="projects-premium-proof-grid">
          <div className="projects-premium-proof-box">
            <div className="projects-premium-proof-title">
              <FiCheckCircle />
              Features
            </div>

            <ul>
              {features.slice(0, 5).map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="projects-premium-proof-box">
            <div className="projects-premium-proof-title">
              <FiLayers />
              Architecture
            </div>

            <ul>
              {architecture.slice(0, 4).map((item) => (
                <li key={item}>{item}</li>
              ))}

              {architecture.length === 0 && (
                <li>Frontend, backend and database flow documented soon.</li>
              )}
            </ul>
          </div>
        </div>

        <div className="projects-premium-bottom-grid">
          <div className="projects-premium-mini-section">
            <div>
              <FiServer />
              <strong>API Documentation</strong>
            </div>

            {apiDocs.length > 0 ? (
              <div className="projects-premium-api-list">
                {apiDocs.slice(0, 3).map((api) => (
                  <div key={`${api.method}-${api.endpoint}`}>
                    <span>{api.method}</span>
                    <code>{api.endpoint}</code>
                  </div>
                ))}
              </div>
            ) : (
              <p>API details will be added after backend documentation.</p>
            )}
          </div>

          <div className="projects-premium-mini-section">
            <div>
              <FiDatabase />
              <strong>Database Schema</strong>
            </div>

            {schema.length > 0 ? (
              <div className="projects-premium-schema-list">
                {schema.slice(0, 3).map((item) => (
                  <span key={item.name}>{item.name}</span>
                ))}
              </div>
            ) : (
              <p>Database schema will be added after final documentation.</p>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const category = getCategory(project)

      const searchableText = [
        project.title,
        project.description,
        project.longDescription,
        category,
        ...(project.techStack || []),
        ...(project.features || []),
      ]
        .join(' ')
        .toLowerCase()

      const matchesSearch = searchableText.includes(searchTerm.toLowerCase())

      const matchesFilter =
        activeFilter === 'All' ||
        category === activeFilter ||
        searchableText.includes(activeFilter.toLowerCase())

      return matchesSearch && matchesFilter
    })
  }, [activeFilter, searchTerm])

  return (
    <>
      <SEO
        title="Projects | Devesh Sahu MERN Stack Developer"
        description="Explore full-stack MERN projects by Devesh Sahu including Queens Arena, E-Commerce Store, Zerodha Clone and Version Control System with architecture, APIs and database schema."
        path="/projects"
        schema={projectsSchema}
      />

      <main className="projects-premium-page">
        <section className="projects-premium-hero">
          <div className="projects-premium-hero-copy">
            <div className="projects-premium-badge">
              <span />
              Project Lab
            </div>

            <h1>
              Projects presented like <span>real product case studies.</span>
            </h1>

            <p>
              Every project here is structured to show practical engineering:
              problem-solving, tech stack, features, architecture, backend APIs,
              database schema, deployment and future scope.
            </p>

            <div className="projects-premium-cta-row">
              <a
                href="https://github.com/Deveshsahu76"
                target="_blank"
                rel="noreferrer"
                className="projects-premium-primary-btn"
              >
                Open GitHub <FiGithub />
              </a>

              <a href="/resume.pdf" download className="projects-premium-secondary-btn">
                Download Resume <FiDownload />
              </a>
            </div>
          </div>

          <aside className="projects-premium-hero-panel">
            <div className="projects-premium-panel-top">
              <span>Engineering Proof</span>
              <h2>Not just screenshots.</h2>
              <p>Each project explains what was built and how it works.</p>
            </div>

            <div className="projects-premium-stats-grid">
              {projectStats.map(({ value, label, icon: Icon }) => (
                <div key={label}>
                  <Icon />
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <div className="projects-premium-terminal">
              <div>
                <span />
                <span />
                <span />
              </div>
              <p>
                <strong>$</strong> npm run build
              </p>
              <code>Production-ready project structure verified.</code>
            </div>
          </aside>
        </section>

        <section className="projects-premium-controls">
          <div className="projects-premium-search">
            <FiSearch />
            <input
              type="search"
              placeholder="Search projects, tech stack, APIs..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          <div className="projects-premium-filters" aria-label="Project filters">
            <FiFilter />
            {filters.map((filter) => (
              <button
                type="button"
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={activeFilter === filter ? 'active' : ''}
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        <section className="projects-premium-list">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectCaseStudyCard
                key={project.id || project.title}
                project={project}
                index={index}
              />
            ))
          ) : (
            <div className="projects-premium-empty">
              <FiSearch />
              <h2>No projects found</h2>
              <p>Try another keyword or clear the active filter.</p>
            </div>
          )}
        </section>

        <section className="projects-premium-process">
          <div className="projects-premium-section-head">
            <span>How I build</span>
            <h2>My project execution flow.</h2>
            <p>
              This helps recruiters and clients understand that I think beyond UI
              and focus on complete product delivery.
            </p>
          </div>

          <div className="projects-premium-process-grid">
            <article>
              <FiBarChart2 />
              <h3>Plan</h3>
              <p>Understand requirements, features, user flow and data structure.</p>
            </article>

            <article>
              <FiCode />
              <h3>Build</h3>
              <p>Create React UI, backend APIs, auth flow and database models.</p>
            </article>

            <article>
              <FiShield />
              <h3>Test</h3>
              <p>Check responsiveness, forms, API responses and edge cases.</p>
            </article>

            <article>
              <FiZap />
              <h3>Deploy</h3>
              <p>Deploy frontend, backend and verify production behavior.</p>
            </article>
          </div>
        </section>

        <section className="projects-premium-final-cta">
          <div>
            <span>Want to review more?</span>
            <h2>Open my GitHub or shortlist me for an interview.</h2>
            <p>
              These projects are built to show practical MERN stack ability,
              deployment understanding and project ownership.
            </p>
          </div>

          <div className="projects-premium-final-actions">
            <a
              href="https://github.com/Deveshsahu76"
              target="_blank"
              rel="noreferrer"
            >
              <FiGithub /> GitHub
            </a>

            <a href="/recruiter">
              Recruiter Hub <FiArrowRight />
            </a>
          </div>
        </section>
      </main>
    </>
  )
}